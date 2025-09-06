"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, SlidersHorizontal } from "lucide-react"
import type { Category } from "@prisma/client"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SearchAndFilterProps {
  categories: Category[]
}

export function SearchAndFilter({ categories }: SearchAndFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "all",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    condition: searchParams.get("condition") || "any",
    sortBy: searchParams.get("sortBy") || "createdAt",
  })

  const updateURL = (newFilters: typeof filters) => {
    const params = new URLSearchParams()

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      }
    })

    const queryString = params.toString()
    router.push(`/dashboard${queryString ? `?${queryString}` : ""}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateURL(filters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      category: "all",
      minPrice: "",
      maxPrice: "",
      condition: "any",
      sortBy: "createdAt",
    }
    setFilters(clearedFilters)
    updateURL(clearedFilters)
  }

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => key !== "sortBy" && value !== "")

  return (
    <Card className="mb-6 bg-white/80 border-green-100">
      <CardContent className="p-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10 border-green-200 focus:border-green-400"
            />
          </div>
          <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
            Search
          </Button>
        </form>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between mb-4">
          <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                    Active
                  </Badge>
                )}
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700">Category</label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) => setFilters({ ...filters, category: value })}
                  >
                    <SelectTrigger className="border-green-200 focus:border-green-400">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Condition Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700">Condition</label>
                  <Select
                    value={filters.condition}
                    onValueChange={(value) => setFilters({ ...filters, condition: value })}
                  >
                    <SelectTrigger className="border-green-200 focus:border-green-400">
                      <SelectValue placeholder="Any condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any condition</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                      <SelectItem value="refurbished">Refurbished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700">Min Price</label>
                  <Input
                    type="number"
                    placeholder="$0"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="border-green-200 focus:border-green-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700">Max Price</label>
                  <Input
                    type="number"
                    placeholder="No limit"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button onClick={() => updateURL(filters)} className="bg-green-600 hover:bg-green-700 text-white">
                  Apply Filters
                </Button>
                {hasActiveFilters && (
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-green-700">Sort by:</span>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => {
                const newFilters = { ...filters, sortBy: value }
                setFilters(newFilters)
                updateURL(newFilters)
              }}
            >
              <SelectTrigger className="w-40 border-green-200 focus:border-green-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Newest first</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="title">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Search: "{filters.search}"
                <button
                  onClick={() => {
                    const newFilters = { ...filters, search: "" }
                    setFilters(newFilters)
                    updateURL(newFilters)
                  }}
                  className="ml-1 hover:text-green-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.category !== "all" && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Category: {categories.find((c) => c.id === filters.category)?.name}
                <button
                  onClick={() => {
                    const newFilters = { ...filters, category: "all" }
                    setFilters(newFilters)
                    updateURL(newFilters)
                  }}
                  className="ml-1 hover:text-green-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.condition !== "any" && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Condition: {filters.condition}
                <button
                  onClick={() => {
                    const newFilters = { ...filters, condition: "any" }
                    setFilters(newFilters)
                    updateURL(newFilters)
                  }}
                  className="ml-1 hover:text-green-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Price: ${filters.minPrice || "0"} - ${filters.maxPrice || "∞"}
                <button
                  onClick={() => {
                    const newFilters = { ...filters, minPrice: "", maxPrice: "" }
                    setFilters(newFilters)
                    updateURL(newFilters)
                  }}
                  className="ml-1 hover:text-green-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
