import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:py-32 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-40">
        <div className="max-w-xl">
          <Badge variant="tertiary" className="gap-1.5">
            <Zap className="size-3" /> New Season · Shop Now
          </Badge>

          <h1 className="mt-6 font-heading text-5xl font-extrabold leading-[1.1] tracking-[0.02em] sm:text-6xl">
            Gear up with the{" "}
            <span className="text-primary">hottest tech</span> at ShopVibe
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            IT gear and lifestyle essentials with the energy you need. Fresh
            drops, everyday deals, and checkout that just feels fast.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/product">
                Shop Now <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/course">Browse Courses</Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-secondary" /> Free shipping
            </span>
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-tertiary" /> 30-day returns
            </span>
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" /> Secure checkout
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square w-full rounded-[24px] bg-gradient-to-br from-[#FDF4FF] via-secondary/20 to-[#FEF9C3] shadow-[0_25px_50px_rgba(0,0,0,0.15),0_12px_24px_rgba(0,0,0,0.08)]" />
          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-[#E5E5E5] bg-white px-5 py-4 shadow-[0_10px_25px_rgba(0,0,0,0.1),0_6px_10px_rgba(0,0,0,0.06)]">
            <p className="font-heading text-2xl font-extrabold text-primary">Hot Deal</p>
            <p className="text-sm text-muted-foreground">Up to 50% off today</p>
          </div>
        </div>
      </div>
    </section>
  );
}