import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Krrish@567",
  database: process.env.DB_NAME || "event_management",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
