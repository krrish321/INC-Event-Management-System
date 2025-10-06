"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { logout, getUserRole } from "@/lib/auth"
import { LogOut, User, Shield, Menu, Home, Calendar, BarChart3, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const userRole = getUserRole()
  const router = useRouter()

  const navigationItems =
    userRole === "admin"
      ? [
          { icon: Home, label: "Dashboard", href: "/admin-panel" },
          { icon: Plus, label: "Add Event", href: "/admin/add-event" },
          { icon: BarChart3, label: "Reports", href: "/admin/reports" },
        ]
      : [
          { icon: Home, label: "Dashboard", href: "/user-home" },
        ]

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  return (
    <nav className="bg-gradient-to-r from-primary/5 via-background to-secondary/5 border-b border-border/50 shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Title */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-lg font-bold text-primary-foreground">INC</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Event Management System
              </h1>
              <p className="text-sm text-muted-foreground">Indian National Congress</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item, index) => (
              <Button
                key={`${item.href}-${index}`}
                variant="ghost"
                onClick={() => handleNavigation(item.href)}
                className="flex items-center space-x-2 hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-105"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          {/* Right Side - Role + Logout + Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* User Role */}
            <div className="hidden sm:flex items-center space-x-2 text-sm bg-card/50 px-3 py-2 rounded-full border border-border/50">
              {userRole === "admin" ? (
                <Shield className="w-4 h-4 text-accent" />
              ) : (
                <User className="w-4 h-4 text-primary" />
              )}
              <span className="font-medium capitalize">{userRole} Access</span>
            </div>

            {/* Logout Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="hidden sm:flex items-center space-x-2 bg-transparent hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
             <SheetTrigger asChild>
  <Button variant="ghost" size="sm" className="md:hidden hover:bg-primary/10 transition-colors">
    <Menu className="w-5 h-5" />
  </Button>
</SheetTrigger>

              <SheetContent side="right" className="w-80 bg-gradient-to-b from-background to-primary/5">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Header */}
                  <div className="flex items-center space-x-4 pb-4 border-b border-border/50">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-lg font-bold text-primary-foreground">INC</span>
                    </div>
                    <div>
                      <h2 className="font-bold text-primary">Event Management</h2>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        {userRole === "admin" ? (
                          <Shield className="w-4 h-4 text-accent" />
                        ) : (
                          <User className="w-4 h-4 text-primary" />
                        )}
                        <span className="capitalize">{userRole} Access</span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Nav Items */}
                  <div className="space-y-2">
                    {navigationItems.map((item, index) => (
                      <Button
                        key={`${item.href}-${index}`}
                        variant="ghost"
                        onClick={() => handleNavigation(item.href)}
                        className="w-full justify-start space-x-3 h-12 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-base">{item.label}</span>
                      </Button>
                    ))}
                  </div>

                  {/* Mobile Logout */}
                  <div className="pt-4 border-t border-border/50">
                    <Button
                      variant="outline"
                      onClick={logout}
                      className="w-full justify-start space-x-3 h-12 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all duration-200 bg-transparent"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="text-base">Logout</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
