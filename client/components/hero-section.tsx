import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Recycle, Globe, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/15 py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.05),transparent_50%)]" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-6 text-primary">
              <div className="p-3 bg-primary/10 rounded-full animate-bounce delay-0">
                <Leaf className="h-8 w-8" />
              </div>
              <div className="p-3 bg-primary/10 rounded-full animate-bounce delay-150">
                <Recycle className="h-8 w-8" />
              </div>
              <div className="p-3 bg-primary/10 rounded-full animate-bounce delay-300">
                <Globe className="h-8 w-8" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-balance mb-8 leading-tight">
            Discover{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              Sustainable
            </span>{" "}
            Products for a{" "}
            <span className="bg-gradient-to-r from-accent via-accent/80 to-primary bg-clip-text text-transparent">
              Greener Future
            </span>
            <Sparkles className="inline-block h-8 w-8 md:h-12 md:w-12 text-accent ml-2 animate-pulse" />
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            Join our community of eco-conscious consumers and sellers. Find verified sustainable products that make a
            positive impact on our planet.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg px-10 py-6 rounded-2xl font-semibold"
            >
              Start Shopping
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 rounded-2xl font-semibold border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 bg-transparent"
            >
              Sell Your Products
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-primary/10 hover:border-primary/20 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-black text-primary">10K+</div>
              <div className="text-muted-foreground font-medium">Eco Products</div>
            </div>
            <div className="space-y-3 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-primary/10 hover:border-primary/20 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-black text-primary">5K+</div>
              <div className="text-muted-foreground font-medium">Happy Customers</div>
            </div>
            <div className="space-y-3 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-primary/10 hover:border-primary/20 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-black text-primary">100%</div>
              <div className="text-muted-foreground font-medium">Verified Sustainable</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
