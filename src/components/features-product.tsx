/* eslint-disable @typescript-eslint/no-explicit-any */
import CartButton from "@/app/(front)/components/CartButton";
import { Card } from "@/components/ui/card";
import ProductImage from "@/components/product-image";

type Props = {
  products: any[]
}

const FeaturesProduct = ({ products }: Props) => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="font-heading text-sm font-bold uppercase tracking-[0.1em] text-primary">
            New Arrivals
          </span>
          <h2 className="mt-2 font-heading text-4xl font-bold tracking-[0.01em]">
            สินค้าทั้งหมด
          </h2>
        </div>
        <span className="font-mono text-sm text-muted-foreground">
          {products.length} items
        </span>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {products.map((product) => {
          const price = Number(product.price);
          const salePrice = Math.round(price * 0.8);

          return (
            <Card
              key={product.id}
              size="elevated"
              className="overflow-hidden p-0 transition-shadow hover:shadow-[0_14px_32px_rgba(217,70,239,0.12),0_6px_12px_rgba(0,0,0,0.06)]"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-t-2xl">
                <ProductImage
                  name={product.name}
                  src={product.picture ? `/product-image/${product.picture}` : null}
                />
                <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground shadow-sm">
                  SALE
                </span>
              </div>

              <div className="flex flex-col gap-4 p-5">
                <h3 className="font-heading text-lg font-semibold tracking-[0.005em]">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-2xl font-bold text-secondary">
                    ฿{salePrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ฿{price.toLocaleString()}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="size-2 rounded-full bg-success" />
                    In stock · ships today
                  </span>
                  <CartButton product={{ ...product, price: salePrice }} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesProduct;