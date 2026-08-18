import Link from "next/link";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

// http://localhost:3000/contact
export default function ContactPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="w-full grow sm:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg)">
        <h2 className="mx-auto text-center font-medium text-4xl tracking-[-0.045em] sm:text-[2.75rem]/[1.2]">
          ติดต่อเรา
        </h2>
        <p className="mt-3 text-pretty text-center text-lg text-muted-foreground tracking-[-0.01em] sm:text-2xl">
          สอบถามข้อมูลเพิ่มเติมหรือติดต่อทีมงาน
        </p>

        <div className="mx-auto mt-18 grid max-w-2xl gap-8 sm:grid-cols-2">
          <div className="rounded-xl border p-6">
            <h3 className="font-medium text-xl tracking-[-0.015em]">ที่อยู่</h3>
            <p className="mt-2 text-muted-foreground">
              123 ถนนตัวอย่าง แขวงบางรัก เขตบางรัก กรุงเทพมหานคร 10500
            </p>
          </div>
          <div className="rounded-xl border p-6">
            <h3 className="font-medium text-xl tracking-[-0.015em]">อีเมล</h3>
            <p className="mt-2 text-muted-foreground">
              contact@cosci.com
            </p>
          </div>
          <div className="rounded-xl border p-6">
            <h3 className="font-medium text-xl tracking-[-0.015em]">โทรศัพท์</h3>
            <p className="mt-2 text-muted-foreground">
              02-123-4567
            </p>
          </div>
          <div className="rounded-xl border p-6">
            <h3 className="font-medium text-xl tracking-[-0.015em]">เวลาทำการ</h3>
            <p className="mt-2 text-muted-foreground">
              จันทร์ - ศุกร์ 09:00 - 18:00 น.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="underline text-muted-foreground hover:text-foreground">
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
