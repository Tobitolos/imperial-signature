import type { ClothingSize } from "./catalog";
import type { DeliveryOptionId } from "./commerce";

export type OrderStatus = "awaiting_payment_verification";

export type OrderItem = {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  size?: ClothingSize;
  quantity: number;
  unitPriceNgn: number;
  lineTotalNgn: number;
};

export type CustomerDetails = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  notes?: string;
};

export type PlacedOrder = {
  reference: string;
  status: OrderStatus;
  createdAt: string;
  customer: CustomerDetails;
  items: OrderItem[];
  subtotalNgn: number;
  deliveryId: DeliveryOptionId;
  deliveryLabel: string;
  deliveryFeeNgn: number;
  totalNgn: number;
  paymentMethod: "bank_transfer";
  confirmed: false;
};

export function createOrderReference(now = new Date()): string {
  const stamp = now.toISOString().slice(0, 10).replaceAll("-", "");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  for (const byte of bytes) {
    suffix += alphabet[byte % alphabet.length];
  }
  return `IS-${stamp}-${suffix}`;
}

export type PlaceOrderInput = {
  customer: CustomerDetails;
  items: { productId: string; quantity: number; size?: ClothingSize }[];
  deliveryId: DeliveryOptionId;
  acceptedPaymentPolicy: boolean;
};
