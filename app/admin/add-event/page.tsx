"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"

const eventTypes = ["Dhrana", "Meeting", "Bandh", "Rally", "Sabha", "Gayaapan", "Seminar"] as const;
const eventLevels = ["Jila", "Block", "College"] as const;

export default function AddEventPage() {
  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    issueDate: format(new Date(), "yyyy-MM-dd"),
    location: "",
    level: "" as "Jila" | "Block" | "College" | "",
    eventType: "" as (typeof eventTypes)[number] | "",
    assignedUser: "" as number | "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "assignedUser" ? Number(value) : value
    }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.eventName.trim()) newErrors.eventName = "Event name is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.startDate) newErrors.startDate = "Start date is required"
    if (!formData.startTime) newErrors.startTime = "Start time is required"
    if (!formData.endDate) newErrors.endDate = "End date is required"
    if (!formData.endTime) newErrors.endTime = "End time is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.level) newErrors.level = "Level is required"
    if (!formData.eventType) newErrors.eventType = "Event type is required"
    if (!formData.assignedUser) newErrors.assignedUser = "Assigned user is required"

    if (formData.startDate && formData.endDate) {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`)
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`)
      if (endDateTime <= startDateTime) newErrors.endDate = "End date/time must be after start date/time"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submit fired", formData)

    if (!validateForm()) return

    try {
      const payload = { ...formData }

      // ❌ REMOVED: const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      // ✅ CORRECTED: Use the relative path for the internal Next.js API Route.
      const res = await fetch(`/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Failed to create event: ${res.status} ${errorText}`)
      }

      const data = await res.json()
      console.log("Event added successfully:", data)

      setSuccess(true)

      // Reset form
      setFormData({
        eventName: "",
        description: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        issueDate: format(new Date(), "yyyy-MM-dd"),
        location: "",
        level: "" as "Jila" | "Block" | "College" | "",
        eventType: "" as (typeof eventTypes)[number] | "",
        assignedUser: "" as number | "",
      })

      // Redirect to event list after 1s
      setTimeout(() => router.push("/admin/event-list?refresh=1"), 1000)

    } catch (err: any) {
      console.error(err)
      alert(err.message || "Error creating event")
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="eventName">Event Name</Label>
            <Input id="eventName" value={formData.eventName} onChange={(e) => handleInputChange("eventName", e.target.value)} />
            {errors.eventName && <p className="text-red-500 text-sm">{errors.eventName}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" value={formData.startDate} onChange={(e) => handleInputChange("startDate", e.target.value)} />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" type="time" value={formData.startTime} onChange={(e) => handleInputChange("startTime", e.target.value)} />
              {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime}</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" value={formData.endDate} onChange={(e) => handleInputChange("endDate", e.target.value)} />
              {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="endTime">End Time</Label>
              <Input id="endTime" type="time" value={formData.endTime} onChange={(e) => handleInputChange("endTime", e.target.value)} />
              {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={formData.location} onChange={(e) => handleInputChange("location", e.target.value)} />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>

          <div>
            <Label htmlFor="level">Level</Label>
            <Select value={formData.level} onValueChange={(val) => handleInputChange("level", val)}>
              <SelectTrigger id="level">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {eventLevels.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}
          </div>

          <div>
            <Label htmlFor="eventType">Event Type</Label>
            <Select value={formData.eventType} onValueChange={(val) => handleInputChange("eventType", val)}>
              <SelectTrigger id="eventType">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.eventType && <p className="text-red-500 text-sm">{errors.eventType}</p>}
          </div>

          <div>
            <Label htmlFor="assignedUser">Assigned User ID</Label>
            <Input id="assignedUser" type="number" value={formData.assignedUser} onChange={(e) => handleInputChange("assignedUser", e.target.value)} />
            {errors.assignedUser && <p className="text-red-500 text-sm">{errors.assignedUser}</p>}
          </div>

          <Button type="submit" className="mt-4">Add Event</Button>
        </div>
      </form>

      {success && <p className="text-green-600 mt-4">Event created successfully!</p>}
    </div>
  )
}