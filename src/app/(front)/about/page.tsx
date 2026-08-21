import Link from "next/link";
import AppLoading from "../components/app-loading";
import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

async function ApiVersion() {
  const response = await fetch('https://api.codingthailand.com/api/version');
  const apiInfo = await response.json();

  return (
    <span className="rounded-full bg-[#FDF4FF] px-4 py-1.5 font-mono text-sm font-bold text-primary">
      API v{apiInfo.data.version}
    </span>
  );
}

// http://localhost:3000/about
export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-heading text-sm font-bold uppercase tracking-[0.1em] text-primary">
          About ShopVibe
        </span>
        <h1 className="mt-2 font-heading text-4xl font-bold tracking-[0.01em] sm:text-5xl">
          Tech with energy, shopping without friction
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          เราเชื่อว่าการช้อปปิ้งควรสนุกและง่ายดาย — จากหน้าแรกจนถึงหน้าชำระเงิน
        </p>
      </div>

      <Card size="elevated" className="mx-auto mt-12 max-w-2xl gap-4 p-10 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#FDF4FF] text-primary">
          <Sparkles className="size-6" />
        </div>
        <h2 className="font-heading text-2xl font-bold">Powered by NT</h2>
        <p className="mx-auto max-w-md text-muted-foreground">
          ระบบสถานะ API ปัจจุบันของแพลตฟอร์ม
        </p>
        <div className="flex justify-center">
          <Suspense fallback={<AppLoading />}>
            <ApiVersion />
          </Suspense>
        </div>
      </Card>

      <div className="mt-14 text-center">
        <Link href="/" className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-primary">
          กลับหน้าหลัก
        </Link>
      </div>
    </section>
  );
}