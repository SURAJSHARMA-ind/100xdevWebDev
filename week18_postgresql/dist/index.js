"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pgClient = new pg_1.Client({
    user: "postgres", // User you created
    password: "7678", // Password you set
    host: "localhost", // Hostname (localhost for local machine)
    port: 5432, // PostgreSQL default port
    database: "First_db", // Database you created
});
pgClient.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error("Database connection error:", err));
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        yield pgClient.query('BEGIN');
        // const insertQuery = `Insert into users (username, email, password ) values('${username}' , '${email}' ,'${password}');` // BAD APPROACH CAN CAUSE SQL INJECTION
        const insertQuery = `Insert into users (username, email, password ) values($1,$2,$3) RETURNING ID `;
        const values = [username, email, password];
        const response = yield pgClient.query(insertQuery, values);
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
        const address_response = yield pgClient.query(address_query, address_values);
        yield pgClient.query('COMMIT');
        console.log(address_response);
        res.json({
            message: "You have signed up "
        });
        console.log(`Query is ${insertQuery}`);
    }
    catch (error) {
        pgClient.query('Rolleback');
        console.log(`error is ${error}`);
        res.status(500).json({
            message: `Error is ${error}`
        });
    }
}));
//@ts-ignore
app.get('/metadata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).json({ error: 'ID parameter is required' });
        }
        const user_data = yield pgClient.query(`Select username,email from users where id = $1`, [id]);
        const user_address = yield pgClient.query(`Select * from new_address where user_id = $1`, [id]);
        console.log(user_data.rows[0]);
        console.log(user_address.rows[0]);
        res.json({
            user_data: user_data.rows[0],
            address: user_address.rows[0]
        });
    }
    catch (error) {
        return res.json(error);
    }
}));
// Joins 
app.get('/join/metadata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const query = `Select users.username , users.email , new_address.country , new_address.pincode ,new_address.area from users join new_address on users.id = new_address.user_id where users.id = $1`;
    const userdata = yield pgClient.query(query, [id]);
    res.json({
        userdata: userdata.rows[0]
    });
}));
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
