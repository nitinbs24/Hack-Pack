import type { Product, Category, User } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, UserIcon, Calendar } from "lucide-react"
import Image from "next/image"

type ProductWithDetails = Product & {
  category: Category
  user: Pick<User, "name" | "id">
}

interface ProductDetailProps {
  product: ProductWithDetails
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Image */}
      <div className="aspect-square relative overflow-hidden rounded-lg bg-white">
        <Image
          src={product.image || `/placeholder.svg?height=600&width=600&query=${encodeURIComponent(product.title)}`}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-green-800 text-balance">{product.title}</h1>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {product.condition}
            </Badge>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold text-green-800">${product.price.toFixed(2)}</span>
            <Badge variant="outline">{product.category.name}</Badge>
          </div>
        </div>

        <Card className="bg-white/80 border-green-100">
          <CardContent className="p-6">
            <h3 className="font-semibold text-green-800 mb-3">Description</h3>
            <p className="text-green-600 leading-relaxed">{product.description}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 border-green-100">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center text-green-600">
              <UserIcon className="h-4 w-4 mr-2" />
              <span>Sold by {product.user.name}</span>
            </div>

            {product.location && (
              <div className="flex items-center text-green-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{product.location}</span>
              </div>
            )}

            <div className="flex items-center text-green-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Listed {new Date(product.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">Contact Seller</Button>
      </div>
    </div>
  )
}
