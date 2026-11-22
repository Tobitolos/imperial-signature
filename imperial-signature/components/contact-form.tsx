"use client";

import { useState } from "react";
import { contact } from "@/lib/brand";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border border-gold/40 p-6 text-sm leading-7 text-muted">
        Message recorded on this device for the preview. Live enquiries should use{" "}
        <span className="text-cream">{contact.email}</span> once that address is published. If you
        have an order, include the order reference.
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <label className="block text-[11px] tracking-[0.16em] text-gold uppercase">
        Name
        <input required className="mt-2 w-full border border-[var(--line)] bg-ink px-3 py-2 text-sm text-cream normal-case tracking-normal" />
      </label>
      <label className="block text-[11px] tracking-[0.16em] text-gold uppercase">
        Email
        <input type="email" required className="mt-2 w-full border border-[var(--line)] bg-ink px-3 py-2 text-sm text-cream normal-case tracking-normal" />
      </label>
      <label className="block text-[11px] tracking-[0.16em] text-gold uppercase">
        Order reference (if any)
        <input className="mt-2 w-full border border-[var(--line)] bg-ink px-3 py-2 text-sm text-cream normal-case tracking-normal" />
      </label>
      <label className="block text-[11px] tracking-[0.16em] text-gold uppercase">
        Message
        <textarea required rows={5} className="mt-2 w-full border border-[var(--line)] bg-ink px-3 py-2 text-sm text-cream normal-case tracking-normal" />
      </label>
      <button type="submit" className="btn-gold">
        Send message
      </button>
      <p className="text-xs text-muted">
        Preview form only — it does not email the house until official channels are live.
      </p>
    </form>
  );
}
