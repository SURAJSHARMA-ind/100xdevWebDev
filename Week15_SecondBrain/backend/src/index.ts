import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken"
const jwt: string = process.env.JWT;

dotenv.config();
const app = express();
app.use(express.json());

app.post('/signup', (req,res) => {
    const {username , pasword} = req.body();

    
})

app.post('/signin', (req,res) => {

})

app.post('/api/v1/content', (req,res) => {

})
app.get('api/v1/content', (req,res) => {

})
app.delete('/api/v1/content', (req,res) => {

})
app.post('/api/v1/brain/share', (req,res) => {

})

app.get('/api/v1/brain/:shareLink', (req,res) => {

})

const port: number = Number(process.env.PORT) | 3000
app.listen(port, () => {
    console.log('Server listening at http://lcalhost:${port} ')
})