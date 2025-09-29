// // app/events/page.tsx

// import EventCard from "@/components/EventCard"; 
// import Link from "next/link";
// import { format } from "date-fns";

// // Event data structure 
// interface Event {
//   id: number;
//   name: string;
//   description: string;
//   start_datetime: string;
//   end_datetime: string;
//   location: string;
//   event_type: string;
//   level: string;
//   created_by: number;
// }

// // Data fetch async function
// async function getEvents() {
//   try {
//     const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// const response = await fetch(`${API_BASE}/api/events`, {
//   cache: "no-store",
// });
    
//     if (!response.ok) {
//       throw new Error("Failed to fetch events");
//     }
    
//     return response.json();
//   } catch (error) {
//     console.error("Failed to fetch events:", error);
//     return []; // Error empty array return
//   }
// }

// export default async function EventsPage() {
//   const events: Event[] = await getEvents();

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h1>
//       {events.length === 0 ? (
//         <p className="text-center text-gray-500">No events found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {events.map((event) => (
//             <EventCard key={event.id} event={event} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import EventCard from "@/components/EventCard";

// Event type according to SQL table
interface Event {
  id: number;
  name: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  location: string;
  event_type: string;
  level: string;
  created_by: number;
}

// Fetch events from our API route
async function getEvents(): Promise<Event[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {
      // ✅ FIX: Dynamic Server Usage error  revalidate: 0 use
      next: {
        revalidate: 0,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export default async function EventsPage() {
  const events: Event[] = await getEvents();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}