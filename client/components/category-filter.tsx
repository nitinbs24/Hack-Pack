"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"

const categories = [
  "All Products",
  "Home & Garden",
  "Fashion",
  "Beauty & Personal Care",
  "Electronics",
  "Food & Beverages",
  "Baby & Kids",
  "Sports & Outdoors",
  "Office Supplies",
]

const priceRanges = ["Under ₹2,000", "₹2,000-₹4,000", "₹4,000-₹8,000", "Over ₹8,000"]

export function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const clearFilters = () => {
    setSelectedCategory("All Products")
    setSelectedPriceRange(null)
  }

  const hasActiveFilters = selectedCategory !== "All Products" || selectedPriceRange

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Browse Products</h2>
        <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategory !== "All Products" && (
            <Badge variant="secondary" className="gap-1">
              {selectedCategory}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("All Products")} />
            </Badge>
          )}
          {selectedPriceRange && (
            <Badge variant="secondary" className="gap-1">
              {selectedPriceRange}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedPriceRange(null)} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Filters */}
      <div className={`space-y-4 ${showFilters ? "block" : "hidden md:block"}`}>
        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="flex flex-wrap gap-2">
            {priceRanges.map((range) => (
              <Button
                key={range}
                variant={selectedPriceRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPriceRange(selectedPriceRange === range ? null : range)}
                className="text-sm"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
