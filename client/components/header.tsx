"use client"

import { useState } from "react"
import { Search, Menu, User, Plus, Heart, ShoppingBag, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AuthModal } from "@/components/auth-modal"
import { AddProductModal } from "@/components/add-product-modal"

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <Leaf className="text-white h-5 w-5" />
            </div>
            <span className="font-black text-2xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              EcoFinds
            </span>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search eco-friendly products..."
                className="pl-12 pr-4 py-3 bg-muted/30 border-muted-foreground/20 rounded-2xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-base"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAddProductModalOpen(true)}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl px-4 py-2 transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Sell
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl px-4 py-2 transition-all duration-300"
            >
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl px-4 py-2 transition-all duration-300 relative"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Cart
              <Badge className="ml-2 h-6 w-6 rounded-full p-0 text-xs bg-primary text-white border-0 shadow-lg flex items-center justify-center">
                3
              </Badge>
            </Button>
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-2 font-semibold"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover:bg-primary/10 rounded-xl p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6 text-primary" />
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search eco-friendly products..."
              className="pl-12 pr-4 py-3 bg-muted/30 border-muted-foreground/20 rounded-2xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-primary/10 py-4 space-y-3 bg-white/95 backdrop-blur-sm rounded-b-2xl">
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-primary/10 rounded-xl py-3 transition-all duration-300"
              onClick={() => setIsAddProductModalOpen(true)}
            >
              <Plus className="h-5 w-5 mr-3 text-primary" />
              <span className="font-medium text-foreground">Sell Product</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-primary/10 rounded-xl py-3 transition-all duration-300"
            >
              <Heart className="h-5 w-5 mr-3 text-primary" />
              <span className="font-medium text-foreground">Wishlist</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-primary/10 rounded-xl py-3 transition-all duration-300"
            >
              <ShoppingBag className="h-5 w-5 mr-3 text-primary" />
              <span className="font-medium text-foreground">Cart (3)</span>
            </Button>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg rounded-xl py-3 font-semibold transition-all duration-300"
              onClick={() => setIsAuthModalOpen(true)}
            >
              <User className="h-5 w-5 mr-3" />
              Sign In
            </Button>
          </div>
        )}
      </div>

      <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
      <AddProductModal open={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen} />
    </header>
  )
}
