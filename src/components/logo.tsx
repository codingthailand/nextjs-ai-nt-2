import { ShoppingBag } from "lucide-react";

export const Logo = () => (
  <span className="inline-flex items-center gap-2 text-foreground">
    <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
      <ShoppingBag className="size-4" />
    </span>
    <span className="font-heading text-lg font-extrabold tracking-tight">
      Shop<span className="text-primary">Vibe</span>
    </span>
  </span>
);