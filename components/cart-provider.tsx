"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { ClothingSize } from "@/lib/catalog";
import {
  CART_STORAGE_KEY,
  cartSubtotal,
  hydrateCart,
  lineKey,
  parseCart,
  type CartLine,
} from "@/lib/cart";

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotalNgn: number;
  hydrated: boolean;
  addItem: (productId: string, options?: { size?: ClothingSize; quantity?: number }) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const EMPTY: CartLine[] = [];
const listeners = new Set<() => void>();
let snapshotRaw = "[]";
let snapshotLines: CartLine[] = EMPTY;

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readSnapshot(): CartLine[] {
  const raw = window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]";
  if (raw === snapshotRaw) return snapshotLines;
  snapshotRaw = raw;
  snapshotLines = parseCart(raw);
  return snapshotLines;
}

function writeCart(lines: CartLine[]) {
  snapshotRaw = JSON.stringify(lines);
  snapshotLines = lines;
  window.localStorage.setItem(CART_STORAGE_KEY, snapshotRaw);
  emit();
}

function getServerSnapshot() {
  return EMPTY;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, readSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const addItem = useCallback(
    (productId: string, options?: { size?: ClothingSize; quantity?: number }) => {
      const incoming: CartLine = {
        productId,
        quantity: options?.quantity ?? 1,
        size: options?.size,
      };
      const current = readSnapshot();
      const key = lineKey(incoming);
      const existing = current.find((line) => lineKey(line) === key);
      writeCart(
        existing
          ? current.map((line) =>
              lineKey(line) === key
                ? { ...line, quantity: Math.min(line.quantity + incoming.quantity, 10) }
                : line,
            )
          : [...current, incoming],
      );
    },
    [],
  );

  const setQuantity = useCallback((key: string, quantity: number) => {
    writeCart(
      readSnapshot()
        .map((line) =>
          lineKey(line) === key ? { ...line, quantity: Math.min(Math.max(quantity, 0), 10) } : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    writeCart(readSnapshot().filter((line) => lineKey(line) !== key));
  }, []);

  const clearCart = useCallback(() => writeCart([]), []);

  const value = useMemo<CartContextValue>(() => {
    const valid = hydrateCart(lines).map((entry) => entry.line);
    return {
      lines: valid,
      itemCount: valid.reduce((sum, line) => sum + line.quantity, 0),
      subtotalNgn: cartSubtotal(valid),
      hydrated,
      addItem,
      setQuantity,
      removeLine,
      clearCart,
    };
  }, [lines, hydrated, addItem, setQuantity, removeLine, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
