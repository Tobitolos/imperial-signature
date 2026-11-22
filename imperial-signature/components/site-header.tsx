"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart-provider";

const nav = [
  { href: "/clothing", label: "Clothing" },
  { href: "/fragrances", label: "Fragrances" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount, hydrated } = useCart();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(7,7,7,0.92)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center border border-gold text-[11px] tracking-[0.2em] text-gold">
            IS
          </span>
          <span className="font-display text-xl tracking-[0.18em] text-cream uppercase">
            Imperial Signature
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[11px] tracking-[0.22em] uppercase transition-colors ${
                pathname === item.href ? "text-gold-bright" : "text-muted hover:text-cream"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative text-[11px] tracking-[0.22em] text-gold uppercase"
          >
            Cart
            {hydrated && itemCount > 0 ? (
              <span className="ml-2 inline-flex min-w-5 items-center justify-center border border-gold px-1 text-[10px] text-gold-bright">
                {itemCount}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={`h-px w-5 bg-gold transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-gold transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-5 bg-gold transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--line)] bg-ink px-5 py-8 lg:hidden">
          <nav className="flex flex-col gap-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-3xl text-cream"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/payment-policy" className="text-sm tracking-[0.16em] text-gold uppercase">
              Payment policy
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
