"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

interface Event {
  _id: string;
  eventName: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  level: string;
  eventType: string;
  assignedUser: string;
}

export default function AdminEventListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Backend URL from environment variable
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`${BASE_URL}/api/events`);
        if (!res.ok) throw new Error(`Failed to fetch events: ${res.statusText}`);

        const data: Event[] = await res.json();
        setEvents(data);
      } catch (err: any) {
        console.error("Failed to fetch events:", err);
        setError(err.message || "Error fetching events");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [BASE_URL]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Loading events...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 border-b-2 pb-2">
        Admin Event List
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {event.eventName}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="space-y-1 text-sm text-gray-700">
                  <p>
                    <strong>Type:</strong> {event.eventType}
                  </p>
                  <p>
                    <strong>Level:</strong> {event.level}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {event.startDate
                      ? format(new Date(event.startDate), "PPP")
                      : "Date not available"}
                  </p>
                  <p>
                    <strong>Assigned To:</strong> {event.assignedUser || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
