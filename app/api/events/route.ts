// import { NextResponse } from "next/server";
// import mysql from "mysql2/promise";

// // Database connection
// const pool = mysql.createPool({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "Krrish@567",
//   database: process.env.DB_NAME || "event_management",
// });

// // GET request -> saare events laana
// export async function GET() {
//   try {
//     const [rows] = await pool.query("SELECT * FROM events");
//     return NextResponse.json(rows);
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: "Error fetching events", details: error.message },
//       { status: 500 }
//     );
//   }
// }

// // POST request -> naya event create karna
// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { eventName, description, startDate, endDate, startTime, endTime } = body;

//     if (!eventName || !startDate || !endDate) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     await pool.query(
//       "INSERT INTO events (eventName, description, startDate, endDate, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?)",
//       [eventName, description, startDate, endDate, startTime, endTime]
//     );

//     return NextResponse.json({ message: "Event created successfully" }, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: "Error creating event", details: error.message },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Database connection pool
const pool = mysql.createPool({
 host: process.env.DB_HOST || "localhost",
   user: process.env.DB_USER || "root",
   password: process.env.DB_PASSWORD || "Krrish@567",
 database: process.env.DB_NAME || "event_management",
});

// GET -> fetch all events
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM events");
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching events", details: error.message },
      { status: 500 }
    );
  }
}

// POST -> add new event
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventName, description, startDate, endDate, startTime, endTime, location, level, eventType, assignedUser } = body;

    if (!eventName || !startDate || !endDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await pool.query(
      `INSERT INTO events 
      (eventName, description, startDate, endDate, startTime, endTime, location, level, eventType, assignedUser)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [eventName, description, startDate, endDate, startTime, endTime, location, level, eventType, assignedUser]
    );

    return NextResponse.json({ message: "Event created successfully" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error creating event", details: error.message },
      { status: 500 }
    );
  }
}
