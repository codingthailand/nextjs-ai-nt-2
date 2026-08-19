import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border bg-clip-padding text-sm font-bold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-40 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[#C026D3] active:bg-[#A21CAF]",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-[#FDF4FF] aria-expanded:bg-[#FDF4FF] dark:border-primary dark:text-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[#0EA5E9] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "text-[#525252] hover:bg-[#F5F5F5] hover:text-foreground aria-expanded:bg-[#F5F5F5] aria-expanded:text-foreground",
        destructive:
          "bg-destructive text-white hover:bg-[#DC2626] focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive dark:hover:bg-[#DC2626] dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-[42px] gap-1.5 px-7 has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6",
        xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-[34px] gap-1 px-4.5 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        lg: "h-[50px] gap-1.5 px-9 has-data-[icon=inline-end]:pr-7 has-data-[icon=inline-start]:pl-7 text-base",
        icon: "size-[42px]",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-[34px]",
        "icon-lg": "size-[50px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
