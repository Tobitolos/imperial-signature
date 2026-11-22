"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { SampleNotice } from "@/components/sample-notice";
import { hydrateCart, ORDER_STORAGE_KEY } from "@/lib/cart";
import { bankTransfer, deliveryOptions, paymentRules } from "@/lib/commerce";
import type { DeliveryOptionId } from "@/lib/commerce";
import { formatNgn } from "@/lib/money";
import type { PlacedOrder } from "@/lib/orders";

const nigerianStates = [
  "Lagos",
  "Abuja (FCT)",
  "Rivers",
  "Oyo",
  "Ogun",
  "Kano",
  "Kaduna",
  "Anambra",
  "Enugu",
  "Delta",
  "Edo",
  "Other",
];

export function CheckoutForm() {
  const router = useRouter();
  const { lines, hydrated, clearCart } = useCart();
  const items = useMemo(() => hydrateCart(lines), [lines]);
  const [deliveryId, setDeliveryId] = useState<DeliveryOptionId>("lagos");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Lagos",
    notes: "",
  });

  const delivery = deliveryOptions.find((option) => option.id === deliveryId)!;
  const subtotalNgn = items.reduce((sum, item) => sum + item.lineTotalNgn, 0);
  const totalNgn = subtotalNgn + delivery.feeNgn;

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!accepted) {
      setError("Please read and accept the payment policy.");
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          acceptedPaymentPolicy: true,
          deliveryId,
          customer: form,
          items: items.map(({ line }) => ({
            productId: line.productId,
            quantity: line.quantity,
            size: line.size,
          })),
        }),
      });
      const data = (await response.json()) as { order?: PlacedOrder; error?: string };
      if (!response.ok || !data.order) {
        setError(data.error ?? "We could not place the order.");
        return;
      }
      window.sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(data.order));
      clearCart();
      router.push(`/order/${data.order.reference}`);
    } catch {
      setError("A network error stopped the order. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (!hydrated) {
    return <p className="text-muted">Preparing checkout…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="border border-[var(--line)] px-8 py-16 text-center">
        <p className="font-display text-4xl text-cream">Nothing to check out</p>
        <Link href="/cart" className="btn-gold mt-8 inline-block">
          Return to cart
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-8">
        <section className="border border-[var(--line)] bg-ink-2 p-6">
          <h2 className="font-display text-3xl text-cream">Your details</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" value={form.fullName} onChange={(v) => update("fullName", v)} required />
            <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} required />
            <Field label="Phone" value={form.phone} onChange={(v) => update("phone", v)} required />
            <label className="block text-[11px] tracking-[0.16em] text-gold uppercase sm:col-span-2">
              Delivery address
              <textarea
                required
                rows={3}
                value={form.address}
                onChange={(event) => update("address", event.target.value)}
                className="mt-2 w-full border border-[var(--line)] bg-ink px-3 py-2 text-sm tracking-normal text-cream normal-case"
              />
            </label>
            <Field label="City" value={form.city} onChange={(v) => update("city", v)} required />
            <label className="block text-[11px] tracking-[0.16em] text-gold uppercase">
              State
              <select
                value={form.state}
                onChange={(event) => update("state", event.target.value)}
                className="mt-2 w-full border border-[var(--line)] bg-ink px-3 py-2 text-sm tracking-normal text-cream normal-case"
              >
                {nigerianStates.map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
            </label>
            <label className="block text-[11px] tracking-[0.16em] text-gold uppercase sm:col-span-2">
              Order notes (optional)
              <textarea
                rows={2}
                value={form.notes}
                onChange={(event) => update("notes", event.target.value)}
                className="mt-2 w-full border border-[var(--line)] bg-ink px-3 py-2 text-sm tracking-normal text-cream normal-case"
              />
            </label>
          </div>
        </section>

        <section className="border border-[var(--line)] bg-ink-2 p-6">
          <h2 className="font-display text-3xl text-cream">Delivery</h2>
          <p className="mt-2 text-sm text-muted">Fees are disclosed before you place the order.</p>
          <div className="mt-5 space-y-3">
            {deliveryOptions.map((option) => (
              <label
                key={option.id}
                className={`block cursor-pointer border p-4 ${
                  deliveryId === option.id ? "border-gold bg-[rgba(201,169,98,0.08)]" : "border-[var(--line)]"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  className="sr-only"
                  checked={deliveryId === option.id}
                  onChange={() => setDeliveryId(option.id)}
                />
                <span className="flex items-center justify-between gap-4">
                  <span className="text-cream">{option.label}</span>
                  <span className="text-gold-bright">{formatNgn(option.feeNgn)}</span>
                </span>
                <span className="mt-2 block text-sm text-muted">{option.detail}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="border border-[var(--line)] bg-ink-2 p-6">
          <h2 className="font-display text-3xl text-cream">Payment</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{paymentRules.fullPayment}</p>
          <p className="mt-3 text-sm leading-7 text-muted">{paymentRules.noCardCapture}</p>
          <p className="mt-3 text-sm leading-7 text-gold-bright">{paymentRules.noPinOtp}</p>
          <div className="mt-6 border border-gold/40 p-4">
            <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
              {bankTransfer.methodLabel}
            </p>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="Bank" value={bankTransfer.bankName} />
              <Row label="Account name" value={bankTransfer.accountName} />
              <Row label="Account number" value={bankTransfer.accountNumber} />
            </dl>
            <p className="mt-4 text-sm text-gold-bright">{bankTransfer.warning}</p>
            <p className="mt-3 text-sm text-muted">{bankTransfer.feeNote}</p>
          </div>
          <p className="mt-4 text-sm text-muted">
            After you place this order you will receive a unique order reference to use as your
            transfer narration. We then verify the payment. The order is not confirmed until that
            verification is complete.
          </p>
        </section>
      </div>

      <aside className="h-fit space-y-5 border border-[var(--line)] bg-ink-2 p-6">
        <h2 className="font-display text-3xl text-cream">Order</h2>
        <SampleNotice />
        <ul className="space-y-3 text-sm">
          {items.map(({ line, product, lineTotalNgn }) => (
            <li key={`${line.productId}-${line.size ?? "os"}`} className="flex justify-between gap-3">
              <span className="text-muted">
                {product.name}
                {line.size ? ` · ${line.size}` : ""} × {line.quantity}
              </span>
              <span className="text-cream">{formatNgn(lineTotalNgn)}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-2 border-t border-[var(--line)] pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd className="text-cream">{formatNgn(subtotalNgn)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">{delivery.label}</dt>
            <dd className="text-cream">{formatNgn(delivery.feeNgn)}</dd>
          </div>
          <div className="flex justify-between font-medium">
            <dt className="text-cream">Amount to transfer</dt>
            <dd className="text-gold-bright">{formatNgn(totalNgn)}</dd>
          </div>
        </dl>
        <p className="text-xs leading-5 text-muted">
          No other Imperial Signature fees apply to this order. If a pricing error is found before
          we accept the order, we will contact you.
        </p>
        <label className="flex items-start gap-3 text-sm text-cream">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            className="mt-1"
          />
          <span>
            I have read the{" "}
            <Link href="/payment-policy" className="text-gold underline underline-offset-4">
              payment policy
            </Link>{" "}
            and I understand that the order is confirmed only after payment verification. I will
            not share PINs or OTPs with anyone.
          </span>
        </label>
        {error ? <p className="text-sm text-gold-bright">{error}</p> : null}
        <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-60">
          {pending ? "Placing order…" : "Place order — we verify payment"}
        </button>
        <p className="text-center text-xs text-muted">
          This does not charge a card. You pay by bank transfer using the order reference.
        </p>
      </aside>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-[11px] tracking-[0.16em] text-gold uppercase">
      {label}
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full border border-[var(--line)] bg-ink px-3 py-2 text-sm tracking-normal text-cream normal-case"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right text-cream">{value}</dd>
    </div>
  );
}
