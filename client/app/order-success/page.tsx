"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Leaf } from "lucide-react"

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="mb-6"
      >
        <CheckCircle className="w-24 h-24 text-green-600 mx-auto" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-gray-900 mb-3"
      >
        Order Successfully Placed!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-gray-700 max-w-lg mb-6"
      >
        Thank you for choosing eco-friendly products 🌱 Every order you place
        helps make our planet greener and cleaner.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex gap-4"
      >
        <Link href="/">
          <Button>Back to Shop</Button>
        </Link>
        <Link href="/cart">
          <Button variant="outline" className="bg-white">
            View Orders
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10 flex items-center gap-2 text-green-700"
      >
        <Leaf className="w-6 h-6" />
        <span className="font-medium">
          Together, we’re reducing carbon footprints!
        </span>
      </motion.div>
    </div>
  )
}
