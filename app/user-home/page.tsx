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
import { fetchEventsFromBackend, type Event } from "../../lib/fetchEvents"
import { Eye, Edit, Calendar, MapPin, Users } from "lucide-react"
import { format } from "date-fns"


const dummyEvents: Event[] = [
  {
    _id: "dummy1",
    id: "dummy1",
    name: "new Ongoing Event",
    startDate: "2025-09-20T10:00:00Z",
    endDate: "2025-09-20T12:00:00Z",
    location: "Indore",
    type: "Meeting",
    status: "ongoing",
    level: "College",
  },
  {
    _id: "dummy2",
    id: "dummy2",
    name: "old Previous Event",
    startDate: "2025-08-15T14:00:00Z",
    endDate: "2025-08-15T16:00:00Z",
    location: "Bhopal",
    type: "Rally",
    status: "previous",
    level: "Jila",
  },
  {
    _id: "dummy3",
    id: "dummy3",
    name: "Another  Event",
    startDate: "2025-09-25T09:00:00Z",
    endDate: "2025-09-25T11:00:00Z",
    location: "Ujjain",
    type: "Dharnā",
    status: "ongoing",
    level: "Block",
  },
]

export default function UserHomePage() {
  const [filter, setFilter] = useState<"ongoing" | "previous">("ongoing")
  const [events, setEvents] = useState<Event[]>([])
  const [realEvents, setRealEvents] = useState<Event[]>([])
  const router = useRouter()

  useEffect(() => {
    requireAuth("user")
    const savedFilter = localStorage.getItem("eventFilter") as "ongoing" | "previous"
    if (savedFilter) {
      setFilter(savedFilter)
      localStorage.removeItem("eventFilter")
    }

    //  Fetch real events from backend
    fetchEventsFromBackend()
      .then((data) => {
        setRealEvents(data)
        console.log("Fetched Real Events:", data)
      })
      .catch((err) => {
        console.error("Error fetching real events:", err)
        // If fetch fails, show only dummy data
        setRealEvents([])
      })
  }, [])

  // Combine dummy events and real events
  const allEvents = [...dummyEvents, ...realEvents]

  // ✅ Updated filtering logic to handle different status strings
  const filteredEvents = allEvents.filter((event) => {
    const status = event.status?.toLowerCase()
    if (filter === "ongoing") {
      // Common "ongoing" values from backend
      return status === "ongoing" || status === "active" || status === "upcoming"
    }
    if (filter === "previous") {
      // Common "previous" values from backend
      return status === "previous" || status === "completed"
    }
    return false
  })

  const handleShowDetails = (eventId: string) => {
    setEvents((prev) => prev.map((event) => (event.id === eventId ? { ...event, viewed: true } : event)))
    router.push(`/event-details/${eventId}`)
  }

  const handleUpdate = (eventId: string) => {
    router.push(`/update-event/${eventId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <span className="text-3xl font-bold text-primary-foreground">INC</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
            Welcome to Event Management
          </h1>
          <p className="text-lg text-muted-foreground">Manage and track your assigned events efficiently</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{allEvents.length}</div>
              <p className="text-xs text-muted-foreground mt-1">All assigned events</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-card to-secondary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ongoing Events</CardTitle>
              <Users className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">
                {allEvents.filter((e) => e.status && (e.status.toLowerCase() === "ongoing" || e.status.toLowerCase() === "active" || e.status.toLowerCase() === "upcoming")).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Currently active</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-card to-accent/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Events</CardTitle>
              <Eye className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {allEvents.filter((e) => e.status && (e.status.toLowerCase() === "previous" || e.status.toLowerCase() === "completed")).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Successfully completed</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 border-0 bg-gradient-to-r from-card to-primary/5 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Filter Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={filter} onValueChange={(value: "ongoing" | "previous") => setFilter(value)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200">
                  <RadioGroupItem value="ongoing" id="ongoing" />
                  <Label htmlFor="ongoing" className="font-medium cursor-pointer text-base">
                    Ongoing Events
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-border/50 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-200">
                  <RadioGroupItem value="previous" id="previous" />
                  <Label htmlFor="previous" className="font-medium cursor-pointer text-base">
                    Previous Events
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl">
              <span>{filter === "ongoing" ? "Ongoing" : "Previous"} Events</span>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {filteredEvents.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-16 font-semibold">S. No.</TableHead>
                    <TableHead className="font-semibold">Event Name</TableHead>
                    <TableHead className="font-semibold">Event Date</TableHead>
                    <TableHead className="font-semibold">Location</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                        <div className="flex flex-col items-center space-y-2">
                          <Calendar className="w-12 h-12 text-muted-foreground/50" />
                          <p className="text-lg font-medium">No {filter} events found</p>
                          <p className="text-sm">Check back later for updates</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEvents.map((event, index) => (
                      <TableRow
                        key={event.id}
                        className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-200 group"
                      >
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <button
                            onClick={() => handleShowDetails(event.id)}
                            className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline text-left transition-all duration-200 group-hover:scale-105"
                          >
                            {event.name}
                          </button>
                          <div className="flex items-center space-x-2 mt-1">
                            {!event.viewed && (
                              <Badge variant="destructive" className="text-xs animate-pulse">
                                New
                              </Badge>
                            )}
                            {event.updated && (
                              <Badge variant="default" className="text-xs bg-primary animate-pulse">
                                Updated
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{format(new Date(event.startDate), "MMM dd, yyyy")}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(event.startDate), "HH:mm")} - {format(new Date(event.endDate), "HH:mm")}
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
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={event.status === "ongoing" ? "default" : "secondary"}
                            className={event.status === "ongoing" ? "bg-primary" : ""}
                          >
                            {event.status === "ongoing" ? "Ongoing" : "Completed"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShowDetails(event.id)}
                              className="flex items-center space-x-1 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200 hover:scale-105"
                            >
                              <Eye className="w-4 h-4" />
                              <span>Details</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdate(event.id)}
                              className="flex items-center space-x-1 hover:bg-secondary/10 hover:text-secondary hover:border-secondary/50 transition-all duration-200 hover:scale-105"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Update</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}