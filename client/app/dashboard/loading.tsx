import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProductGridSkeleton } from "@/components/ui/loading-skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-8 bg-green-100 rounded animate-pulse w-80 mb-2" />
          <div className="h-4 bg-green-50 rounded animate-pulse w-96" />
        </div>

        {/* Search and Filter Skeleton */}
        <Card className="mb-6 bg-white/80 border-green-100">
          <CardContent className="p-6">
            <div className="h-10 bg-green-50 rounded animate-pulse mb-4" />
            <div className="h-8 bg-green-50 rounded animate-pulse w-32" />
          </CardContent>
        </Card>

        <ProductGridSkeleton />
      </main>
    </div>
  )
}
