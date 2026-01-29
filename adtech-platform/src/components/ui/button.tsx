import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#1a1a2e] text-white shadow-sm relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#F97316] before:via-[#EC4899] before:to-[#A855F7] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:rounded-full [&>*]:relative [&>*]:z-10",
        gradient:
          "bg-gradient-to-r from-[#F97316] via-[#EC4899] to-[#A855F7] text-white shadow-sm hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02]",
        destructive:
          "bg-red-500 text-white shadow-sm relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-400 before:to-rose-500 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:rounded-full [&>*]:relative [&>*]:z-10",
        outline:
          "border border-gray-200 bg-white hover:border-transparent hover:bg-gradient-to-r hover:from-[#F97316] hover:via-[#EC4899] hover:to-[#A855F7] hover:text-white",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // For default variant, wrap children in span for z-index layering
    const content = variant === 'default' || variant === 'destructive'
      ? <span className="relative z-10 flex items-center gap-2">{children}</span>
      : children

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {content}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
