import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full min-w-0 resize-y rounded-xl border-[1.5px] border-[#D4D4D4] bg-white px-4 py-2.5 text-base text-[#171717] transition-[color,box-shadow,border-color] outline-none placeholder:text-[#A3A3A3] focus-visible:border-[#D946EF] focus-visible:ring-3 focus-visible:ring-[#D946EF]/15 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:opacity-50 aria-invalid:border-[#EF4444] aria-invalid:ring-3 aria-invalid:ring-[#EF4444]/15 md:text-base",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
