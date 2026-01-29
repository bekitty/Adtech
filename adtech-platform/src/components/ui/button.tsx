import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#1a1a2e] text-white shadow-sm hover:bg-gradient-to-r hover:from-[#F97316] hover:via-[#EC4899] hover:to-[#A855F7]",
        gradient:
          "bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#A855F7] text-white shadow-sm hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] hover:brightness-110",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-gradient-to-r hover:from-red-400 hover:to-rose-500",
        outline:
          "border border-gray-200 bg-white text-gray-900 hover:border-transparent hover:bg-gradient-to-r hover:from-[#F97316] hover:via-[#EC4899] hover:to-[#A855F7] hover:text-white",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gradient-to-r hover:from-[#F97316]/10 hover:via-[#EC4899]/10 hover:to-[#A855F7]/10 hover:text-[#A855F7]",
        ghost:
          "hover:bg-gradient-to-r hover:from-[#F97316]/10 hover:via-[#EC4899]/10 hover:to-[#A855F7]/10 hover:text-[#A855F7]",
        link:
          "text-[#A855F7] underline-offset-4 hover:underline hover:text-[#F97316]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
