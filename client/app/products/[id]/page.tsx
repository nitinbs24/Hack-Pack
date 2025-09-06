import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ProductDetail } from "@/components/products/product-detail"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

interface ProductPageProps {
  params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      user: {
        select: { name: true, id: true },
      },
    },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <DashboardHeader />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetail product={product} />
      </main>
    </div>
  )
}
