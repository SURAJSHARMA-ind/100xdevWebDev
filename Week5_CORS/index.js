const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(bodyparser.json()) //jsonparser middleware to parse json data 

app.post('/sum',(req,res)=>{
const a = parseInt(req.body.a);
const b = parseInt(req.body.b);

res.json({
    answer : a+b
})
})


app.listen(3000,()=>{
    console.log('server is listening at http://localhost:3000');
})