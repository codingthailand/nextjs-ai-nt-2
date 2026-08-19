"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCartStore } from "@/lib/cart-store";
import { ShoppingBag, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartList() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice());

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-6 py-32 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-[#FDF4FF] text-primary">
          <ShoppingBag className="size-8" />
        </div>
        <h1 className="mt-6 font-heading text-2xl font-bold">ตะกร้าสินค้าว่างเปล่า</h1>
        <p className="mt-2 text-muted-foreground">
          ลองเพิ่มสินค้าสักชิ้น แล้วมาสนุกกับการช้อปกัน
        </p>
        <Button className="mt-8" onClick={() => router.replace('/product')}>
          ไปช้อปสินค้า
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold tracking-[0.01em]">
          ตะกร้าสินค้า
        </h1>
        <span className="font-mono text-sm text-muted-foreground">
          {items.length} items
        </span>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white shadow-[0_4px_6px_rgba(0,0,0,0.07),0_2px_4px_rgba(0,0,0,0.05)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>รหัสสินค้า</TableHead>
              <TableHead>ชื่อสินค้า</TableHead>
              <TableHead className="text-right">ราคา</TableHead>
              <TableHead className="text-center">จำนวน</TableHead>
              <TableHead className="text-right">รวม</TableHead>
              <TableHead className="text-right">เครื่องมือ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((i) => (
              <TableRow key={i.productId}>
                <TableCell className="font-mono text-sm text-muted-foreground">{i.productId}</TableCell>
                <TableCell className="font-medium">{i.name}</TableCell>
                <TableCell className="text-right">฿{i.price.toLocaleString()}</TableCell>
                <TableCell className="text-center">{i.qty}</TableCell>
                <TableCell className="text-right font-heading font-bold text-secondary">
                  ฿{(i.price * i.qty).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="destructive" onClick={() => { removeItem(i.productId); }}>
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-8 flex flex-col items-end gap-5">
        <div className="text-right">
          <p className="text-sm text-muted-foreground">รวมทั้งหมด</p>
          <p className="font-heading text-3xl font-extrabold text-primary">
            ฿{totalPrice.toLocaleString()}
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-3">
          <Button variant="ghost" onClick={() => { clearCart(); }}>
            ลบสินค้าทั้งหมด
          </Button>
          <Button onClick={() => {
            clearCart();
            router.replace('/product');
          }}>
            ยืนยันการสั่งซื้อ
          </Button>
        </div>
      </div>
    </div>
  );
}