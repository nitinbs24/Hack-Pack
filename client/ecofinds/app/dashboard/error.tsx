"use client"

import Error from "@/components/ui/error-boundary"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <Error error={error} reset={reset} />
}
