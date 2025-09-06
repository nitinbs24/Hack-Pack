import type { Product, Category, User } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type ProductWithDetails = Product & {
  category: Category
  user: Pick<User, "name" | "id">
}

interface ProductCardProps {
  product: ProductWithDetails
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer bg-white/80 border-green-100 hover:border-green-200 group">
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <Image
            src={product.image || `/placeholder.svg?height=300&width=300&query=${encodeURIComponent(product.title)}`}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute top-2 right-2">
            <Badge
              variant="secondary"
              className={`text-xs ${
                product.condition === "new"
                  ? "bg-green-100 text-green-700"
                  : product.condition === "used"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
              }`}
            >
              {product.condition}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-green-800 line-clamp-2 text-sm group-hover:text-green-900 transition-colors">
              {product.title}
            </h3>
          </div>

          <p className="text-green-600 text-sm mb-3 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-green-800">${product.price.toFixed(2)}</span>
            <Badge variant="outline" className="text-xs border-green-200 text-green-700">
              {product.category.name}
            </Badge>
          </div>

          {product.location && (
            <div className="flex items-center text-xs text-green-600 mb-2">
              <MapPin className="h-3 w-3 mr-1" />
              {product.location}
            </div>
          )}

          <div className="text-xs text-green-500">by {product.user.name}</div>
        </CardContent>
      </Card>
    </Link>
  )
}
