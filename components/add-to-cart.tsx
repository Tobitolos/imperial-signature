"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { clothingSizes, type ClothingSize, type Product } from "@/lib/catalog";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const needsSize = product.category === "clothing";
  const [size, setSize] = useState<ClothingSize | "">("");
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  function submit(goToCart = false) {
    if (needsSize && !size) {
      setError("Select a size to continue.");
      return;
    }
    setError("");
    addItem(product.id, { size: needsSize ? (size as ClothingSize) : undefined });
    setAdded(true);
    if (goToCart) router.push("/cart");
  }

  return (
    <div className="space-y-5">
      {needsSize ? (
        <fieldset>
          <legend className="text-[11px] tracking-[0.22em] text-gold uppercase">Size</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {clothingSizes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSize(option);
                  setError("");
                }}
                className={`min-w-12 border px-3 py-2 text-sm tracking-[0.12em] ${
                  size === option
                    ? "border-gold bg-gold text-ink"
                    : "border-[var(--line)] text-cream hover:border-gold"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {product.volume ? (
        <p className="text-sm text-muted">Volume: {product.volume}</p>
      ) : null}

      {error ? <p className="text-sm text-gold-bright">{error}</p> : null}
      {added ? (
        <p className="text-sm text-cream/80">Added to cart. Sample catalog — not live stock.</p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={() => submit(false)} className="btn-gold flex-1">
          Add to cart
        </button>
        <button type="button" onClick={() => submit(true)} className="btn-ghost flex-1">
          Add and view cart
        </button>
      </div>
    </div>
  );
}
