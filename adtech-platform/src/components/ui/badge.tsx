import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gray-900 text-white",
        secondary:
          "border-transparent bg-gray-100 text-gray-900",
        success:
          "border-transparent bg-green-100 text-green-700",
        warning:
          "border-transparent bg-amber-100 text-amber-700",
        error:
          "border-transparent bg-red-100 text-red-700",
        info:
          "border-transparent bg-blue-100 text-blue-700",
        outline:
          "border-gray-200 text-gray-700",
        submitted:
          "border-transparent bg-orange-100 text-orange-600",
        approved:
          "border-transparent bg-green-100 text-green-600",
        rejected:
          "border-transparent bg-red-100 text-red-600",
        pending:
          "border-transparent bg-yellow-100 text-yellow-700",
        active:
          "border-transparent bg-green-100 text-green-700",
        paused:
          "border-transparent bg-gray-100 text-gray-600",
        draft:
          "border-transparent bg-blue-100 text-blue-600",
        completed:
          "border-transparent bg-purple-100 text-purple-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
