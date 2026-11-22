import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { SampleNotice } from "@/components/sample-notice";
import { productsIn } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Clothing",
  description: "Unisex house clothing from Imperial Signature. Sample catalog with NGN prices.",
};

export default function ClothingPage() {
  const items = productsIn("clothing");

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">House line · Unisex</p>
      <h1 className="mt-4 font-display text-5xl text-cream">Clothing</h1>
      <p className="mt-4 max-w-2xl leading-8 text-muted">
        Designed by Imperial Signature. Sizes run XS–XXL. Sample SKUs until live garments exist.
      </p>
      <SampleNotice className="mt-8" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
