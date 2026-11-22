import Link from "next/link";
import { brand, contact } from "@/lib/brand";

const footerNav = [
  { href: "/clothing", label: "Clothing" },
  { href: "/fragrances", label: "Fragrances" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/payment-policy", label: "Payment policy" },
  { href: "/returns", label: "Returns & refunds" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-ink-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-2xl tracking-[0.16em] text-cream uppercase">
            {brand.name}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-muted">{brand.tagline}</p>
          <p className="mt-4 text-xs tracking-[0.18em] text-gold uppercase">{brand.slogan}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.22em] text-gold uppercase">House</p>
          <ul className="mt-4 space-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-cream/85 hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Lagos</p>
          <p className="mt-4 text-sm leading-7 text-muted">
            {contact.city}
            <br />
            {contact.email}
            <br />
            {contact.phone}
          </p>
          <p className="mt-3 text-xs text-muted/80">
            Contact details are placeholders until official channels are published.
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--line)] px-5 py-5 text-center text-[11px] tracking-[0.16em] text-muted uppercase md:px-8">
        {brand.name} · Nigeria · Consumer rights reserved, including FCCPC
      </div>
    </footer>
  );
}
