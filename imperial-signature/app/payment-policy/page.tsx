import type { Metadata } from "next";
import Link from "next/link";
import {
  paymentPolicyArticles,
  paymentPolicyIntro,
  paymentPolicyUpdated,
} from "@/lib/payment-policy";

export const metadata: Metadata = {
  title: "Payment policy",
  description:
    "Imperial Signature payment policy: bank transfer, full payment, verification before confirmation, and refunds under Nigerian law.",
};

export default function PaymentPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Nigeria · FCCPC rights reserved</p>
      <h1 className="mt-4 font-display text-5xl text-cream">Payment policy</h1>
      <p className="mt-3 text-sm text-muted">Last reviewed {paymentPolicyUpdated}</p>
      <div className="mt-8 space-y-5 text-base leading-8 text-muted">
        {paymentPolicyIntro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-6 text-sm text-gold-bright">
        v1 of this site accepts bank transfer only. Official account details are still placeholders.
        We never ask for PINs, passwords or OTPs.{" "}
        <Link href="/returns" className="underline underline-offset-4">
          Returns and refunds
        </Link>{" "}
        sit alongside this policy.
      </p>
      <div className="mt-12 space-y-12">
        {paymentPolicyArticles.map((article) => (
          <section key={article.title}>
            <h2 className="font-display text-3xl text-cream">{article.title}</h2>
            <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-muted">
              {article.paragraphs.map((paragraph) => (
                <li key={paragraph}>{paragraph}</li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </article>
  );
}
