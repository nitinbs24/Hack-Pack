import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /dashboard, /products/new)
  const path = request.nextUrl.pathname

  // Define protected paths
  const protectedPaths = ["/dashboard", "/products/new", "/my-listings", "/profile"]

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some((protectedPath) => path.startsWith(protectedPath))

  if (isProtectedPath) {
    const authToken = request.cookies.get("auth-token")

    if (!authToken) {
      // Redirect to sign in page if no auth token
      const signInUrl = new URL("/auth/signin", request.url)
      signInUrl.searchParams.set("callbackUrl", request.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (authentication pages)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
  ],
}
