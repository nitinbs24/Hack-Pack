import { getServerSession } from "@/lib/server-auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ProductForm } from "@/components/products/product-form"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AuthGuard } from "@/components/auth/auth-guard"

export default async function NewProductPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/signin")
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  })

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <DashboardHeader />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-800 mb-2">List Your Item</h1>
            <p className="text-green-600">Share your eco-friendly products with the community</p>
          </div>
          <ProductForm categories={categories} />
        </main>
      </div>
    </AuthGuard>
  )
}
