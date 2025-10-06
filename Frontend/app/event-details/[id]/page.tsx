// "use client"

// import { useState, useEffect } from "react"
// import { useRouter, useParams } from "next/navigation"
// import { Navbar } from "@/components/navbar"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { requireAuth } from "@/lib/auth"
// import { dummyEvents, type Event } from "@/lib/dummy-data"
// import { ArrowLeft, Calendar, MapPin, Clock, FileText, Tag, Users, Loader2 } from "lucide-react"
// import { format } from "date-fns"

// export default function EventDetailsPage() {
//   const [event, setEvent] = useState<Event | null>(null)
//   const [loading, setLoading] = useState<boolean>(true)
//   const router = useRouter()
//   const params = useParams()
//   const eventId = params.id as string

//   useEffect(() => {
//     requireAuth("admin")

//     const fetchEvent = () => {
//       setLoading(true)
//       // Log the eventId to see what's being passed in the URL
//       console.log(`Searching for event with ID: ${eventId}`)
//       // Log the available event IDs for comparison
//       console.log("Available dummy event IDs:", dummyEvents.map(e => e.id))

//       // Find the event by ID
//       let foundEvent = dummyEvents.find((e) => e.id === eventId)

//       // Fallback: if the event isn't found, use the first one as a default
//       if (!foundEvent && dummyEvents.length > 0) {
//         foundEvent = dummyEvents[0]
//         console.warn(`Event with ID: ${eventId} not found. Displaying the first event in the dummy data as a fallback.`)
//       }
      
//       if (foundEvent) {
//         // Mocking a successful API call
//         setTimeout(() => {
//           setEvent({ ...foundEvent, viewed: true })
//           setLoading(false)
//           console.log(`Event found: ${foundEvent.name}`)
//         }, 500)
//       } else {
//         // Handle case where no events are found at all
//         setLoading(false)
//         console.error(`Event with ID: ${eventId} not found, and no dummy events are available.`)
//       }
//     }

//     fetchEvent()
//   }, [eventId])

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Loader2 className="h-10 w-10 text-primary animate-spin" />
//       </div>
//     )
//   }

//   if (!event) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-destructive">Event Not Found</h1>
//             <p className="text-muted-foreground mt-2">The requested event could not be found.</p>
//             <Button onClick={() => router.push("/admin")} className="mt-4">
//               Back to Admin Panel
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const startDate = new Date(event.startDate)
//   const endDate = new Date(event.endDate)
//   const issueDate = new Date(event.issueDate)
//   const updatingDate = event.updatingDate ? new Date(event.updatingDate) : null
  
//   const isValidStartDate = !isNaN(startDate.getTime())
//   const isValidEndDate = !isNaN(endDate.getTime())
//   const isValidIssueDate = !isNaN(issueDate.getTime())
//   const isValidUpdatingDate = updatingDate ? !isNaN(updatingDate.getTime()) : false

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <Button variant="outline" onClick={() => router.push("/admin")} className="flex items-center space-x-2">
//             <ArrowLeft className="w-4 h-4" />
//             <span>Back to Admin Panel</span>
//           </Button>
//           <Badge variant="default" className="bg-primary">
//             Event Viewed
//           </Badge>
//         </div>

//         {/* Event Details Card */}
//         <Card className="shadow-lg">
//           <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
//             <div className="flex items-start justify-between">
//               <div>
//                 <CardTitle className="text-2xl font-bold text-primary mb-2">{event.name}</CardTitle>
//                 <div className="flex items-center space-x-4 text-sm text-muted-foreground">
//                   <div className="flex items-center space-x-1">
//                     <Tag className="w-4 h-4" />
//                     <span>Event ID: {event.id}</span>
//                   </div>
//                   <Badge
//                     variant="secondary"
//                     className={`${
//                       event.type === "Rally"
//                         ? "bg-primary/10 text-primary"
//                         : event.type === "Dharnā"
//                           ? "bg-secondary/10 text-secondary"
//                           : event.type === "Meeting"
//                             ? "bg-accent/10 text-accent"
//                             : "bg-muted"
//                     }`}
//                   >
//                     {event.type}
//                   </Badge>
//                 </div>
//               </div>
//               <Badge
//                 variant={event.status === "ongoing" ? "default" : "secondary"}
//                 className={`${event.status === "ongoing" ? "bg-primary" : ""} text-lg px-3 py-1`}
//               >
//                 {event.status === "ongoing" ? "Ongoing" : "Completed"}
//               </Badge>
//             </div>
//           </CardHeader>

//           <CardContent className="p-6 space-y-6">
//             {/* Description */}
//             <div>
//               <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
//                 <FileText className="w-5 h-5 text-primary" />
//                 <span>Description</span>
//               </h3>
//               <p className="text-muted-foreground leading-relaxed">{event.description}</p>
//             </div>

//             <Separator />

