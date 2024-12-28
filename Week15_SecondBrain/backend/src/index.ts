import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken"
dotenv.config();

const jwt: string = process.env.JWT;
const Db_Password: string = process.env.DB_PASSWORD
const Db_Connection: string = `mongodb+srv://suraj200delhi:${Db_Password}@cluster0.e9q2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(Db_Connection)
const app = express();
app.use(express.json());

app.post('/signup', (req, res) => {
    const { username, pasword } = req.body();
    


})

app.post('/signin', (req, res) => {

})

app.post('/api/v1/content', (req, res) => {

})
app.get('api/v1/content', (req, res) => {

})
app.delete('/api/v1/content', (req, res) => {

})
app.post('/api/v1/brain/share', (req, res) => {

})

app.get('/api/v1/brain/:shareLink', (req, res) => {

})

const port: number = Number(process.env.PORT) | 3000
app.listen(port, () => {
    console.log('Server listening at http://lcalhost:${port} ')
})