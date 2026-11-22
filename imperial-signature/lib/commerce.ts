export const SAMPLE_CATALOG_NOTICE =
  "Sample catalog. Products, prices and availability are placeholders until Imperial Signature publishes live inventory.";

export const deliveryOptions = [
  {
    id: "lagos",
    label: "Lagos delivery",
    feeNgn: 3500,
    detail:
      "Lagos Mainland and Island. Dispatch is scheduled after payment is verified — typically 2–5 working days from verification.",
  },
  {
    id: "nigeria",
    label: "Rest of Nigeria",
    feeNgn: 6500,
    detail:
      "Other Nigerian states. Dispatch is scheduled after payment is verified — typically 3–7 working days from verification.",
  },
  {
    id: "collection",
    label: "Collection by arrangement (Lagos)",
    feeNgn: 0,
    detail:
      "No delivery fee. Collection is offered only after we verify payment and confirm a collection slot with you.",
  },
] as const;

export type DeliveryOptionId = (typeof deliveryOptions)[number]["id"];

export function getDeliveryOption(id: string) {
  return deliveryOptions.find((option) => option.id === id) ?? null;
}

export const bankTransfer = {
  methodLabel: "Bank transfer",
  isPlaceholder: true,
  bankName: "Official bank name — to be published",
  accountName: "Imperial Signature",
  accountNumber: "Account number — to be published",
  warning:
    "These account details are placeholders for this preview. Do not send funds until Imperial Signature publishes official account details on this site or through our verified channels.",
  feeNote:
    "Imperial Signature does not add a surcharge for bank transfer. Your bank may apply its own charges; those charges are not set by us and are not included in the order total.",
} as const;

export const paymentRules = {
  fullPayment:
    "Full payment is required for standard purchases. Your order is received when you place it, but it is only confirmed after Imperial Signature verifies the payment in our official account.",
  noCardCapture:
    "v1 checkout is bank transfer only. We do not collect card numbers, PINs or OTPs on this site.",
  noPinOtp:
    "Imperial Signature will never ask for your banking PIN, password, OTP or card CVV.",
  verification:
    "Screenshots, debit alerts or transfer receipts help us locate a payment, but they do not confirm an order until the funds are verified.",
} as const;
