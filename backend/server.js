// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

console.log("✅ JWT_SECRET from .env =>", process.env.JWT_SECRET);

const app = express();

// 🔥 Middleware
app.use(express.json());

// ✅ CORS Config (allow specific frontends)
app.use(cors({
  origin: [
    "http://localhost:3000", // local dev
    "https://inc-event-management-system.vercel.app", // deployed frontend
    "https://inc-event-management-system-5zoqlvwyd-krrish321s-projects.vercel.app" // another vercel preview
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// 🔹 Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

// ✅ Root route for testing
app.get("/", (req, res) => {
  res.send("🚀 API is running successfully on Render!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
