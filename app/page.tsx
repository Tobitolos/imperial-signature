import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SampleNotice } from "@/components/sample-notice";
import { brand } from "@/lib/brand";
import { featuredProducts } from "@/lib/catalog";

export default function HomePage() {
  const featured = featuredProducts();

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#2a2214_0%,#070707_58%)]" />
        <div className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36">
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">
            Lagos · Fashion · Fragrance
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] text-cream md:text-7xl">
            {brand.philosophyLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-muted md:text-lg">
            {brand.positioning}
          </p>
          <p className="mt-6 font-display text-2xl text-gold-bright md:text-3xl">{brand.tagline}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/clothing" className="btn-gold">
              House clothing
            </Link>
            <Link href="/fragrances" className="btn-ghost">
              Curated fragrances
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <SampleNotice />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {brand.promiseLines.map((line) => (
            <p key={line} className="border-t border-gold/40 pt-5 font-display text-2xl text-cream">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.24em] text-gold uppercase">Selected</p>
            <h2 className="mt-2 font-display text-4xl text-cream">The sample edit</h2>
          </div>
          <Link href="/clothing" className="hidden text-xs tracking-[0.18em] text-gold uppercase sm:inline">
            View clothing
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
