import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cookieParser from "cookie-parser";
import { hash, compare } from "bcrypt";
import { validateUser } from "./schemas/user.js";
import { login, register } from "./models/mysql.js";

const PORT = process.env.PORT ?? 4000
const app = express()
const server = createServer(app)
const io = new Server(server)
const ACCEPTED_DOMAINS = [
    "http://localhost:8080/",
    "http://localhost:3000/",
    "http://localhost:5173/",
    "http://127.0.0.1:5500"
]

app.use("*", (req, res, next) => {
    const origin = req.header("origin")
    
    if (ACCEPTED_DOMAINS.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin)
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.header("Access-Control-Allow-Credentials", "true");
        
        if (req.method === "OPTIONS") {
            return res.sendStatus(200); // End the response for preflight
        }
    }
    
    next()
})

app.disable("x-powered-by")

app.use(express.static(process.cwd() + "/client/"))
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + '/client/login.html')
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    const result = validateUser({username, password})

    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const {user, error} = await login({user: result.data})
    if (error) return res.status(401).json(error)

    res.send(user)
})

app.post('/register', async (req, res) => {
    const {username, password} = req.body
    const result = validateUser({username, password})

    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const {user, error} = await register({user: result.data})
    if (error) return res.status(401).json(error)

    res.send(user)
})

server.listen(PORT, () => {
    console.log('Up n\' running in port http://localhost:' + PORT)
})