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


// import { NextResponse } from "next/server";
// import mysql from "mysql2/promise";

// // Database connection pool
// const pool = mysql.createPool({
//  host: process.env.DB_HOST || "localhost",
//    user: process.env.DB_USER || "root",
//    password: process.env.DB_PASSWORD || "Krrish@567",
//  database: process.env.DB_NAME || "event_management",
// });

// // GET -> fetch all events
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

// // POST -> add new event
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { eventName, description, startDate, endDate, startTime, endTime, location, level, eventType, assignedUser } = body;

//     if (!eventName || !startDate || !endDate) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     await pool.query(
//       `INSERT INTO events 
//       (eventName, description, startDate, endDate, startTime, endTime, location, level, eventType, assignedUser)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [eventName, description, startDate, endDate, startTime, endTime, location, level, eventType, assignedUser]
//     );

//     return NextResponse.json({ message: "Event created successfully" }, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: "Error creating event", details: error.message },
//       { status: 500 }
//     );
//   }
// }




import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Krrish@567",
  database: process.env.DB_NAME || "event_management",
};

// ✅ GET all events
export async function GET() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM events");
    await connection.end();

    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

// ✅ POST new event
export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Event Data Received:", data);

    const connection = await mysql.createConnection(dbConfig);

    const {
      eventName,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      issueDate,
      location,
      eventType,
      level,
      assignedUser,
    } = data;

    const start_datetime = `${startDate} ${startTime}`;
    const end_datetime = `${endDate} ${endTime}`;

    const [result] = await connection.execute(
      `INSERT INTO events 
      (name, description, start_datetime, end_datetime, issue_date, location, event_type, level, created_by) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [eventName, description, start_datetime, end_datetime, issueDate, location, eventType, level, assignedUser]
    );

    await connection.end();

    return NextResponse.json(
      { message: "Event created successfully!", eventId: (result as any).insertId },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
