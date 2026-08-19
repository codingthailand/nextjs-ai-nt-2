import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-xl border-[1.5px] border-[#D4D4D4] bg-white px-4 py-1 text-base text-[#171717] transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#A3A3A3] focus-visible:border-[#D946EF] focus-visible:ring-3 focus-visible:ring-[#D946EF]/15 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:opacity-50 aria-invalid:border-[#EF4444] aria-invalid:ring-3 aria-invalid:ring-[#EF4444]/15 md:text-base",
        className
      )}
      {...props}
    />
  )
}

export { Input }
