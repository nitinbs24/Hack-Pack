import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const JWT_SECRET = process.env.JWT_SECRET || "development-secret-key-for-ecofinds-app"

export interface User {
  id: string
  email: string
  name: string
}

// In-memory user store (replace with database later)
const users = new Map<string, { id: string; email: string; password: string; name: string }>()

// Add a test user
users.set("test@example.com", {
  id: "1",
  email: "test@example.com",
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/hL/.LVtOy", // "password"
  name: "Test User",
})

export async function createUser(email: string, password: string, name: string): Promise<User> {
  try {
    console.log("[v0] auth-utils: Starting createUser for email:", email)
    console.log("[v0] auth-utils: JWT_SECRET exists:", !!JWT_SECRET)

    const hashedPassword = await bcrypt.hash(password, 12)
    console.log("[v0] auth-utils: Password hashed successfully")

    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
    }
    users.set(email, user)
    console.log("[v0] auth-utils: User stored in memory")

    return { id: user.id, email: user.email, name: user.name }
  } catch (error) {
    console.error("[v0] auth-utils: Error in createUser:", error)
    throw error
  }
}

export async function validateUser(email: string, password: string): Promise<User | null> {
  const user = users.get(email)
  if (!user) return null

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return null

  return { id: user.id, email: user.email, name: user.name }
}

export function userExists(email: string): boolean {
  return users.has(email)
}

export function generateToken(user: User): string {
  try {
    console.log("[v0] auth-utils: Generating token for user:", user.email)
    console.log("[v0] auth-utils: JWT_SECRET length:", JWT_SECRET.length)

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "7d" })
    console.log("[v0] auth-utils: Token generated successfully")

    return token
  } catch (error) {
    console.error("[v0] auth-utils: Error generating token:", error)
    throw error
  }
}

export function verifyToken(token: string): User | null {
  try {
    console.log("[v0] auth-utils: Verifying token")
    const decoded = jwt.verify(token, JWT_SECRET) as User
    console.log("[v0] auth-utils: Token verified successfully for user:", decoded.email)
    return decoded
  } catch (error) {
    console.error("[v0] auth-utils: Token verification failed:", error)
    return null
  }
}
