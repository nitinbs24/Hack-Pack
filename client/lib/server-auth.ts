import { cookies } from "next/headers"
import { verifyToken, type User } from "./auth-utils"

export async function getServerSession(): Promise<{ user: User } | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return null
    }

    const user = verifyToken(token)
    if (!user) {
      return null
    }

    return { user }
  } catch (error) {
    console.error("Server auth error:", error)
    return null
  }
}
