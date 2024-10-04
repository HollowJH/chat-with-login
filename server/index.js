import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT ?? 4000
const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(PORT, () => {
    console.log('Up n\' running in port http://localhost:' + PORT)
})