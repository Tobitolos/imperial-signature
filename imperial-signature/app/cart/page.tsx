import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your Imperial Signature sample order before checkout.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Bag</p>
      <h1 className="mt-4 font-display text-5xl text-cream">Cart</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Prices are in Nigerian Naira. Delivery and any fees are disclosed on the next step. Full
        payment is required; the order is confirmed only after we verify the transfer.
      </p>
      <div className="mt-10">
        <CartView />
      </div>
    </div>
  );
}
