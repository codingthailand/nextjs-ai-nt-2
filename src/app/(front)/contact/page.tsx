import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { ContactForm } from "../components/contact-form";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiMailLine,
  RiMapPin2Line,
  RiPhoneLine,
  RiQuestionLine,
  RiTimeLine,
  RiTwitterXFill,
  RiYoutubeFill,
} from "@remixicon/react";

export const metadata: Metadata = {
  title: "ติดต่อเรา — ShopVibe",
  description: "ติดต่อร้าน ShopVibe ผ่านแบบฟอร์ม, โทรศัพท์ หรืออีเมล",
};

const details = [
  {
    icon: RiMapPin2Line,
    title: "ที่อยู่",
    text: "123 ถนนตัวอย่าง แขวงบางรัก เขตบางรัก กรุงเทพมหานคร 10500",
  },
  {
    icon: RiPhoneLine,
    title: "โทรศัพท์",
    text: "02-123-4567",
    href: "tel:021234567",
  },
  {
    icon: RiMailLine,
    title: "อีเมล",
    text: "contact@cosci.com",
    href: "mailto:contact@cosci.com",
  },
  {
    icon: RiTimeLine,
    title: "เวลาทำการ",
    text: "จันทร์ - ศุกร์ 09:00 - 18:00 น.\nเสาร์ - อาทิตย์ 10:00 - 16:00 น.",
  },
];

const socials = [
  { icon: RiFacebookFill, label: "Facebook", href: "https://facebook.com" },
  { icon: RiTwitterXFill, label: "X (Twitter)", href: "https://x.com" },
  { icon: RiInstagramLine, label: "Instagram", href: "https://instagram.com" },
  { icon: RiYoutubeFill, label: "YouTube", href: "https://youtube.com" },
];

const faqs = [
  {
    q: "ส่งข้อความแล้วจะได้รับคำตอบเมื่อไหร่?",
    a: "เราจะตอบกลับภายใน 1-2 วันทำการ โดยปกติจะเร็วกว่านั้น",
  },
  {
    q: "สามารถติดต่อทางโทรศัพท์ได้ไหม?",
    a: "ได้ครับ ติดต่อได้ที่ 02-123-4567 ในเวลาทำการ (จันทร์ - ศุกร์ 09:00 - 18:00 น.)",
  },
  {
    q: "สั่งซื้อสินค้าผ่านช่องทางไหนได้บ้าง?",
    a: "สั่งซื้อได้โดยตรงผ่านเว็บไซต์ โดยสินค้าจะถูกจัดส่งภายใน 2-3 วันทำการ",
  },
  {
    q: "มีบริการจัดส่งสินค้าไปต่างประเทศหรือไม่?",
    a: "ปัจจุบันเราจัดส่งเฉพาะภายในประเทศไทยเท่านั้น",
  },
];

function DetailItem({
  icon: Icon,
  title,
  text,
  href,
}: (typeof details)[number]) {
  const lines = text.split("\n");
  const body = (
    <>
      <h3 className="font-heading text-base font-semibold">{title}</h3>
      <p className="whitespace-pre-line text-muted-foreground">
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    </>
  );

  return (
    <li className="flex items-start gap-4">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#FDF4FF] text-primary">
        <Icon className="size-5" />
      </div>
      <div className="flex flex-col gap-1 pt-1">
        {href ? (
          <Link
            href={href}
            className="group flex flex-col gap-1 text-left no-underline"
          >
            {body}
          </Link>
        ) : (
          body
        )}
      </div>
    </li>
  );
}

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-heading text-sm font-bold uppercase tracking-[0.1em] text-primary">
          Get in Touch
        </span>
        <h1 className="mt-2 font-heading text-4xl font-bold tracking-[0.01em] sm:text-5xl">
          Contact US
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          สอบถามข้อมูลเพิ่มเติมหรือติดต่อทีมงานของเรา
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div className="flex flex-col gap-6">
          <Card size="elevated" className="gap-0 p-8">
            <ul className="flex flex-col gap-6">
              {details.map((detail) => (
                <DetailItem key={detail.title} {...detail} />
              ))}
            </ul>
          </Card>

          <Card size="elevated" className="gap-0 p-8">
            <h2 className="font-heading text-lg font-semibold">ติดตามเรา</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-11 items-center justify-center rounded-full border border-[#E5E5E5] text-muted-foreground transition-colors hover:border-primary hover:bg-[#FDF4FF] hover:text-primary"
                >
                  <social.icon className="size-5" />
                </Link>
              ))}
            </div>
          </Card>

          <Card size="elevated" className="gap-0 p-8">
            <div className="flex items-center gap-2">
              <RiQuestionLine className="size-5 text-primary" />
              <h2 className="font-heading text-lg font-semibold">
                คำถามที่พบบ่อย
              </h2>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-[#E5E5E5] px-4 py-3 open:bg-[#FDF4FF]/60"
                >
                  <summary className="cursor-pointer list-none font-medium text-sm [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-3">
                      {faq.q}
                      <span className="text-muted-foreground transition-transform group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </Card>
        </div>

        <Card size="elevated" className="gap-0 p-8">
          <h2 className="font-heading text-2xl font-bold">ส่งข้อความถึงเรา</h2>
          <p className="mt-2 text-muted-foreground">
            กรอกข้อมูลด้านล่างแล้วกดส่ง ทางเราจะติดต่อกลับโดยเร็วที่สุด
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </Card>
      </div>
    </section>
  );
}
