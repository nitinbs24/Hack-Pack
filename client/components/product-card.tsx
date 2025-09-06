import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, ShoppingCart, Verified } from "lucide-react"
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
            className="absolute top-3 right-3 h-9 w-9 p-0 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm rounded-full border-0"
          >
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
          </Button>
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg border-0 rounded-full px-3 py-1">
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
                  <Verified className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
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
        <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-6 text-base font-semibold">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
