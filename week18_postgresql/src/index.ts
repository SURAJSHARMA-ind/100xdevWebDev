import e from 'express';
import express from 'express'
import { Client } from "pg";

const app = express()
app.use(express.json())

const pgClient = new Client({
    user: "postgres",          // User you created
    password: "7678",       // Password you set
    host: "localhost",      // Hostname (localhost for local machine)
    port: 5432,             // PostgreSQL default port
    database: "First_db",     // Database you created
});

pgClient.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error("Database connection error:", err));


app.post('/signup', async (req, res) => {
    try {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        // const insertQuery = `Insert into users (username, email, password ) values('${username}' , '${email}' ,'${password}');`
        const insertQuery = `Insert into users (username, email, password ) values($1,$2,$3);`
        const values = [username, email, password]
        const response = await pgClient.query(insertQuery, values)
        res.json({
            message: "You have signed up "
        })
        console.log(`Query is ${insertQuery}`);
    }
    catch (error) {
        console.log(`error is ${error}`);
        res.status(500).json({
            message : `Error is ${error}`
        })
    }
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
})