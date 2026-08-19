import Link from "next/link";
import { Card } from "@/components/ui/card";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const details = [
  { icon: MapPin, title: "ที่อยู่", text: "123 ถนนตัวอย่าง แขวงบางรัก เขตบางรัก กรุงเทพมหานคร 10500" },
  { icon: Mail, title: "อีเมล", text: "contact@cosci.com" },
  { icon: Phone, title: "โทรศัพท์", text: "02-123-4567" },
  { icon: Clock, title: "เวลาทำการ", text: "จันทร์ - ศุกร์ 09:00 - 18:00 น." },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-heading text-sm font-bold uppercase tracking-[0.1em] text-primary">
          Get in Touch
        </span>
        <h2 className="mt-2 font-heading text-4xl font-bold tracking-[0.01em]">
          ติดต่อเรา
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          สอบถามข้อมูลเพิ่มเติมหรือติดต่อทีมงาน
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
        {details.map((d) => (
          <Card key={d.title} size="elevated" className="gap-4 p-8">
            <div className="flex size-12 items-center justify-center rounded-xl bg-[#FDF4FF] text-primary">
              <d.icon className="size-5" />
            </div>
            <h3 className="font-heading text-xl font-semibold tracking-[-0.015em]">
              {d.title}
            </h3>
            <p className="text-muted-foreground">{d.text}</p>
          </Card>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link href="/" className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-primary">
          กลับหน้าหลัก
        </Link>
      </div>
    </section>
  );
}