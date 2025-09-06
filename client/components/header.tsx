"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AddProductModal } from "@/components/add-product-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function Header() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [user, setUser] = useState<{ name: string; email: string; isLoggedIn: boolean } | null>(null)

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      setCartCount(cart.length)
    }

    const updateUserState = () => {
      const userData = localStorage.getItem("ecofinds_user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }

    updateCartCount()
    updateUserState()

    window.addEventListener("storage", updateCartCount)
    window.addEventListener("cartUpdated", updateCartCount)
    window.addEventListener("userLoggedIn", updateUserState)

    return () => {
      window.removeEventListener("storage", updateCartCount)
      window.removeEventListener("cartUpdated", updateCartCount)
      window.removeEventListener("userLoggedIn", updateUserState)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("ecofinds_user")
    setUser(null)
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-18 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground text-lg font-bold">E</span>
            </div>
            <span className="font-black text-2xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              EcoFinds
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground text-lg">
                🔍
              </span>
              <Input
                placeholder="Search eco-friendly products..."
                className="pl-12 pr-4 py-3 bg-muted/30 border-muted-foreground/20 rounded-2xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-base"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAddProductModalOpen(true)}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl px-4 py-2 transition-all duration-300"
            >
              <span className="mr-2">+</span>
              Sell
            </Button>
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl px-4 py-2 transition-all duration-300"
              >
                <span className="mr-2">❤️</span>
                Wishlist
              </Button>
            </Link>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl px-4 py-2 transition-all duration-300 relative"
              >
                <span className="mr-2">🛒</span>
                Cart
                {cartCount > 0 && (
                  <Badge className="ml-2 h-6 w-6 rounded-full p-0 text-xs bg-primary text-white border-0 shadow-lg flex items-center justify-center">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-2 font-semibold">
                    <span className="mr-2">👤</span>
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleLogout}>
                    <span className="mr-2">↗️</span>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-2 font-semibold">
                  <span className="mr-3">👤</span>
                  Sign In
                </Button>
              </Link>
            )}
          </nav>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover:bg-primary/10 rounded-xl p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="text-primary text-xl">☰</span>
          </Button>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground text-lg">🔍</span>
            <Input
              placeholder="Search eco-friendly products..."
              className="pl-12 pr-4 py-3 bg-muted/30 border-muted-foreground/20 rounded-2xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-primary/10 py-4 space-y-3 bg-white/95 backdrop-blur-sm rounded-b-2xl">
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-primary/10 rounded-xl py-3 transition-all duration-300"
              onClick={() => setIsAddProductModalOpen(true)}
            >
              <span className="mr-3 text-primary">+</span>
              <span className="font-medium text-foreground">Sell Product</span>
            </Button>
            <Link href="/wishlist" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-primary/10 rounded-xl py-3 transition-all duration-300"
              >
                <span className="mr-3 text-primary">❤️</span>
                <span className="font-medium text-foreground">Wishlist</span>
              </Button>
            </Link>
            <Link href="/cart" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-primary/10 rounded-xl py-3 transition-all duration-300"
              >
                <span className="mr-3 text-primary">🛒</span>
                <span className="font-medium text-foreground">Cart {cartCount > 0 ? `(${cartCount})` : ""}</span>
              </Button>
            </Link>
            {user ? (
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-primary/10 rounded-xl py-3 transition-all duration-300"
                onClick={handleLogout}
              >
                <span className="mr-3 text-primary">↗️</span>
                <span className="font-medium text-foreground">Sign Out ({user.name})</span>
              </Button>
            ) : (
              <Link href="/login" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg rounded-xl py-3 font-semibold transition-all duration-300">
                  <span className="mr-3">👤</span>
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>

      <AddProductModal open={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen} />
    </header>
  )
}
