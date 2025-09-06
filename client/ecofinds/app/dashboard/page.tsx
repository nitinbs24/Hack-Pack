import { getServerSession } from "@/lib/server-auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ProductGrid } from "@/components/products/product-grid"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SearchAndFilter } from "@/components/products/search-and-filter"
import { AuthGuard } from "@/components/auth/auth-guard"

interface SearchParams {
  search?: string
  category?: string
  minPrice?: string
  maxPrice?: string
  condition?: string
  sortBy?: string
}

interface DashboardPageProps {
  searchParams: SearchParams
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/signin")
  }

  const where: any = { isActive: true }

  if (searchParams.search) {
    where.OR = [
      { title: { contains: searchParams.search, mode: "insensitive" } },
      { description: { contains: searchParams.search, mode: "insensitive" } },
    ]
  }

  if (searchParams.category) {
    where.categoryId = searchParams.category
  }

  if (searchParams.condition) {
    where.condition = searchParams.condition
  }

  if (searchParams.minPrice || searchParams.maxPrice) {
    where.price = {}
    if (searchParams.minPrice) {
      where.price.gte = Number.parseFloat(searchParams.minPrice)
    }
    if (searchParams.maxPrice) {
      where.price.lte = Number.parseFloat(searchParams.maxPrice)
    }
  }

  let orderBy: any = { createdAt: "desc" }
  if (searchParams.sortBy === "price-asc") {
    orderBy = { price: "asc" }
  } else if (searchParams.sortBy === "price-desc") {
    orderBy = { price: "desc" }
  } else if (searchParams.sortBy === "title") {
    orderBy = { title: "asc" }
  }

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: true,
        user: {
          select: { name: true, id: true },
        },
      },
      orderBy,
      take: 50,
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ])

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <DashboardHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-800 mb-2">Discover Eco-Friendly Products</h1>
            <p className="text-green-600">Browse sustainable products from our community</p>
          </div>

          <SearchAndFilter categories={categories} />

          <ProductGrid products={products} />
        </main>
      </div>
    </AuthGuard>
  )
}
