import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & refunds",
  description:
    "Imperial Signature does not operate a blanket no-refund policy. Returns follow Nigerian consumer law and the payment policy.",
};

export default function ReturnsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Article VII, in practice</p>
      <h1 className="mt-4 font-display text-5xl text-cream">Returns & refunds</h1>
      <p className="mt-8 text-lg leading-8 text-muted">
        Imperial Signature does not operate a blanket no-refund policy. Refunds are considered and
        processed where Nigerian law requires them — including defective, unsafe, unsuitable or
        materially misrepresented goods, or other qualifying breaches of the purchase agreement.
      </p>

      <section className="mt-12 space-y-5 text-base leading-8 text-muted">
        <h2 className="font-display text-3xl text-cream">If the goods are not as agreed</h2>
        <p>
          Contact us with your order reference, a description of the issue, and photographs where
          they help. We will acknowledge and investigate. Refunds that are due will not be
          unreasonably withheld.
        </p>
        <p>
          Approved refunds are ordinarily returned through the original payment channel or another
          mutually agreed, verifiable method. Our target is 5–10 business days after approval,
          subject to the bank or payment provider. If a delay is likely, we will tell you.
        </p>
      </section>

      <section className="mt-12 space-y-5 text-base leading-8 text-muted">
        <h2 className="font-display text-3xl text-cream">Change of mind</h2>
        <p>
          Where a product matches the agreed description and quality and you simply change your
          mind, any voluntary return is considered case by case. Conditions will be disclosed
          before purchase once live stock exists. Unworn clothing with tags and unopened fragrance
          may be easier to re-sell; opened fragrance and worn garments may not be accepted as a
          voluntary return.
        </p>
      </section>

      <section className="mt-12 space-y-5 text-base leading-8 text-muted">
        <h2 className="font-display text-3xl text-cream">Cancellations</h2>
        <p>
          Tell us as soon as you wish to cancel. Requests made before we process or procure the
          order are considered on the circumstances of the transaction. If work has already begun,
          only reasonable and lawful costs already incurred may be deducted. Any cancellation
          charge must be reasonable, transparent and consistent with consumer protection law.
        </p>
      </section>

      <p className="mt-12 text-sm leading-7 text-muted">
        This page does not exclude rights under Nigerian law. You may also approach the FCCPC, your
        financial institution, or a competent court. See the full{" "}
        <Link href="/payment-policy" className="text-gold underline underline-offset-4">
          payment policy
        </Link>
        .
      </p>
    </article>
  );
}
