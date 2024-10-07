import { compareSync, hash } from "bcrypt";
import mysql from "mysql2/promise";
import "dotenv/config"

const config = {
    host: process.env.MYSQL_HOST_AVN,
    user: process.env.MYSQL_USER_AVN,
    password: process.env.MYSQL_PASSWORD_AVN,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT_AVN,
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.MYSQL_CA_PATH
    }
}

const connection = await mysql.createConnection(config)

export async function login({user}) {
    const {username, password} = (await connection.query("SELECT username, password FROM users WHERE LOWER(username) = ?", [user.username.toLowerCase()]))[0][0]
    
    if (!username) return { error : "No user found with the given credentials"};
    const isValid = compareSync(user.password, password)
    console.log(isValid)
    return {user}
}

export async function register({user}) {
    await connection.query("INSERT INTO users(username, password) VALUES (?, ?);", user.username, hash(user.password, 10))
}