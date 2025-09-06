"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <Card className="p-8 max-w-md w-full text-center shadow-xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        </motion.div>
        <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="mb-6 text-gray-600">
          Thank you for shopping with us. Your eco-friendly products are on the way 🌱
        </p>

        <Link href="/">
          <Button className="w-full">Back to Home</Button>
        </Link>
      </Card>
    </div>
  )
}