//             {/* Event Information Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Date & Time */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold flex items-center space-x-2">
//                   <Calendar className="w-5 h-5 text-primary" />
//                   <span>Date & Time</span>
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
//                     <span className="font-medium">Start Date:</span>
//                     <span>{isValidStartDate ? format(startDate, "PPP 'at' p") : "N/A"}</span>
//                   </div>
//                   <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
//                     <span className="font-medium">End Date:</span>
//                     <span>{isValidEndDate ? format(endDate, "PPP 'at' p") : "N/A"}</span>
//                   </div>
//                   <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
//                     <span className="font-medium">Issue Date:</span>
//                     <span>{isValidIssueDate ? format(issueDate, "PPP") : "N/A"}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Location & Details */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold flex items-center space-x-2">
//                   <MapPin className="w-5 h-5 text-primary" />
//                   <span>Location & Details</span>
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
//                     <span className="font-medium">Location:</span>
//                     <span className="text-right">{event.location}</span>
//                   </div>
//                   <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
//                     <span className="font-medium">Level:</span>
//                     <Badge variant="outline">{event.level}</Badge>
//                   </div>
//                   <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
//                     <span className="font-medium">Assigned User:</span>
//                     <span>{event.assignedUser}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Additional Information */}
//             {(event.attendeesCount || event.updatingDate) && (
//               <>
//                 <Separator />
//                 <div>
//                   <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
//                     <Users className="w-5 h-5 text-primary" />
//                     <span>Additional Information</span>
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {event.attendeesCount && (
//                       <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
//                         <span className="font-medium">Attendees Count:</span>
//                         <Badge variant="secondary" className="bg-primary/10 text-primary">
//                           {event.attendeesCount.toLocaleString()}
//                         </Badge>
//                       </div>
//                     )}
//                     {event.updatingDate && (
//                       <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
//                         <span className="font-medium">Last Updated:</span>
//                         <span>{isValidUpdatingDate ? format(updatingDate, "PPP") : "N/A"}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </>
//             )}

//             <Separator />

//             {/* Action Buttons */}
//             <div className="flex items-center justify-center space-x-4 pt-4">
//               <Button
//                 onClick={() => router.push(`/update-event/${event.id}`)}
//                 className="bg-primary hover:bg-primary/90 flex items-center space-x-2"
//                 size="lg"
//               >
//                 <Clock className="w-4 h-4" />
//                 <span>Update Event</span>
//               </Button>
//               <Button variant="outline" onClick={() => router.push("/admin")} size="lg">
//                 Back to Admin Panel
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { requireAuth } from "@/lib/auth"
import { ArrowLeft, Calendar, MapPin, Clock, FileText, Tag, Users, Loader2 } from "lucide-react"
import { format } from "date-fns"

// Type for Event (modify according to your API response)
interface Event {
  id: number
  name: string
  description: string
  start_datetime: string
  end_datetime: string
  issue_date: string
  location: string
  event_type: string
  level: string
  attendees_count?: number
  updating_date?: string
  assignedUser?: string
  status?: "ongoing" | "completed"
}

export default function EventDetailsPage() {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  useEffect(() => {
    requireAuth("user")

    const fetchEvent = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/events/${eventId}`)
        if (!res.ok) throw new Error("Event not found")
        const data: Event = await res.json()
        setEvent(data)
      } catch (err) {
        console.error(err)
        setEvent(null)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive">Event Not Found</h1>
            <p className="text-muted-foreground mt-2">The requested event could not be found.</p>
            <Button onClick={() => router.push("/user-home")} className="mt-4">
              Back to User Panel
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const startDate = new Date(event.start_datetime)
  const endDate = new Date(event.end_datetime)
  const issueDate = new Date(event.issue_date)
  const updatingDate = event.updating_date ? new Date(event.updating_date) : null

  const isValidStartDate = !isNaN(startDate.getTime())
  const isValidEndDate = !isNaN(endDate.getTime())
  const isValidIssueDate = !isNaN(issueDate.getTime())
  const isValidUpdatingDate = updatingDate ? !isNaN(updatingDate.getTime()) : false

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => router.push("/user-home")} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Panel</span>
          </Button>
          <Badge variant="default" className="bg-primary">
            Event Viewed
          </Badge>
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
                      event.event_type === "Rally"
                        ? "bg-primary/10 text-primary"
                        : event.event_type === "Dharnā"
                          ? "bg-secondary/10 text-secondary"
                          : event.event_type === "Meeting"
                            ? "bg-accent/10 text-accent"
                            : "bg-muted"
                    }`}
                  >
                    {event.event_type}
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
                    <span>{isValidStartDate ? format(startDate, "PPP 'at' p") : "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">End Date:</span>
                    <span>{isValidEndDate ? format(endDate, "PPP 'at' p") : "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Issue Date:</span>
                    <span>{isValidIssueDate ? format(issueDate, "PPP") : "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Location & Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Location & Details</span>
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
                    <span>{event.assignedUser || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            {(event.attendees_count || event.updating_date) && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>Additional Information</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.attendees_count && (
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Attendees Count:</span>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {event.attendees_count.toLocaleString()}
                        </Badge>
                      </div>
                    )}
                    {event.updating_date && (
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Last Updated:</span>
                        <span>{isValidUpdatingDate ? format(updatingDate!, "PPP") : "N/A"}</span>
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
                onClick={() => router.push(`/update-event/${event.id}`)}
                className="bg-primary hover:bg-primary/90 flex items-center space-x-2"
                size="lg"
              >
                <Clock className="w-4 h-4" />
                <span>Update Event</span>
              </Button>
              <Button variant="outline" onClick={() => router.push("/user-home")} size="lg">
                Back to Panel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
