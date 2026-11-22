import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderReceipt } from "@/components/order-receipt";

export const metadata: Metadata = {
  title: "Order received",
  description: "Your Imperial Signature order is awaiting payment verification.",
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <Suspense fallback={<p className="text-muted">Loading order {reference}…</p>}>
        <OrderReceipt />
      </Suspense>
    </div>
  );
}
