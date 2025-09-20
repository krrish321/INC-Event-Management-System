import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
// import db from "../config/db.js";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loginUser = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: "Code required" });

    const [rows] = await db.query("SELECT * FROM users WHERE code = ?", [code]);
    if (rows.length === 0) return res.status(401).json({ message: "Invalid code" });

    const user = rows[0];

    // payload (avoid sensitive fields)
    const payload = { id: user.id, role: user.role, name: user.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ message: "Login successful", token, user: payload });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
