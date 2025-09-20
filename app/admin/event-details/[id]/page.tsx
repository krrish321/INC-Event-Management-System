"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { requireAuth } from "@/lib/auth"
import { dummyEvents, type Event } from "@/lib/dummy-data"
import { ArrowLeft, Calendar, MapPin, FileText, Tag, Users, BarChart3 } from "lucide-react"
import { format } from "date-fns"

export default function AdminEventDetailsPage() {
  const [event, setEvent] = useState<Event | null>(null)
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  useEffect(() => {
    requireAuth("admin")

    const foundEvent = dummyEvents.find((e) => e.id === eventId)
    if (foundEvent) {
      setEvent(foundEvent)
    }
  }, [eventId])

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive">Event Not Found</h1>
            <p className="text-muted-foreground mt-2">The requested event could not be found.</p>
            <Button onClick={() => router.push("/admin-panel")} className="mt-4">
              Back to Admin Panel
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => router.push("/admin-panel")} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin Panel</span>
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/admin/report/${event.id}`)}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>View Report</span>
            </Button>
            <Badge variant="default" className="bg-accent">
              Admin View
            </Badge>
          </div>
        </div>

        {/* Event Details Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-primary mb-2">{event.name}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Tag className="w-4 h-4" />
                    <span>Event ID: {event.id}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${
                      event.type === "Rally"
                        ? "bg-primary/10 text-primary"
                        : event.type === "Dharnā"
                          ? "bg-secondary/10 text-secondary"
                          : event.type === "Meeting"
                            ? "bg-accent/10 text-accent"
                            : "bg-muted"
                    }`}
                  >
                    {event.type}
                  </Badge>
                </div>
              </div>
              <Badge
                variant={event.status === "ongoing" ? "default" : "secondary"}
                className={`${event.status === "ongoing" ? "bg-primary" : ""} text-lg px-3 py-1`}
              >
                {event.status === "ongoing" ? "Ongoing" : "Completed"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <span>Description</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </div>

            <Separator />

            {/* Event Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date & Time */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Date & Time</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Start Date:</span>
                    <span>{format(new Date(event.startDate), "PPP 'at' p")}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">End Date:</span>
                    <span>{format(new Date(event.endDate), "PPP 'at' p")}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Issue Date:</span>
                    <span>{format(new Date(event.issueDate), "PPP")}</span>
                  </div>
                </div>
              </div>

              {/* Location & Assignment */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Location & Assignment</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Location:</span>
                    <span className="text-right">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Level:</span>
                    <Badge variant="outline">{event.level}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Assigned User:</span>
                    <span>{event.assignedUser}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Tracking */}
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Progress Tracking</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <span className="font-medium">Event Viewed:</span>
                  <Badge
                    variant={event.viewed ? "default" : "destructive"}
                    className={event.viewed ? "bg-primary" : ""}
                  >
                    {event.viewed ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <span className="font-medium">Event Updated:</span>
                  <Badge
                    variant={event.updated ? "default" : "destructive"}
                    className={event.updated ? "bg-primary" : ""}
                  >
                    {event.updated ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            {(event.attendeesCount || event.updatingDate) && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>Additional Information</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.attendeesCount && (
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Attendees Count:</span>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {event.attendeesCount.toLocaleString()}
                        </Badge>
                      </div>
                    )}
                    {event.updatingDate && (
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Last Updated:</span>
                        <span>{format(new Date(event.updatingDate), "PPP")}</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-4 pt-4">
              <Button
                onClick={() => router.push(`/admin/report/${event.id}`)}
                className="bg-primary hover:bg-primary/90 flex items-center space-x-2"
                size="lg"
              >
                <BarChart3 className="w-4 h-4" />
                <span>View Detailed Report</span>
              </Button>
              <Button variant="outline" onClick={() => router.push("/admin-panel")} size="lg">
                Back to Admin Panel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
