"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSyncExternalStore } from "react";
import { ORDER_STORAGE_KEY } from "@/lib/cart";
import { bankTransfer, paymentRules } from "@/lib/commerce";
import { formatNgn } from "@/lib/money";
import type { PlacedOrder } from "@/lib/orders";

let cachedKey = "";
let cachedOrder: PlacedOrder | null = null;

function readStoredOrder(reference: string): PlacedOrder | null {
  try {
    const raw = window.sessionStorage.getItem(ORDER_STORAGE_KEY);
    const key = `${reference}:${raw ?? ""}`;
    if (key === cachedKey) return cachedOrder;
    cachedKey = key;
    if (!raw) {
      cachedOrder = null;
      return null;
    }
    const parsed = JSON.parse(raw) as PlacedOrder;
    cachedOrder = parsed.reference === reference ? parsed : null;
    return cachedOrder;
  } catch {
    cachedOrder = null;
    return null;
  }
}

export function OrderReceipt() {
  const params = useParams<{ reference: string }>();
  const reference = params.reference;
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const order = isClient ? readStoredOrder(reference) : null;

  if (!isClient) {
    return <p className="text-muted">Loading order…</p>;
  }

  if (!order) {
    return (
      <div className="border border-[var(--line)] px-8 py-16 text-center">
        <p className="font-display text-4xl text-cream">Order reference</p>
        <p className="mt-4 font-mono text-gold-bright">{reference}</p>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-muted">
          We could not reload the full order from this browser session. Keep this reference and
          contact Imperial Signature with it. An order is only confirmed after payment
          verification.
        </p>
        <Link href="/contact" className="btn-gold mt-8 inline-block">
          Contact us
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="border border-gold/50 bg-[rgba(201,169,98,0.08)] p-8">
        <p className="text-[11px] tracking-[0.24em] text-gold uppercase">Received — not yet confirmed</p>
        <h1 className="mt-3 font-display text-5xl text-cream">Order {order.reference}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{paymentRules.verification}</p>
        <p className="mt-3 text-sm text-gold-bright">{paymentRules.noPinOtp}</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="border border-[var(--line)] bg-ink-2 p-6">
          <h2 className="font-display text-3xl text-cream">Transfer this amount</h2>
          <p className="mt-4 font-display text-5xl text-gold-bright">{formatNgn(order.totalNgn)}</p>
          <p className="mt-2 text-sm text-muted">Use the order reference as narration.</p>
          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Bank</dt>
              <dd className="text-cream">{bankTransfer.bankName}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Account name</dt>
              <dd className="text-cream">{bankTransfer.accountName}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Account number</dt>
              <dd className="text-cream">{bankTransfer.accountNumber}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Narration</dt>
              <dd className="font-mono text-gold-bright">{order.reference}</dd>
            </div>
          </dl>
          <p className="mt-5 text-sm text-gold-bright">{bankTransfer.warning}</p>
          <p className="mt-3 text-sm text-muted">{bankTransfer.feeNote}</p>
        </div>
        <div className="border border-[var(--line)] bg-ink-2 p-6">
          <h2 className="font-display text-3xl text-cream">Items</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {order.items.map((item) => (
              <li key={`${item.productId}-${item.size ?? "os"}`} className="flex justify-between gap-3">
                <span className="text-muted">
                  {item.name}
                  {item.size ? ` · ${item.size}` : ""} × {item.quantity}
                </span>
                <span className="text-cream">{formatNgn(item.lineTotalNgn)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-[var(--line)] pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd>{formatNgn(order.subtotalNgn)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{order.deliveryLabel}</dt>
              <dd>{formatNgn(order.deliveryFeeNgn)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-cream">Total</dt>
              <dd className="text-gold-bright">{formatNgn(order.totalNgn)}</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-muted">
            {order.customer.fullName} · {order.customer.email}
            <br />
            {order.customer.address}, {order.customer.city}, {order.customer.state}
          </p>
        </div>
      </section>

      <p className="text-center text-sm text-muted">
        Keep this page or screenshot the reference. When official bank details are published, send
        the exact total and write <span className="text-gold">{order.reference}</span> on the
        transfer.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/payment-policy" className="btn-ghost">
          Payment policy
        </Link>
        <Link href="/contact" className="btn-gold">
          Contact after transfer
        </Link>
      </div>
    </div>
  );
}
