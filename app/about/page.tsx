import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description: brand.mission,
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">The house</p>
      <h1 className="mt-4 font-display text-5xl text-cream md:text-6xl">{brand.name}</h1>
      <p className="mt-6 font-display text-3xl text-gold-bright">{brand.slogan}</p>
      <p className="mt-8 text-lg leading-8 text-muted">{brand.philosophy}</p>
      <p className="mt-4 font-display text-2xl text-cream">{brand.tagline}</p>

      <section className="mt-14 space-y-6 text-base leading-8 text-muted">
        <p>{brand.positioning}</p>
        <p>
          Clothing is designed as a unisex house line — cut for presence, finished in black, and
          marked with gold only where it earns its keep. Fragrances are curated from established
          perfume houses. We do not pretend those scents are ours; we choose them, present them,
          and intend to sell authentic stock once live inventory is confirmed.
        </p>
      </section>

      <section className="mt-14 grid gap-8 md:grid-cols-2">
        <div className="border border-[var(--line)] p-6">
          <h2 className="text-[11px] tracking-[0.22em] text-gold uppercase">Vision</h2>
          <p className="mt-4 leading-8 text-cream">{brand.vision}</p>
        </div>
        <div className="border border-[var(--line)] p-6">
          <h2 className="text-[11px] tracking-[0.22em] text-gold uppercase">Mission</h2>
          <p className="mt-4 leading-8 text-cream">{brand.mission}</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-[11px] tracking-[0.22em] text-gold uppercase">Promise</h2>
        <ul className="mt-6 space-y-3">
          {brand.promiseLines.map((line) => (
            <li key={line} className="font-display text-2xl text-cream">
              {line}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-14 text-sm text-muted">
        Personality: {brand.personality.join(" · ")}. Aesthetic: black and gold.
      </p>
    </article>
  );
}
