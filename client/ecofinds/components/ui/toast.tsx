"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const ToastContext = React.createContext<{
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
})

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "success" | "error"
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "bg-white border rounded-lg shadow-lg p-4 max-w-sm",
              toast.variant === "success" && "border-green-200 bg-green-50",
              toast.variant === "error" && "border-red-200 bg-red-50",
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {toast.title && (
                  <div
                    className={cn(
                      "font-semibold text-sm",
                      toast.variant === "success" && "text-green-800",
                      toast.variant === "error" && "text-red-800",
                      !toast.variant && "text-gray-800",
                    )}
                  >
                    {toast.title}
                  </div>
                )}
                {toast.description && (
                  <div
                    className={cn(
                      "text-sm mt-1",
                      toast.variant === "success" && "text-green-600",
                      toast.variant === "error" && "text-red-600",
                      !toast.variant && "text-gray-600",
                    )}
                  >
                    {toast.description}
                  </div>
                )}
              </div>
              <button onClick={() => removeToast(toast.id)} className="ml-2 text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
