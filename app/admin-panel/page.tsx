"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireAuth } from "@/lib/auth"
import { type Event } from "@/lib/dummy-data"
import { Eye, Calendar, MapPin, Users, Plus, BarChart3, Shield, CheckCircle, XCircle } from "lucide-react"
import { format } from "date-fns"

export default function AdminPanelPage() {
  const [filter, setFilter] = useState<"ongoing" | "previous">("ongoing")
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    requireAuth("admin")
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/events", {
        cache: "no-store",
      })
      if (!res.ok) {
        throw new Error("Failed to fetch events")
      }
      const data = await res.json()
      setEvents(data)
    } catch (error) {
      console.error("Error fetching events:", error)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  const getBadgeClasses = (type: string) => {
    switch (type) {
      case "Rally":
        return "bg-primary/10 text-primary"
      case "Dharnā":
        return "bg-secondary/10 text-secondary"
      case "Meeting":
        return "bg-accent/10 text-accent"
      default:
        return "bg-muted"
    }
  }

  // Filter events based on the selected status. For "ongoing", all events are returned.
  const filteredEvents = events.filter((event) => {
    const status = event.status?.toLowerCase()
    if (filter === "ongoing") {
      return true; // Correctly returns all events
    }
    if (filter === "previous") {
      return status === "previous" || status === "completed"
    }
    return false
  })

  // Calculate counts for the stats cards using the same filtering logic
  const totalOngoingEvents = events.filter(
    (e) => e.status && (e.status.toLowerCase() === "ongoing" || e.status.toLowerCase() === "active" || e.status.toLowerCase() === "upcoming")
  ).length
  const totalPreviousEvents = events.filter(
    (e) => e.status && (e.status.toLowerCase() === "previous" || e.status.toLowerCase() === "completed")
  ).length
  const totalEvents = events.length

  const handleShowDetails = (eventId: string) => {
    router.push(`/admin/event-details/${eventId}`)
  }

  const handleShowReport = (eventId: string) => {
    router.push(`/admin/report/${eventId}`)
  }

  const handleAddEvent = () => {
    router.push("/admin/add-event")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-primary mb-2">Admin Control Panel</h1>
          <p className="text-center text-muted-foreground">Manage events and monitor user activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalEvents}</div>
              <p className="text-xs text-muted-foreground mt-1">All events</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-card to-secondary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ongoing Events</CardTitle>
              <Users className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{totalOngoingEvents}</div>
              <p className="text-xs text-muted-foreground mt-1">Currently active events</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-card to-accent/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Events</CardTitle>
              <Eye className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{totalPreviousEvents}</div>
              <p className="text-xs text-muted-foreground mt-1">Successfully completed events</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button onClick={handleAddEvent} className="bg-primary hover:bg-primary/90 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/admin/reports")}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>View All Reports</span>
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Events</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={filter} onValueChange={(value: "ongoing" | "previous") => setFilter(value)}>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ongoing" id="ongoing" />
                  <Label htmlFor="ongoing" className="font-medium">
                    Ongoing Events
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="previous" id="previous" />
                  <Label htmlFor="previous" className="font-medium">
                    Previous Events
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Events Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>{filter === "ongoing" ? "Ongoing" : "Previous"} Events</span>
              <Badge variant="secondary">{filteredEvents.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading events...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">S. No.</TableHead>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Event Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Assigned User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          No {filter} events found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEvents.map((event, index) => {
                        const startDate = new Date(event.startDate);
                        const endDate = new Date(event.endDate);
                        const isValidStartDate = !isNaN(startDate.getTime());
                        const isValidEndDate = !isNaN(endDate.getTime());
                        
                        return (
                          <TableRow key={event.id} className="hover:bg-muted/50 transition-colors">
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                              <div>
                                <button
                                  onClick={() => handleShowDetails(event.id)}
                                  className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline text-left"
                                >
                                  {event.name}
                                </button>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge
                                    variant="secondary"
                                    className={`text-xs ${getBadgeClasses(event.type)}`}
                                  >
                                    {event.type}
                                  </Badge>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1 text-sm">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span>{isValidStartDate ? format(startDate, "MMM dd, yyyy") : "N/A"}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {isValidStartDate && isValidEndDate
                                  ? `${format(startDate, "HH:mm")} - ${format(endDate, "HH:mm")}`
                                  : "N/A"}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1 text-sm">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span>{event.location}</span>
                              </div>
                              <Badge variant="outline" className="text-xs mt-1">
                                {event.level}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm font-medium">{event.assignedUser}</div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={event.status === "ongoing" || event.status === "active" || event.status === "upcoming" ? "default" : "secondary"}
                                className={event.status === "ongoing" || event.status === "active" || event.status === "upcoming" ? "bg-primary" : ""}
                              >
                                {event.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                  {event.viewed ? (
                                    <CheckCircle className="w-4 h-4 text-primary" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-destructive" />
                                  )}
                                  <span className="text-xs">Viewed</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {event.updated ? (
                                    <CheckCircle className="w-4 h-4 text-primary" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-destructive" />
                                  )}
                                  <span className="text-xs">Updated</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleShowDetails(event.id)}
                                  className="flex items-center space-x-1"
                                >
                                  <Eye className="w-4 h-4" />
                                  <span>Details</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleShowReport(event.id)}
                                  className="flex items-center space-x-1"
                                >
                                  <BarChart3 className="w-4 h-4" />
                                  <span>Report</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
