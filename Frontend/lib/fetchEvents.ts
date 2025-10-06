export type Event = {
  _id: string
  id: string 
  name: string
  startDate: string
  endDate: string
  location: string
  type: string
  status: "ongoing" | "previous"
  level: string
  viewed?: boolean
  updated?: boolean
}

export const fetchEventsFromBackend = async (): Promise<Event[]> => {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL

    if (!API_BASE) throw new Error("NEXT_PUBLIC_API_URL is not defined")

    const res = await fetch(`${API_BASE}/api/events`, { 
      // ✅ FIX: Dynamic Server Usage error  revalidate: 0 use
      next: {
        revalidate: 0,
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    return data.map((event: any) => ({
      ...event,
      id: event._id,
    }))
  } catch (err) {
    console.error("Error fetching events:", err)
    return []
  }
}

// export type Event = {
//   _id: string
//   id: string
//   name: string
//   startDate: string
//   endDate: string
//   location: string
//   type: string
//   status: "ongoing" | "previous"
//   level: string
//   viewed?: boolean
//   updated?: boolean
// }

// export const fetchEventsFromBackend = async (): Promise<Event[]> => {
//   try {
//     const API_BASE = process.env.NEXT_PUBLIC_API_URL
//     if (!API_BASE) throw new Error("NEXT_PUBLIC_API_URL is not defined in .env.local")

//     // Backend endpoint ka sahi path check karein: '/api/events'
//     const res = await fetch(`${API_BASE}/api/events`, {
//       next: { revalidate: 0 }, // Dynamic Server-side fetching (Next.js)
//     })

//     if (!res.ok) {
//       throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`)
//     }

//     const data: any[] = await res.json()

//     // Map backend fields to frontend Event type
//     return data.map((event) => ({
//       _id: event._id || event.id,
//       id: event._id || event.id,
//       name: event.name,
//       startDate: event.start_datetime || event.startDate,
//       endDate: event.end_datetime || event.endDate,
//       location: event.location || "",
//       type: event.event_type || event.type || "general",
//       status: event.status === "previous" ? "previous" : "ongoing", // Default fallback
//       level: event.level || "basic",
//       viewed: event.viewed || false,
//       updated: event.updated || false,
//     }))
//   } catch (err) {
//     console.error("Error fetching events:", err)
//     return []
//   }
// }
