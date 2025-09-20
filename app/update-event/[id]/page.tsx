"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { requireAuth } from "@/lib/auth"
import { dummyEvents, type Event } from "@/lib/dummy-data"
import { ArrowLeft, Save, X, ImageIcon, Video, Camera } from "lucide-react"
import { format } from "date-fns"

export default function UpdateEventPage() {
  const [event, setEvent] = useState<Event | null>(null)
  const [formData, setFormData] = useState({
    location: "",
    eventDate: "",
    attendeesCount: "",
    updatingDate: format(new Date(), "yyyy-MM-dd"),
  })
  const [photos, setPhotos] = useState<File[]>([])
  const [video, setVideo] = useState<File | null>(null)
  const [mediaCoverage, setMediaCoverage] = useState<File[]>([])
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  useEffect(() => {
    requireAuth("user")

    const foundEvent = dummyEvents.find((e) => e.id === eventId)
    if (foundEvent) {
      setEvent(foundEvent)
      setFormData({
        location: foundEvent.location,
        eventDate: format(new Date(foundEvent.startDate), "yyyy-MM-dd"),
        attendeesCount: foundEvent.attendeesCount?.toString() || "",
        updatingDate: format(new Date(), "yyyy-MM-dd"),
      })
    }
  }, [eventId])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (photos.length + files.length > 10) {
      alert("Maximum 10 photos allowed")
      return
    }
    setPhotos((prev) => [...prev, ...files])
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size < 10 * 1024 * 1024) {
        alert("Video must be at least 10MB")
        return
      }
      setVideo(file)
    }
  }

  const handleMediaCoverageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (mediaCoverage.length + files.length > 5) {
      alert("Maximum 5 media coverage photos allowed")
      return
    }
    setMediaCoverage((prev) => [...prev, ...files])
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const removeMediaCoverage = (index: number) => {
    setMediaCoverage((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    setSuccess(true)
    setTimeout(() => {
      router.push("/user-home")
    }, 2000)
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
              Back to Dashboard
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
          <Button variant="outline" onClick={() => router.push("/user-home")} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </div>

        {success && (
          <Alert className="mb-6 border-primary bg-primary/5">
            <Save className="h-4 w-4" />
            <AlertDescription className="text-primary font-medium">
              Event updated successfully! Redirecting to dashboard...
            </AlertDescription>
          </Alert>
        )}

        {/* Update Form */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="text-2xl font-bold text-primary">Update Event</CardTitle>
            <p className="text-muted-foreground">{event.name}</p>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Enter event location"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleInputChange("eventDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attendeesCount">Attendees Count</Label>
                <Input
                  id="attendeesCount"
                  type="number"
                  value={formData.attendeesCount}
                  onChange={(e) => handleInputChange("attendeesCount", e.target.value)}
                  placeholder="Enter number of attendees"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="updatingDate">Updating Date</Label>
                <Input
                  id="updatingDate"
                  type="date"
                  value={formData.updatingDate}
                  onChange={(e) => handleInputChange("updatingDate", e.target.value)}
                  disabled
                />
              </div>
            </div>

            <Separator />

            {/* Media Upload Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-primary">Media Upload Section</h3>

              {/* Photos Upload */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Event Photos (Max 10)</Label>
                  <span className="text-sm text-muted-foreground">{photos.length}/10</span>
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-6">
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <Label htmlFor="photos" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-primary hover:text-primary/80">
                          Click to upload photos
                        </span>
                        <Input
                          id="photos"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </Label>
                    </div>
                  </div>
                </div>
                {photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removePhoto(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                        <p className="text-xs text-center mt-1 truncate">{photo.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Event Video (Min 10MB)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6">
                  <div className="text-center">
                    <Video className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <Label htmlFor="video" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-primary hover:text-primary/80">
                          Click to upload video
                        </span>
                        <Input
                          id="video"
                          type="file"
                          accept="video/*"
                          onChange={handleVideoUpload}
                          className="hidden"
                        />
                      </Label>
                    </div>
                  </div>
                </div>
                {video && (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4" />
                      <span className="text-sm">{video.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setVideo(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Media Coverage */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Media Coverage (Max 5)</Label>
                  <span className="text-sm text-muted-foreground">{mediaCoverage.length}/5</span>
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-6">
                  <div className="text-center">
                    <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <Label htmlFor="mediaCoverage" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-primary hover:text-primary/80">
                          Click to upload media coverage photos
                        </span>
                        <Input
                          id="mediaCoverage"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleMediaCoverageUpload}
                          className="hidden"
                        />
                      </Label>
                    </div>
                  </div>
                </div>
                {mediaCoverage.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {mediaCoverage.map((photo, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          <Camera className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removeMediaCoverage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                        <p className="text-xs text-center mt-1 truncate">{photo.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-4 pt-4">
              <Button
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90 flex items-center space-x-2"
                size="lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </Button>
              <Button variant="outline" onClick={() => router.push("/user-home")} size="lg">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
