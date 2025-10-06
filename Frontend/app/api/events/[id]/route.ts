// import { NextResponse } from "next/server";
// import db from "../../../../backend/config/db.js";


// // ✅ Get single event by ID
// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   const { id } = params;
//   try {
//     const [rows]: any = await db.execute("SELECT * FROM events WHERE id = ?", [id]);

//     if (rows.length === 0) {
//       return NextResponse.json({ message: "Event not found" }, { status: 404 });
//     }

//     return NextResponse.json(rows[0], { status: 200 });
//   } catch (error: any) {
//     console.error("GET by ID Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // ✅ Update event by ID
// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   const { id } = params;
//   const data = await req.json();

//   const {
//     eventName,
//     description,
//     startDate,
//     startTime,
//     endDate,
//     endTime,
//     issueDate,
//     location,
//     eventType,
//     level,
//     assignedUser,
//   } = data;

//   const start_datetime = `${startDate} ${startTime}`;
//   const end_datetime = `${endDate} ${endTime}`;

//   try {
//     const [result]: any = await db.execute(
//       `UPDATE events 
//        SET name = ?, description = ?, start_datetime = ?, end_datetime = ?, issue_date = ?, location = ?, event_type = ?, level = ?, created_by = ?
//        WHERE id = ?`,
//       [
//         eventName,
//         description,
//         start_datetime,
//         end_datetime,
//         issueDate,
//         location,
//         eventType,
//         level,
//         assignedUser,
//         id,
//       ]
//     );

//     if (result.affectedRows === 0) {
//       return NextResponse.json({ message: "Event not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Event updated successfully!" }, { status: 200 });
//   } catch (error: any) {
//     console.error("PUT Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // ✅ Delete event by ID
// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     const [result]: any = await db.execute("DELETE FROM events WHERE id = ?", [id]);

//     if (result.affectedRows === 0) {
//       return NextResponse.json({ message: "Event not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Event deleted successfully!" }, { status: 200 });
//   } catch (error: any) {
//     console.error("DELETE Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import db from "../../../../backend/config/db.js";

// ✅ Get single event by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const [rows]: any = await db.execute("SELECT * FROM events WHERE id = ?", [id]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0], { status: 200 });
  } catch (error: any) {
    console.error("GET BY ID Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Update event by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // ✅ Check content type
    const contentType = req.headers.get("content-type") || "";
    let body: any = {};

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("multipart/form-data")) {
      // FormData handling (placeholder)
      // Note: Next.js 13 App Router does not parse multipart natively, use formidable/multer if needed
      body = {}; // For now, frontend sends JSON first
    }

    const {
      location = null,
      startDate = null,
      attendeesCount = null,
      updatingDate = null,
    } = body;

    // ✅ Validate numeric field
    const attendees_count_num =
      attendeesCount !== null && attendeesCount !== undefined
        ? parseInt(attendeesCount)
        : null;

    const [result]: any = await db.execute(
      `UPDATE events 
       SET location = ?, start_datetime = ?, attendees_count = ?, updated_at = ?
       WHERE id = ?`,
      [location || null, startDate || null, attendees_count_num, updatingDate || null, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event updated successfully!" }, { status: 200 });
  } catch (error: any) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
