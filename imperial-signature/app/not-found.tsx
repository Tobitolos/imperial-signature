import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">404</p>
      <h1 className="mt-4 font-display text-5xl text-cream">This page is not in the house</h1>
      <div className="mt-10 flex justify-center gap-3">
        <Link href="/" className="btn-gold">
          Home
        </Link>
        <Link href="/clothing" className="btn-ghost">
          Clothing
        </Link>
      </div>
    </div>
  );
}
