import { compareSync, hash } from "bcrypt";
import mysql from "mysql2/promise";

const config = {
    host: "mysql-39d693e2-nodechat1.l.aivencloud.com",
    user: "avnadmin",
    password: "AVNS_YkZ4tCTI2eWvPRYzlpG",
    database: "chat",
    port: 25926,
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