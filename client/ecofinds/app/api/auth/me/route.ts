import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth-utils"

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] /api/auth/me: Starting auth check")
    const token = request.cookies.get("auth-token")?.value
    console.log("[v0] /api/auth/me: Token found:", !!token)

    if (!token) {
      console.log("[v0] /api/auth/me: No token, returning 401")
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = verifyToken(token)
    console.log("[v0] /api/auth/me: Token verification result:", !!user)

    if (!user) {
      console.log("[v0] /api/auth/me: Invalid token, returning 401")
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    console.log("[v0] /api/auth/me: Auth check successful for user:", user.email)
    return NextResponse.json({ user })
  } catch (error) {
    console.error("[v0] /api/auth/me: Auth check error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
