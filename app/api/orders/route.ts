import { NextResponse } from "next/server";
import { getProductById } from "@/lib/catalog";
import { getDeliveryOption } from "@/lib/commerce";
import {
  createOrderReference,
  type CustomerDetails,
  type PlaceOrderInput,
  type PlacedOrder,
} from "@/lib/orders";

const MAX_ITEMS = 20;
const MAX_QTY = 10;
const MAX_TEXT = 400;

function asString(value: unknown, max = MAX_TEXT): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const payload = body as Partial<PlaceOrderInput> & {
    customer?: Partial<CustomerDetails>;
  };

  if (payload.acceptedPaymentPolicy !== true) {
    return NextResponse.json(
      { error: "Please read and accept the payment policy before placing an order." },
      { status: 400 },
    );
  }

  const delivery = getDeliveryOption(String(payload.deliveryId ?? ""));
  if (!delivery) {
    return NextResponse.json({ error: "Choose a delivery option." }, { status: 400 });
  }

  const customer: CustomerDetails = {
    fullName: asString(payload.customer?.fullName, 120),
    email: asString(payload.customer?.email, 160).toLowerCase(),
    phone: asString(payload.customer?.phone, 40),
    address: asString(payload.customer?.address, 240),
    city: asString(payload.customer?.city, 80),
    state: asString(payload.customer?.state, 80),
    notes: asString(payload.customer?.notes, 400) || undefined,
  };

  if (
    customer.fullName.length < 2 ||
    !isEmail(customer.email) ||
    customer.phone.length < 8 ||
    customer.address.length < 6 ||
    customer.city.length < 2 ||
    customer.state.length < 2
  ) {
    return NextResponse.json(
      { error: "Please complete your name, email, phone and delivery details." },
      { status: 400 },
    );
  }

  const rawItems = Array.isArray(payload.items) ? payload.items.slice(0, MAX_ITEMS) : [];
  if (rawItems.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const items: PlacedOrder["items"] = [];
  for (const raw of rawItems) {
    const product = getProductById(String(raw?.productId ?? ""));
    const quantity = Number(raw?.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY) {
      return NextResponse.json({ error: "One or more cart items are invalid." }, { status: 400 });
    }
    if (product.category === "clothing") {
      const size = String(raw?.size ?? "");
      if (!product.sizes?.includes(size as never)) {
        return NextResponse.json(
          { error: `Choose a size for ${product.name}.` },
          { status: 400 },
        );
      }
      items.push({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        size: size as PlacedOrder["items"][number]["size"],
        quantity,
        unitPriceNgn: product.priceNgn,
        lineTotalNgn: product.priceNgn * quantity,
      });
    } else {
      items.push({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        quantity,
        unitPriceNgn: product.priceNgn,
        lineTotalNgn: product.priceNgn * quantity,
      });
    }
  }

  const subtotalNgn = items.reduce((sum, item) => sum + item.lineTotalNgn, 0);
  const order: PlacedOrder = {
    reference: createOrderReference(),
    status: "awaiting_payment_verification",
    createdAt: new Date().toISOString(),
    customer,
    items,
    subtotalNgn,
    deliveryId: delivery.id,
    deliveryLabel: delivery.label,
    deliveryFeeNgn: delivery.feeNgn,
    totalNgn: subtotalNgn + delivery.feeNgn,
    paymentMethod: "bank_transfer",
    confirmed: false,
  };

  return NextResponse.json({ order });
}
