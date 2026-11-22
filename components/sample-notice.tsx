import { SAMPLE_CATALOG_NOTICE } from "@/lib/commerce";

export function SampleNotice({ className = "" }: { className?: string }) {
  return (
    <p
      className={`border border-[var(--line)] bg-[rgba(201,169,98,0.06)] px-4 py-3 text-xs tracking-[0.14em] text-gold-bright uppercase ${className}`}
    >
      {SAMPLE_CATALOG_NOTICE}
    </p>
  );
}
