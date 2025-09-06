import { Button } from "@/components/ui/button"
import { Leaf, ShoppingBag, Users, Recycle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">EcoFinds</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost" className="text-green-700 hover:text-green-800">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6 text-balance">
            Discover Sustainable Products for a Better Tomorrow
          </h1>
          <p className="text-xl text-green-600 mb-8 max-w-3xl mx-auto text-pretty">
            Join our eco-friendly marketplace where you can buy and sell sustainable products, reduce waste, and make a
            positive impact on the environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Start Shopping
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50 px-8 py-3 bg-transparent"
              >
                Sell Your Items
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/60 rounded-lg border border-green-100">
            <ShoppingBag className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Eco-Friendly Products</h3>
            <p className="text-green-600">
              Discover a curated selection of sustainable and environmentally conscious products.
            </p>
          </div>
          <div className="text-center p-6 bg-white/60 rounded-lg border border-green-100">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Community Driven</h3>
            <p className="text-green-600">
              Connect with like-minded individuals who care about sustainability and the environment.
            </p>
          </div>
          <div className="text-center p-6 bg-white/60 rounded-lg border border-green-100">
            <Recycle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Reduce Waste</h3>
            <p className="text-green-600">
              Give products a second life and reduce waste by buying and selling pre-loved items.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
