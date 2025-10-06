// import express from "express";
// import { getEvents, createEvent, updateEvent, deleteEvent, getEventById } from "../controllers/eventController.js";

// const router = express.Router();

// router.get("/", getEvents); // ✅ This is for http://localhost:5000/api/events
// router.post("/", createEvent);
// router.put("/:id", updateEvent);
// router.delete("/:id", deleteEvent);
// router.get("/:id", getEventById); // ✅ This is for http://localhost:5000/api/events/4

// export default router;

import express from "express";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
} from "../controllers/eventController.js";

const router = express.Router();

// ✅ All routes are prefixed with /api/events in server.js
// So, here we define relative paths only

// GET all events -> GET http://localhost:5000/api/events
router.get("/", getEvents);

// POST create new event -> POST http://localhost:5000/api/events
router.post("/", createEvent);

// PUT update event by id -> PUT http://localhost:5000/api/events/:id
router.put("/:id", updateEvent);

// DELETE event by id -> DELETE http://localhost:5000/api/events/:id
router.delete("/:id", deleteEvent);

// GET single event by id -> GET http://localhost:5000/api/events/:id
router.get("/:id", getEventById);

export default router;
