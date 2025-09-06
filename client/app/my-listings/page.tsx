import { getServerSession } from "@/lib/server-auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ProductGrid } from "@/components/products/product-grid"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth/auth-guard"

export default async function MyListingsPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/signin")
  }

  const products = await prisma.product.findMany({
    where: {
      userId: session.user.id,
      isActive: true,
    },
    include: {
      category: true,
      user: {
        select: { name: true, id: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <DashboardHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">My Listings</h1>
              <p className="text-green-600">Manage your eco-friendly product listings</p>
            </div>
            <Link href="/products/new">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add New Item
              </Button>
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-green-600 text-lg mb-4">You haven't listed any items yet.</p>
              <Link href="/products/new">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  List Your First Item
                </Button>
              </Link>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </main>
      </div>
    </AuthGuard>
  )
}
