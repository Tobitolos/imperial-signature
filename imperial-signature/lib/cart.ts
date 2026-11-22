import { clothingSizes, getProductById, type ClothingSize, type Product } from "./catalog";

export const CART_STORAGE_KEY = "imperial-signature-cart-v1";
export const ORDER_STORAGE_KEY = "imperial-signature-last-order-v1";

export type CartLine = {
  productId: string;
  quantity: number;
  size?: ClothingSize;
};

export function lineKey(line: CartLine): string {
  return line.size ? `${line.productId}:${line.size}` : line.productId;
}

export function parseCart(raw: string): CartLine[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const lines: CartLine[] = [];
    for (const entry of parsed) {
      if (!entry || typeof entry !== "object") continue;
      const productId = String((entry as CartLine).productId ?? "");
      const quantity = Number((entry as CartLine).quantity);
      if (!productId || !Number.isInteger(quantity) || quantity < 1) continue;
      const line: CartLine = { productId, quantity: Math.min(quantity, 10) };
      const size = (entry as CartLine).size;
      if (size && clothingSizes.includes(size)) line.size = size;
      lines.push(line);
    }
    return lines;
  } catch {
    return [];
  }
}

export function hydrateCart(lines: CartLine[]): {
  line: CartLine;
  product: Product;
  lineTotalNgn: number;
}[] {
  return lines
    .map((line) => {
      const product = getProductById(line.productId);
      if (!product) return null;
      return {
        line,
        product,
        lineTotalNgn: product.priceNgn * line.quantity,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
}

export function cartSubtotal(lines: CartLine[]): number {
  return hydrateCart(lines).reduce((sum, entry) => sum + entry.lineTotalNgn, 0);
}
