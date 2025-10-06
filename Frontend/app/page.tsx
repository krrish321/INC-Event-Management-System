"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function HomePage() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [eventFilter, setEventFilter] = useState<"ongoing" | "previous">("ongoing")
  const router = useRouter()

  const handleLogin = () => {
    if (code === "USER123") {
      localStorage.setItem("userRole", "user")
      localStorage.setItem("eventFilter", eventFilter)
      router.push("/user-home")
    } else if (code === "ADMIN123") {
      localStorage.setItem("userRole", "admin")
      router.push("/admin-panel")
    } else {
      setError("Invalid code. Please try USER123 or ADMIN123")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-sm relative z-10 hover:shadow-3xl transition-all duration-500">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse">
            <span className="text-3xl font-bold text-primary-foreground">INC</span>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Event Management System
            </CardTitle>
            <p className="text-sm text-muted-foreground font-medium">Indian National Congress</p>
          </div>
          <CardDescription className="text-base">Enter your access code and select event type</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-semibold">Event Type</Label>
            <RadioGroup value={eventFilter} onValueChange={(value: "ongoing" | "previous") => setEventFilter(value)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200">
                  <RadioGroupItem value="ongoing" id="ongoing" />
                  <Label htmlFor="ongoing" className="font-medium cursor-pointer">
                    Ongoing Events
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/50 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-200">
                  <RadioGroupItem value="previous" id="previous" />
                  <Label htmlFor="previous" className="font-medium cursor-pointer">
                    Previous Events
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label htmlFor="code" className="text-base font-semibold">
              Access Code
            </Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter access code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={8}
              className="text-center text-lg tracking-widest h-12 border-2 focus:border-primary/50 hover:border-primary/30 transition-all duration-200"
            />
          </div>

          {error && (
            <Alert variant="destructive" className="border-destructive/50 bg-destructive/5">
              <AlertDescription className="font-medium">{error}</AlertDescription>
            </Alert>
          )}
<Button
  onClick={handleLogin}
  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-12 text-lg font-semibold"
  size="lg"
>
  Login to Dashboard
</Button>

          <div className="text-sm text-muted-foreground text-center space-y-2 p-4 bg-muted/30 rounded-lg border border-border/30">
            <p className="font-semibold">Demo Access Codes:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-primary/10 rounded border border-primary/20">
                <strong className="text-primary">USER123</strong>
                <br />
                User Access
              </div>
              <div className="p-2 bg-accent/10 rounded border border-accent/20">
                <strong className="text-accent">ADMIN123</strong>
                <br />
                Admin Access
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
