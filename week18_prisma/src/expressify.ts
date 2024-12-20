import express from "express";
import auth from "./routes/auth";
import todo from "./routes/todo"

const app = express()

app.use(express.json())

app.use('/api/v1/user', auth)
app.use('/api/v1/todos', todo)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server Listening at http://localhost:${PORT}`)
})