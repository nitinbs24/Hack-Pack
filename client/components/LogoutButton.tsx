"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("ecofinds_user") // remove logged-in user
    localStorage.removeItem("cart")          // optional: clear cart
    window.dispatchEvent(new CustomEvent("userLoggedOut")) // notify other components
    router.push("/login")                     // redirect to login
  }

  return (
    <Button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white"
    >
      Logout
    </Button>
  )
}
