import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { SampleNotice } from "@/components/sample-notice";
import { productsIn } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Fragrances",
  description:
    "Curated fragrances from established perfume brands, presented by Imperial Signature. Sample catalog.",
};

export default function FragrancesPage() {
  const items = productsIn("fragrance");

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Curated · Other houses</p>
      <h1 className="mt-4 font-display text-5xl text-cream">Fragrances</h1>
      <p className="mt-4 max-w-2xl leading-8 text-muted">
        Imperial Signature does not compose these scents. We curate established brands and show
        notes, volume and NGN sample prices until authentic stock is confirmed.
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
