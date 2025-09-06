import { Card, CardContent } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card className="bg-white/80 border-green-100">
      <div className="aspect-square bg-green-100 animate-pulse rounded-t-lg" />
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="h-4 bg-green-100 rounded animate-pulse" />
          <div className="h-3 bg-green-50 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-green-50 rounded animate-pulse w-1/2" />
          <div className="flex justify-between items-center">
            <div className="h-5 bg-green-100 rounded animate-pulse w-16" />
            <div className="h-4 bg-green-50 rounded animate-pulse w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
