import db from "../config/db.js";

// 🔹 Get all events
export const getEvents = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM events ORDER BY start_datetime DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Create new event
export const createEvent = async (req, res) => {
  const { 
    eventName, 
    description, 
    startDate, 
    startTime, 
    endDate, 
    endTime, 
    issueDate, 
    location, 
    level, 
    eventType, 
    assignedUser 
} = req.body;

  try {
    const start_datetime = `${startDate} ${startTime}`;
    const end_datetime = `${endDate} ${endTime}`;

    // SQL query
    const sql = `INSERT INTO events (name, description, start_datetime, end_datetime, issue_date, location, event_type, level, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Values array 
    const values = [
      eventName, 
      description, 
      start_datetime, 
      end_datetime, 
      issueDate, 
      location, 
      eventType, 
      level, 
      Number(assignedUser)
    ];
    
    const [result] = await db.query(sql, values);

    res.status(201).json({ message: "Event created successfully", eventId: result.insertId });
  } catch (error) {
    console.error("Error inserting event =>", error);
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Update event by ID
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { 
    eventName, 
    description, 
    startDate, 
    startTime, 
    endDate, 
    endTime, 
    issueDate, 
    location, 
    level, 
    eventType, 
    assignedUser 
} = req.body;
  
  try {
    const start_datetime = `${startDate} ${startTime}`;
    const end_datetime = `${endDate} ${endTime}`;

    const [result] = await db.query(
      `UPDATE events SET name=?, description=?, start_datetime=?, end_datetime=?, issue_date=?, location=?, event_type=?, level=?, created_by=? WHERE id=?`,
      [
        eventName, 
        description, 
        start_datetime, 
        end_datetime, 
        issueDate, 
        location, 
        eventType, 
        level, 
        Number(assignedUser), 
        id
      ]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Delete event by ID
export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM events WHERE id=?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Get single event by ID
export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM events WHERE id=?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};