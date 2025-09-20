export type UserRole = "user" | "admin" | null

export function getUserRole(): UserRole {
  if (typeof window === "undefined") return null
  return localStorage.getItem("userRole") as UserRole
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userRole")
    window.location.href = "/"
  }
}

export function requireAuth(role?: UserRole) {
  const userRole = getUserRole()
  if (!userRole) {
    window.location.href = "/"
    return false
  }
  if (role && userRole !== role) {
    window.location.href = "/"
    return false
  }
  return true
}
