import type { Product, Category, User } from "@prisma/client"
import { ProductCard } from "./product-card"

type ProductWithDetails = Product & {
  category: Category
  user: Pick<User, "name" | "id">
}

interface ProductGridProps {
  products: ProductWithDetails[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-green-600 text-lg mb-2">No products found matching your criteria.</p>
        <p className="text-green-500 text-sm">Try adjusting your search or filters to see more results.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
