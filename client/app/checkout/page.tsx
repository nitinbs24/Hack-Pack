"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("cod") // default COD
  const router = useRouter()

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        const parsed: CartItem[] = JSON.parse(savedCart)
        setCartItems(parsed)
        setTotalAmount(
          parsed.reduce((sum, item) => sum + item.price * item.quantity, 0)
        )
      }
    }
  }, [])

  const handlePlaceOrder = () => {
    // Clear cart
    localStorage.removeItem("cart")
    router.push("/order-success")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <Card className="p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Checkout</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Your cart is empty.</p>
              <Link href="/">
                <Button>Back to Shop</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <Card key={item.id} className="p-4">
                    <CardContent className="flex justify-between items-center">
                      <div>
                        <h2 className="font-semibold">{item.title}</h2>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Option */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  Cash on Delivery (COD)
                </label>
              </div>

              {/* Place Order */}
              <Button className="w-full" onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
