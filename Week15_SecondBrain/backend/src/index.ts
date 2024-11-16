import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken"
dotenv.config();        
const app = express();

app.post('/signup',()=>{
    
})

app.post('/signin',()=>{

})

app.post('/api/v1/content',()=>{
    
})
app.get('api/v1/content',()=>{

})
app.delete('/api/v1/content',()=>{

})
app.post('/api/v1/brain/share',()=>{

})

app.get('/api/v1/brain/:shareLink',()=>{

})

const port: number = Number(process.env.PORT) | 3000
app.listen(port, () => {
    console.log('Server listening at http://lcalhost:${port} ')
})