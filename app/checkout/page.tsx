import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Place an Imperial Signature order for bank-transfer verification.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Pay by transfer</p>
      <h1 className="mt-4 font-display text-5xl text-cream">Checkout</h1>
      <p className="mt-4 max-w-2xl leading-8 text-muted">
        Read the{" "}
        <Link href="/payment-policy" className="text-gold underline underline-offset-4">
          payment policy
        </Link>{" "}
        before you place an order. v1 is bank transfer only: you place the order, we send a
        reference, you transfer the disclosed total, and the order is confirmed only after
        verification. We do not capture cards, PINs or OTPs.
      </p>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
