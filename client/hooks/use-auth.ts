"use client"

import { useState, useEffect } from "react"

export interface User {
  id: string
  email: string
  name: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("[v0] useAuth: Starting auth check")
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      console.log("[v0] useAuth: Checking authentication status")
      const response = await fetch("/api/auth/me")
      console.log("[v0] useAuth: Auth check response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("[v0] useAuth: Auth check successful, user:", data.user)
        setUser(data.user)
      } else {
        console.log("[v0] useAuth: Auth check failed, no user session")
        setUser(null)
      }
    } catch (error) {
      console.error("[v0] useAuth: Auth check error:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    console.log("[v0] useAuth: Attempting sign in for:", email)
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      console.log("[v0] useAuth: Sign in response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("[v0] useAuth: Sign in successful, user:", data.user)
        setUser(data.user)
        return { success: true }
      } else {
        const data = await response.json()
        console.log("[v0] useAuth: Sign in failed:", data.error)
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error("[v0] useAuth: Sign in error:", error)
      return { success: false, error: "Network error" }
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    console.log("[v0] useAuth: Attempting sign up for:", email)
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      console.log("[v0] useAuth: Sign up response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("[v0] useAuth: Sign up successful, user:", data.user)
        setUser(data.user)
        return { success: true }
      } else {
        const data = await response.json()
        console.log("[v0] useAuth: Sign up failed:", data.error)
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error("[v0] useAuth: Sign up error:", error)
      return { success: false, error: "Network error" }
    }
  }

  const signOut = async () => {
    console.log("[v0] useAuth: Signing out")
    try {
      await fetch("/api/auth/signout", { method: "POST" })
      setUser(null)
      console.log("[v0] useAuth: Sign out successful")
    } catch (error) {
      console.error("[v0] useAuth: Sign out error:", error)
    }
  }

  return { user, loading, signIn, signUp, signOut, checkAuth }
}
