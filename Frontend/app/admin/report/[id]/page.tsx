"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { requireAuth } from "@/lib/auth"
import { dummyEvents, dummyUsers, type Event } from "@/lib/dummy-data"
import { ArrowLeft, BarChart3, Users, CheckCircle, XCircle, Printer, Calendar, MapPin, FileText } from "lucide-react"
import { format } from "date-fns"

export default function EventReportPage() {
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

  const assignedUser = event ? dummyUsers.find((user) => user.name === event.assignedUser) : null
  const totalUsers = dummyUsers.length
  const viewedCount = dummyUsers.filter((user) => user.viewed).length
  const updatedCount = dummyUsers.filter((user) => user.updated).length

  const handlePrintReport = () => {
    window.print()
  }

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => router.push("/admin-panel")} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin Panel</span>
          </Button>
          <Button onClick={handlePrintReport} className="flex items-center space-x-2">
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </Button>
        </div>

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Event Report</h1>
          <p className="text-muted-foreground">Detailed report for {event.name}</p>
        </div>

        {/* Event Overview */}
        <Card className="mb-6">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="text-xl font-bold text-primary flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Event Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-primary mb-2">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Event Name:</strong> {event.name}
                    </div>
                    <div>
                      <strong>Event Type:</strong>{" "}
                      <Badge variant="secondary" className="ml-2">
                        {event.type}
                      </Badge>
                    </div>
                    <div>
                      <strong>Level:</strong>{" "}
                      <Badge variant="outline" className="ml-2">
                        {event.level}
                      </Badge>
                    </div>
                    <div>
                      <strong>Status:</strong>
                      <Badge
                        variant={event.status === "ongoing" ? "default" : "secondary"}
                        className={`ml-2 ${event.status === "ongoing" ? "bg-primary" : ""}`}
                      >
                        {event.status === "ongoing" ? "Ongoing" : "Completed"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-primary mb-2">Location & Timing</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>
                        <strong>Location:</strong> {event.location}
                      </span>
                    </div>
                    <div>
                      <strong>Start:</strong> {format(new Date(event.startDate), "PPP 'at' p")}
                    </div>
                    <div>
                      <strong>End:</strong> {format(new Date(event.endDate), "PPP 'at' p")}
                    </div>
                    <div>
                      <strong>Issue Date:</strong> {format(new Date(event.issueDate), "PPP")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assignment & Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Assignment Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {assignedUser ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Assigned User</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Name:</strong> {assignedUser.name}
                      </div>
                      <div>
                        <strong>Designation:</strong> {assignedUser.designation}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        {assignedUser.viewed ? (
                          <CheckCircle className="w-6 h-6 text-primary" />
                        ) : (
                          <XCircle className="w-6 h-6 text-destructive" />
                        )}
                      </div>
                      <div className="text-sm font-medium">{assignedUser.viewed ? "Viewed" : "Not Viewed"}</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        {assignedUser.updated ? (
                          <CheckCircle className="w-6 h-6 text-primary" />
                        ) : (
                          <XCircle className="w-6 h-6 text-destructive" />
                        )}
                      </div>
                      <div className="text-sm font-medium">{assignedUser.updated ? "Updated" : "Not Updated"}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No user assigned to this event.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>System Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{totalUsers}</div>
                    <div className="text-sm text-muted-foreground">Total Users</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/5 rounded-lg">
                    <div className="text-2xl font-bold text-secondary">{dummyEvents.length}</div>
                    <div className="text-sm text-muted-foreground">Total Events</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-accent/5 rounded-lg">
                    <div className="text-xl font-bold text-accent">
                      {viewedCount}/{totalUsers}
                    </div>
                    <div className="text-sm text-muted-foreground">Events Viewed</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((viewedCount / totalUsers) * 100)}% completion
                    </div>
                  </div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="text-xl font-bold text-primary">
                      {updatedCount}/{totalUsers}
                    </div>
                    <div className="text-sm text-muted-foreground">Events Updated</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((updatedCount / totalUsers) * 100)}% completion
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Event Description */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>Event Description</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </CardContent>
        </Card>

        {/* Additional Information */}
        {(event.attendeesCount || event.updatingDate) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.attendeesCount && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Attendance</h4>
                    <div className="text-2xl font-bold text-primary">{event.attendeesCount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Attendees</div>
                  </div>
                )}
                {event.updatingDate && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Last Update</h4>
                    <div className="text-lg font-bold text-secondary">
                      {format(new Date(event.updatingDate), "PPP")}
                    </div>
                    <div className="text-sm text-muted-foreground">Update Date</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-4">
          <Button onClick={handlePrintReport} className="bg-primary hover:bg-primary/90 flex items-center space-x-2">
            <Printer className="w-4 h-4" />
            <span>Print Detailed Report</span>
          </Button>
          <Button variant="outline" onClick={() => router.push("/admin/reports")}>
            View All Reports
          </Button>
        </div>
      </div>
    </div>
  )
}
