import Link from "next/link";
import { ProductArt } from "@/components/product-art";
import type { Product } from "@/lib/catalog";
import { formatNgn } from "@/lib/money";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block border border-[var(--line)] bg-ink-2 transition hover:border-gold/60"
    >
      <ProductArt
        visual={product.visual}
        title={product.name}
        className="aspect-[4/5] border-b border-[var(--line)]"
      />
      <div className="space-y-2 px-5 py-5">
        <p className="text-[10px] tracking-[0.22em] text-gold uppercase">
          {product.category === "clothing" ? "House line" : product.brand}
        </p>
        <h3 className="font-display text-2xl text-cream group-hover:text-gold-bright">
          {product.name}
        </h3>
        <p className="text-sm text-muted">{product.summary}</p>
        <p className="pt-2 text-sm tracking-[0.12em] text-gold-bright">
          {formatNgn(product.priceNgn)}
        </p>
      </div>
    </Link>
  );
}
