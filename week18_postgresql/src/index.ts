import express from "express";
import { Client } from "pg";

const app = express();
app.use(express.json());

const pgClient = new Client({
    user: "postgres", // User you created
    password: "7678", // Password you set
    host: "localhost", // Hostname (localhost for local machine)
    port: 5432, // PostgreSQL default port
    database: "First_db", // Database you created
});

pgClient
    .connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err) => console.error("Database connection error:", err));

app.post("/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        await pgClient.query("BEGIN");
        // const insertQuery = `Insert into users (username, email, password ) values('${username}' , '${email}' ,'${password}');` // BAD APPROACH CAN CAUSE SQL INJECTION
        const insertQuery = `Insert into users (username, email, password ) values($1,$2,$3) RETURNING ID `;
        const values = [username, email, password];
        const response = await pgClient.query(insertQuery, values);

        // For testing transaction
        // await new Promise(() => {
        //     setTimeout(() => {

        //     }, 100 * 1000);
        // })

        const user_id = response.rows[0].id;
        console.log(response.rows[0].id);

        const { country, pincode, area, landmark } = req.body;

        const address_query = `insert into new_address (user_id,country,pincode,area,landmarK) VALUES($1,$2,$3,$4,$5)`;
        const address_values = [user_id, country, pincode, area, landmark];
        const address_response = await pgClient.query(
            address_query,
            address_values
        );

        await pgClient.query("COMMIT");

        console.log(address_response);

        res.json({
            message: "You have signed up ",
        });
        console.log(`Query is ${insertQuery}`);
    } catch (error) {
        pgClient.query("Rolleback");
        console.log(`error is ${error}`);
        res.status(500).json({
            message: `Error is ${error}`,
        });
    }
});

//@ts-ignore
app.get("/metadata", async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).json({ error: "ID parameter is required" });
        }

        const user_data = await pgClient.query(
            `Select username,email from users where id = $1`,
            [id]
        );

        const user_address = await pgClient.query(
            `Select * from new_address where user_id = $1`,
            [id]
        );

        console.log(user_data.rows[0]);
        console.log(user_address.rows[0]);

        res.json({
            user_data: user_data.rows[0],
            address: user_address.rows[0],
        });
    } catch (error) {
        return res.json(error);
    }
});
// Joins
app.get("/join/metadata", async (req, res) => {
    const id = req.query.id;

    const query = `Select users.username , users.email , new_address.country , new_address.pincode ,new_address.area from users join new_address on users.id = new_address.user_id where users.id = $1`;
    // Types of join
    // 1. INNER JOIN
    //  Returns rows when there is at least one match in both tables. If there is no match, the rows are not returned. It's the most common type of join.
    const innerjoin = `Select users.username , users.email , new_address.country , new_address.pincode ,new_address.area from users inner join new_address on users.id = new_address.user_id where users.id = $1`
    // 2. LEFT JOIN
    // Returns all rows from the left table, and the matched rows from the right table.
    const leftjoin = `Select users.username , users.email , new_address.country , new_address.pincode ,new_address.area from users left join new_address on users.id = new_address.user_id where users.id = $1`
    // 3. RIGHT JOIN
    // Returns all rows from the right table, and the matched rows from the left table.
    const rightjoin = `Select users.username , users.email , new_address.country , new_address.pincode ,new_address.area from users right join new_address on users.id = new_address.user_id where users.id = $1`
    // 4. FULL JOIN
    // Returns rows when there is a match in one of the tables. It effectively combines the results of both LEFT JOIN and RIGHT JOIN.
    const fulljoin = `Select users.username , users.email , new_address.country , new_address.pincode ,new_address.area from users full join new_address on users.id = new_address.user_id where users.id = $1`

    const userdata = await pgClient.query(query, [id]);

    res.json({
        userdata: userdata.rows[0],
    });
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
