export type Event = {
  _id: string
  id: string // frontend ke liye
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
    const res = await fetch("http://localhost:5000/api/events") // ✅ Correct backend URL
    const data = await res.json()
    return data.map((event: any) => ({
      ...event,
      id: event._id,
    }))
  } catch (err) {
    console.log("Error fetching events:", err)
    return []
  }
}