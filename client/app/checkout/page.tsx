"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CheckoutPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "cod",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = () => {
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      alert("Please fill in all fields before placing order.")
      return
    }

    // Save order details (optional - localStorage or API call)
    localStorage.setItem("lastOrder", JSON.stringify(form))

    // Redirect to success page
    router.push("/order-success")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Checkout</h1>
        <CardContent className="space-y-6">
          {/* Contact & Address */}
          <div className="space-y-4">
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={form.city} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" name="pincode" value={form.pincode} onChange={handleChange} required />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <Label className="mb-2 block">Payment Method</Label>
            <RadioGroup
              defaultValue="cod"
              onValueChange={(val) => setForm({ ...form, payment: val })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod">Cash on Delivery (COD)</Label>
              </div>
              <div className="flex items-center space-x-2 opacity-50 cursor-not-allowed">
                <RadioGroupItem value="online" id="online" disabled />
                <Label htmlFor="online">Online Payment (Coming Soon)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Place Order */}
          <Button className="w-full" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
