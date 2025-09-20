// components/EventCard.tsx

import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.start_datetime);
  const endDate = new Date(event.end_datetime);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-xl">{event.name}</CardTitle>
          <Badge>{event.event_type}</Badge>
        </div>
        <div className="text-sm text-gray-500 flex justify-between">
          <span>{format(startDate, "MMM d, yyyy h:mm a")}</span>
          <span>{format(endDate, "MMM d, yyyy h:mm a")}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-2 line-clamp-3">{event.description}</p>
        <div className="flex items-center text-sm text-gray-500 mt-4">
          <span className="mr-2">📍</span>
          <span>{event.location}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Badge variant="secondary">{event.level}</Badge>
          <span className="text-xs text-gray-400">User: {event.created_by}</span>
        </div>
      </CardContent>
    </Card>
  );
}