"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <Card className="p-8 max-w-md w-full text-center shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="mb-6 text-gray-600">
          Your eco-friendly order is almost ready 🌱
        </p>

        <Button
          className="w-full"
          onClick={() => {
            // Clear cart
            if (typeof window !== "undefined") localStorage.removeItem("cart")
            router.push("/order-success")
          }}
        >
          Confirm Order
        </Button>
      </Card>
    </div>
  )
}
