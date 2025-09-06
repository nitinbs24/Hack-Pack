"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface WishlistItem {
  id: string
  title: string
  price: number
  category: string
  image: string
  inStock: boolean
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      title: "Eco-Friendly Yoga Mat",
      price: 2499,
      category: "Sports & Outdoors",
      image: "/eco-friendly-yoga-mat-recycled.jpg",
      inStock: true,
    },
    {
      id: "2",
      title: "Bamboo Kitchen Utensils Set",
      price: 1799,
      category: "Home & Garden",
      image: "/bamboo-kitchen-utensils-set-eco-friendly.jpg",
      inStock: true,
    },
    {
      id: "3",
      title: "Organic Hemp Backpack",
      price: 3999,
      category: "Fashion",
      image: "/organic-hemp-backpack-sustainable.jpg",
      inStock: false,
    },
    {
      id: "4",
      title: "Solar Garden Lights",
      price: 2299,
      category: "Home & Garden",
      image: "/solar-garden-lights-outdoor-eco-friendly.jpg",
      inStock: true,
    },
  ])

  const removeFromWishlist = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const addToCart = (item: WishlistItem) => {
    console.log("Adding to cart:", item)
    // Here you would typically add the item to cart state/context
    alert(`${item.title} added to cart!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="h-5 w-5" />
            Back to Shop
          </Link>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500 fill-current" />
            <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">Save your favorite eco-friendly products here!</p>
              <Link href="/">
                <Button>Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg bg-gray-100">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">
                    {item.category}
                  </Badge>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-2xl font-bold text-primary mb-4">₹{item.price.toLocaleString()}</p>

                  <div className="space-y-2">
                    <Button onClick={() => addToCart(item)} disabled={!item.inStock} className="w-full">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {item.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => removeFromWishlist(item.id)}
                      className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove from Wishlist
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
