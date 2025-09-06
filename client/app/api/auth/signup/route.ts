import { type NextRequest, NextResponse } from "next/server"
import { createUser, userExists, generateToken } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] /api/auth/signup: Starting signup process")
    const { name, email, password } = await request.json()
    console.log("[v0] /api/auth/signup: Received data for email:", email)

    if (!name || !email || !password) {
      console.log("[v0] /api/auth/signup: Missing required fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (!email.includes("@")) {
      console.log("[v0] /api/auth/signup: Invalid email format")
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (password.length < 6) {
      console.log("[v0] /api/auth/signup: Password too short")
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    if (userExists(email)) {
      console.log("[v0] /api/auth/signup: User already exists")
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    console.log("[v0] /api/auth/signup: Creating new user")
    const user = await createUser(email, password, name)
    const token = generateToken(user)
    console.log("[v0] /api/auth/signup: User created successfully, generating response")

    const response = NextResponse.json({ user, message: "Account created successfully" })
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    console.log("[v0] /api/auth/signup: Signup completed successfully")
    return response
  } catch (error) {
    console.error("[v0] /api/auth/signup: Sign up error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
