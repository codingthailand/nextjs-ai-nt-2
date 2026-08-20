import FeaturesProduct from "@/components/features-product";
import prisma from "@/lib/prisma";
import { connection } from "next/server";

// http://localhost:3000/product
export default async function ProductPage() {
  await connection(); // signals this is a dynamic route
  const products = await prisma.product.findMany({
    include: { images: { take: 1 } },
  });
  
  // แปลงเป็น plain object ก่อนส่งให้ Client Component
  const serializedProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: Number(p.price),
    picture: p.images[0]?.imageName ?? null,
  }))

  return (
    <main>
      {/* { products.length> 0 && JSON.stringify(products) } */}
      {
        products.length > 0 && <FeaturesProduct products={serializedProducts} />
      }
    </main>
  );
}