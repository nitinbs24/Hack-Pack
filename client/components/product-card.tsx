"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  image: string
  seller: string
  rating: number
  reviews: number
  isVerified: boolean
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)

    setTimeout(() => {
      setIsAddingToCart(false)
      setIsAddedToCart(true)

      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      cart.push(product)
      localStorage.setItem("cart", JSON.stringify(cart))

      window.dispatchEvent(new Event("cartUpdated"))

      setTimeout(() => {
        setIsAddedToCart(false)
      }, 2000)

      console.log(`Added ${product.title} to cart for ₹${product.price}`)
    }, 800)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    if (!isLiked) {
      wishlist.push(product)
      console.log(`Added ${product.title} to wishlist`)
    } else {
      const index = wishlist.findIndex((item: Product) => item.id === product.id)
      if (index > -1) {
        wishlist.splice(index, 1)
        console.log(`Removed ${product.title} from wishlist`)
      }
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }

  return (
    <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border-border/30 hover:border-primary/30 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={300}
            height={300}
            className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <Button
            size="sm"
            variant="secondary"
            onClick={handleLike}
            className="absolute top-3 right-3 h-9 w-9 p-0 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm rounded-full border-0"
          >
            <span
              className={`text-lg transition-colors ${isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"}`}
            >
              {isLiked ? "❤️" : "🤍"}
            </span>
          </Button>
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground shadow-lg border-0 rounded-full px-3 py-1">
            {product.category}
          </Badge>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <h3 className="font-bold text-xl leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">by</span>
              <span className="text-sm font-semibold text-foreground">{product.seller}</span>
              {product.isVerified && (
                <div className="flex items-center">
                  <span className="text-primary text-sm">✓</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm font-semibold text-yellow-700">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-3xl font-bold text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text">
              ₹{product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={isAddingToCart || isAddedToCart}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-6 text-base font-semibold disabled:opacity-70"
        >
          {isAddingToCart ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Adding...
            </>
          ) : isAddedToCart ? (
            <>
              <span className="mr-2">✓</span>
              Added to Cart!
            </>
          ) : (
            <>
              <span className="mr-2">🛒</span>
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
