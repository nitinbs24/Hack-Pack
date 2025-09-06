import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white/80 border-green-100 text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Leaf className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-green-800">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
          <Link href="/dashboard">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Home className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
