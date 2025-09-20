import express from "express";
import { getEvents, createEvent, updateEvent, deleteEvent, getEventById } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents); // ✅ This is for http://localhost:5000/api/events
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.get("/:id", getEventById); // ✅ This is for http://localhost:5000/api/events/4

export default router;