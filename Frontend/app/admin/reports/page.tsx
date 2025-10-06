"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { requireAuth } from "@/lib/auth"
import { dummyUsers, dummyEvents } from "@/lib/dummy-data"
import { ArrowLeft, BarChart3, Eye, CheckCircle, XCircle, Printer, Check, Users, Calendar } from "lucide-react"

export default function ReportsPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    requireAuth("admin")
  }, [])

  const totalUsers = dummyUsers.length
  const viewedCount = dummyUsers.filter((user) => user.viewed).length
  const updatedCount = dummyUsers.filter((user) => user.updated).length

  const handleShowDetails = (user: any) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handlePrintReport = () => {
    window.print()
  }

  const handleAcceptData = (userId: string) => {
    alert(`Data accepted for user ${userId}`)
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <h1 className="text-3xl font-bold text-primary mb-2">System Reports</h1>
          <p className="text-muted-foreground">Comprehensive overview of user engagement and event tracking</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{dummyEvents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events Viewed</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{viewedCount}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((viewedCount / totalUsers) * 100)}% completion
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events Updated</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{updatedCount}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((updatedCount / totalUsers) * 100)}% completion
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Summary Text */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Summary Report</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Viewing Statistics</h3>
                <p className="text-sm text-muted-foreground">
                  Out of <strong>{totalUsers} users</strong>,{" "}
                  <strong className="text-primary">{viewedCount} have viewed</strong> their assigned events. This
                  represents a <strong>{Math.round((viewedCount / totalUsers) * 100)}% completion rate</strong> for
                  event viewing.
                </p>
              </div>
              <div className="p-4 bg-secondary/5 rounded-lg">
                <h3 className="font-semibold text-secondary mb-2">Update Statistics</h3>
                <p className="text-sm text-muted-foreground">
                  Out of <strong>{totalUsers} users</strong>,{" "}
                  <strong className="text-secondary">{updatedCount} have updated</strong> their assigned events. This
                  represents a <strong>{Math.round((updatedCount / totalUsers) * 100)}% completion rate</strong> for
                  event updates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Details Table */}
        <Card>
          <CardHeader>
            <CardTitle>User Activity Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">S. No.</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead className="text-center">Viewed</TableHead>
                    <TableHead className="text-center">Updated</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyUsers.map((user, index) => (
                    <TableRow key={user.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <div className="font-medium">{user.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{user.designation}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          {user.viewed ? (
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="w-4 h-4 text-primary" />
                              <Badge variant="default" className="bg-primary text-xs">
                                Yes
                              </Badge>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1">
                              <XCircle className="w-4 h-4 text-destructive" />
                              <Badge variant="destructive" className="text-xs">
                                No
                              </Badge>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          {user.updated ? (
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="w-4 h-4 text-primary" />
                              <Badge variant="default" className="bg-primary text-xs">
                                Yes
                              </Badge>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1">
                              <XCircle className="w-4 h-4 text-destructive" />
                              <Badge variant="destructive" className="text-xs">
                                No
                              </Badge>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={user.viewed && user.updated ? "default" : user.viewed ? "secondary" : "destructive"}
                          className={user.viewed && user.updated ? "bg-primary" : ""}
                        >
                          {user.viewed && user.updated ? "Complete" : user.viewed ? "Partial" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog open={isModalOpen && selectedUser?.id === user.id} onOpenChange={setIsModalOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShowDetails(user)}
                              className="flex items-center space-x-1"
                            >
                              <Eye className="w-4 h-4" />
                              <span>Details</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center space-x-2">
                                <Users className="w-5 h-5 text-primary" />
                                <span>User Details - {user.name}</span>
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              {/* User Information */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-muted/50 rounded-lg">
                                  <h4 className="font-semibold mb-2">User Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <strong>Name:</strong> {user.name}
                                    </div>
                                    <div>
                                      <strong>Designation:</strong> {user.designation}
                                    </div>
                                    <div>
                                      <strong>User ID:</strong> {user.id}
                                    </div>
                                  </div>
                                </div>
                                <div className="p-4 bg-muted/50 rounded-lg">
                                  <h4 className="font-semibold mb-2">Activity Status</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2">
                                      <strong>Viewed:</strong>
                                      {user.viewed ? (
                                        <Badge variant="default" className="bg-primary text-xs">
                                          Yes
                                        </Badge>
                                      ) : (
                                        <Badge variant="destructive" className="text-xs">
                                          No
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <strong>Updated:</strong>
                                      {user.updated ? (
                                        <Badge variant="default" className="bg-primary text-xs">
                                          Yes
                                        </Badge>
                                      ) : (
                                        <Badge variant="destructive" className="text-xs">
                                          No
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Event Data */}
                              <div className="p-4 bg-muted/50 rounded-lg">
                                <h4 className="font-semibold mb-2">Event Assignment Details</h4>
                                <div className="text-sm text-muted-foreground">
                                  <p>
                                    <strong>Assigned Event:</strong>{" "}
                                    {dummyEvents.find((e) => e.assignedUser === user.name)?.name || "No event assigned"}
                                  </p>
                                  <p>
                                    <strong>Last Activity:</strong>{" "}
                                    {user.updated ? "Event updated with media files" : "No updates submitted"}
                                  </p>
                                  <p>
                                    <strong>Submission Date:</strong> {user.updated ? "2024-01-15" : "Not submitted"}
                                  </p>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center justify-end space-x-4 pt-4">
                                <Button
                                  onClick={handlePrintReport}
                                  variant="outline"
                                  className="flex items-center space-x-2 bg-transparent"
                                >
                                  <Printer className="w-4 h-4" />
                                  <span>Print Report</span>
                                </Button>
                                <Button
                                  onClick={() => handleAcceptData(user.id)}
                                  className="bg-primary hover:bg-primary/90 flex items-center space-x-2"
                                >
                                  <Check className="w-4 h-4" />
                                  <span>Accept Data</span>
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
