import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { brand, contact } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${brand.name} in ${contact.city}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8">
      <div>
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Customer service</p>
        <h1 className="mt-4 font-display text-5xl text-cream">Contact</h1>
        <p className="mt-6 leading-8 text-muted">
          For orders, payment verification, cancellations or complaints, write to us with your
          order reference, payment date, amount and transaction identification.
        </p>
        <dl className="mt-10 space-y-4 text-sm">
          <div>
            <dt className="text-[11px] tracking-[0.18em] text-gold uppercase">Email</dt>
            <dd className="mt-1 text-cream">{contact.email}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] text-gold uppercase">Phone / WhatsApp</dt>
            <dd className="mt-1 text-cream">{contact.phone}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] text-gold uppercase">Studio</dt>
            <dd className="mt-1 text-cream">{contact.city}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] text-gold uppercase">Hours</dt>
            <dd className="mt-1 text-cream">{contact.hours}</dd>
          </div>
        </dl>
        <p className="mt-8 text-xs leading-6 text-gold-bright">
          These contact details are placeholders until Imperial Signature publishes official
          channels. We will never ask for a PIN, password or OTP.
        </p>
      </div>
      <div className="border border-[var(--line)] bg-ink-2 p-6">
        <h2 className="font-display text-3xl text-cream">Write to the house</h2>
        <p className="mt-3 text-sm text-muted">
          Payment disputes can also be taken to the FCCPC, your bank, or a competent court.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
