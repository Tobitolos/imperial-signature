import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { ProductArt } from "@/components/product-art";
import { SampleNotice } from "@/components/sample-notice";
import { getProduct, products } from "@/lib/catalog";
import { formatNgn } from "@/lib/money";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const catalogHref = product.category === "clothing" ? "/clothing" : "/fragrances";

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8">
      <ProductArt
        visual={product.visual}
        title={product.name}
        className="min-h-[420px] border border-[var(--line)]"
      />
      <div>
        <Link href={catalogHref} className="text-[11px] tracking-[0.22em] text-gold uppercase">
          {product.category === "clothing" ? "House clothing" : "Curated fragrances"}
        </Link>
        <p className="mt-4 text-sm tracking-[0.16em] text-muted uppercase">{product.brand}</p>
        <h1 className="mt-2 font-display text-5xl text-cream">{product.name}</h1>
        <p className="mt-4 text-2xl tracking-[0.08em] text-gold-bright">
          {formatNgn(product.priceNgn)}
        </p>
        <SampleNotice className="mt-6" />
        <p className="mt-6 leading-8 text-muted">{product.description}</p>

        {product.notes ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Notes label="Top" notes={product.notes.top} />
            <Notes label="Heart" notes={product.notes.heart} />
            <Notes label="Base" notes={product.notes.base} />
          </div>
        ) : null}

        <ul className="mt-8 space-y-2 text-sm text-muted">
          {product.details.map((detail) => (
            <li key={detail}>· {detail}</li>
          ))}
        </ul>

        <div className="mt-10">
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}

function Notes({ label, notes }: { label: string; notes: string[] }) {
  return (
    <div className="border border-[var(--line)] p-4">
      <p className="text-[11px] tracking-[0.2em] text-gold uppercase">{label}</p>
      <p className="mt-2 text-sm leading-6 text-cream">{notes.join(", ")}</p>
    </div>
  );
}
