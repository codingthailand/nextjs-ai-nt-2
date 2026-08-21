import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AppLoading from "../components/app-loading";

const PAGE_SIZE = 3;

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      <Button asChild variant="outline" size="sm" disabled={currentPage <= 1}>
        <Link href={`/customer?page=${currentPage - 1}`} aria-disabled={currentPage <= 1}>
          <ChevronLeft /> ก่อนหน้า
        </Link>
      </Button>

      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <Button
            key={page}
            asChild
            variant={page === currentPage ? "default" : "ghost"}
            size="icon-sm"
            className="rounded-full"
          >
            <Link href={`/customer?page=${page}`}>{page}</Link>
          </Button>
        ))}
      </div>

      <Button asChild variant="outline" size="sm" disabled={currentPage >= totalPages}>
        <Link href={`/customer?page=${currentPage + 1}`} aria-disabled={currentPage >= totalPages}>
          ถัดไป <ChevronRight />
        </Link>
      </Button>
    </div>
  );
}

async function CustomerTable({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await connection();

  const params = searchParams;
  const pageParam = typeof params.page === "string" ? params.page : "1";
  const page = Math.max(1, Number.parseInt(pageParam, 10) || 1);

  const [totalCustomers, customers] = await Promise.all([
    prisma.customer.count(),
    prisma.customer.findMany({
      orderBy: { id: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCustomers / PAGE_SIZE));

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="font-heading text-sm font-bold uppercase tracking-[0.1em] text-primary">
            Customers
          </span>
          <h1 className="mt-2 font-heading text-4xl font-bold tracking-[0.01em]">
            รายชื่อลูกค้า
          </h1>
        </div>
        <span className="font-mono text-sm text-muted-foreground">
          ทั้งหมด {totalCustomers} คน
        </span>
      </div>

      <Card className="mt-10 gap-0 p-0">
        <CardHeader className="border-b">
          <CardTitle className="font-heading text-lg">ตารางลูกค้า</CardTitle>
          <CardDescription>แสดงรายการลูกค้าจากฐานข้อมูล หน้าละ {PAGE_SIZE} คน</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">ลำดับ</TableHead>
                <TableHead>ชื่อ</TableHead>
                <TableHead>ที่อยู่</TableHead>
                <TableHead>เบอร์โทร</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-mono text-muted-foreground">
                    {(page - 1) * PAGE_SIZE + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">
                    {customer.address}
                  </TableCell>
                  <TableCell className="font-mono">{customer.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Pagination currentPage={page} totalPages={totalPages} />
    </>
  );
}

// http://localhost:3000/customer
export default function CustomerPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
      <Suspense fallback={<AppLoading />}>
        <CustomerTable searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
