import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

console.log("JWT_SECRET from .env =>", process.env.JWT_SECRET);

const app = express();

// 🔥 Middleware first
app.use(express.json()); // body parsing
app.use(cors({
  origin: [
    "http://localhost:3000", // local dev
    "https://inc-event-management-system-5zoqlvwyd-krrish321s-projects.vercel.app" // deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// 🔹 Routes after middleware
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
