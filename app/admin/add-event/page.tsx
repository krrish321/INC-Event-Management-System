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
    assignedUser: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
  e.preventDefault(); 

  if (!validateForm()) return

  try {
    const payload = {
      eventName: formData.eventName,
      description: formData.description,
      startDate: formData.startDate,
      startTime: formData.startTime,
      endDate: formData.endDate,
      endTime: formData.endTime,
      issueDate: formData.issueDate,
      location: formData.location,
      level: formData.level,
      eventType: formData.eventType,
      assignedUser: formData.assignedUser,
    }

    // const res = await fetch("http://localhost:5000/api/events", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // })
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })


    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create event: ${errorText}`);
    }

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
      assignedUser: "",
    })

    // ✅ Admin panel list pe redirect with refresh flag
    setTimeout(() => router.push("/admin/event-list?refresh=1"), 2000);
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
            <Label>Event Name</Label>
            <Input value={formData.eventName} onChange={(e) => handleInputChange("eventName", e.target.value)} />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} />
          </div>

          <div className="flex gap-4">
            <div>
              <Label>Start Date</Label>
              <Input type="date" value={formData.startDate} onChange={(e) => handleInputChange("startDate", e.target.value)} />
          </div>
            <div>
              <Label>Start Time</Label>
              <Input type="time" value={formData.startTime} onChange={(e) => handleInputChange("startTime", e.target.value)} />
          </div>
          </div>

          <div className="flex gap-4">
            <div>
              <Label>End Date</Label>
              <Input type="date" value={formData.endDate} onChange={(e) => handleInputChange("endDate", e.target.value)} />
          </div>
            <div>
              <Label>End Time</Label>
              <Input type="time" value={formData.endTime} onChange={(e) => handleInputChange("endTime", e.target.value)} />
            </div>
          </div>

          <div>
            <Label>Location</Label>
            <Input value={formData.location} onChange={(e) => handleInputChange("location", e.target.value)} />
          </div>

          <div>
            <Label>Level</Label>
            <Select value={formData.level} onValueChange={(val) => handleInputChange("level", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {eventLevels.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Event Type</Label>
            <Select value={formData.eventType} onValueChange={(val) => handleInputChange("eventType", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Assigned User ID</Label>
            <Input type="number" value={formData.assignedUser} onChange={(e) => handleInputChange("assignedUser", e.target.value)} />
          </div>

          <Button type="submit" className="mt-4">Add Event</Button>
        </div>
      </form>
      

      {success && <p className="text-green-600 mt-4">Event created successfully!</p>}
    </div>
  )
}