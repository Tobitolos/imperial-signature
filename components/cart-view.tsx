"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { ProductArt } from "@/components/product-art";
import { SampleNotice } from "@/components/sample-notice";
import { hydrateCart, lineKey } from "@/lib/cart";
import { formatNgn } from "@/lib/money";

export function CartView() {
  const { lines, subtotalNgn, setQuantity, removeLine, hydrated } = useCart();
  const items = hydrateCart(lines);

  if (!hydrated) {
    return <p className="text-muted">Loading your cart…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="border border-[var(--line)] px-8 py-16 text-center">
        <p className="font-display text-4xl text-cream">Your cart is empty</p>
        <p className="mt-4 text-muted">Clothing and fragrances wait in the sample catalog.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/clothing" className="btn-gold">
            Shop clothing
          </Link>
          <Link href="/fragrances" className="btn-ghost">
            Shop fragrances
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="space-y-4">
        {items.map(({ line, product, lineTotalNgn }) => (
          <article
            key={lineKey(line)}
            className="grid grid-cols-[96px_1fr] gap-4 border border-[var(--line)] bg-ink-2 p-4 sm:grid-cols-[120px_1fr_auto]"
          >
            <ProductArt visual={product.visual} title={product.name} className="aspect-[4/5]" />
            <div>
              <p className="text-[10px] tracking-[0.2em] text-gold uppercase">{product.brand}</p>
              <h2 className="font-display text-2xl text-cream">{product.name}</h2>
              {line.size ? <p className="text-sm text-muted">Size {line.size}</p> : null}
              <p className="mt-1 text-sm text-gold-bright">{formatNgn(product.priceNgn)}</p>
              <div className="mt-4 flex items-center gap-3">
                <label className="text-[11px] tracking-[0.16em] text-muted uppercase">
                  Qty
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={line.quantity}
                    onChange={(event) =>
                      setQuantity(lineKey(line), Number(event.target.value))
                    }
                    className="ml-2 w-16 border border-[var(--line)] bg-ink px-2 py-1 text-cream"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeLine(lineKey(line))}
                  className="text-xs tracking-[0.14em] text-muted uppercase hover:text-gold"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="self-start text-sm tracking-[0.08em] text-cream">
              {formatNgn(lineTotalNgn)}
            </p>
          </article>
        ))}
      </div>

      <aside className="h-fit border border-[var(--line)] bg-ink-2 p-6">
        <h2 className="font-display text-3xl text-cream">Summary</h2>
        <SampleNotice className="mt-4" />
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd className="text-cream">{formatNgn(subtotalNgn)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Delivery</dt>
            <dd className="text-cream">Calculated at checkout</dd>
          </div>
        </dl>
        <p className="mt-6 text-sm leading-6 text-muted">
          Full payment is required. Your order is confirmed only after we verify the transfer. No
          card details, PINs or OTPs are collected here.
        </p>
        <Link href="/checkout" className="btn-gold mt-6 block text-center">
          Continue to checkout
        </Link>
        <Link
          href="/payment-policy"
          className="mt-4 block text-center text-xs tracking-[0.16em] text-gold uppercase"
        >
          Read payment policy first
        </Link>
      </aside>
    </div>
  );
}
