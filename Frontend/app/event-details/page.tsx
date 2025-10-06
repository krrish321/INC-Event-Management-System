// app/events/page.tsx
'use client';

import { useEffect, useState } from 'react';

// Define the shape of an event object
interface Event {
  id: number;
  name: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  location: string;
  // Add other properties as needed
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);

        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading events...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-2 text-indigo-700">{event.name}</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="text-sm text-gray-500">
                <p><strong>Starts:</strong> {new Date(event.start_datetime).toLocaleString()}</p>
                <p><strong>Ends:</strong> {new Date(event.end_datetime).toLocaleString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No events found.</p>
        )}
      </div>
    </div>
  );
}