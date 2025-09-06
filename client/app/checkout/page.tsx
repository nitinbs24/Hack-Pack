"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = () => {
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      alert("Please fill in all fields.")
      return
    }

    // Save order details (optional)
    if (typeof window !== "undefined") {
      localStorage.setItem("lastOrder", JSON.stringify(form))
      localStorage.removeItem("cart") // Clear cart
    }

    router.push("/order-success")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <Card className="p-6 w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Checkout</h1>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" value={form.address} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" value={form.city} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="pincode">Pincode</Label>
            <Input id="pincode" name="pincode" value={form.pincode} onChange={handleChange} required />
          </div>

          <Button className="w-full mt-4" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
