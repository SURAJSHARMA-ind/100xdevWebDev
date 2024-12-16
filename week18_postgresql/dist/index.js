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
        // const insertQuery = `Insert into users (username, email, password ) values('${username}' , '${email}' ,'${password}');`
        const insertQuery = `Insert into users (username, email, password ) values($1,$2,$3);`;
        const values = [username, email, password];
        const response = yield pgClient.query(insertQuery, values);
        res.json({
            message: "You have signed up "
        });
        console.log(`Query is ${insertQuery}`);
    }
    catch (error) {
        console.log(`error is ${error}`);
        res.status(500).json({
            message: `Error is ${error}`
        });
    }
}));
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
