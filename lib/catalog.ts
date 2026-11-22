export const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type ClothingSize = (typeof clothingSizes)[number];

export type ProductCategory = "clothing" | "fragrance";

export type Product = {
  id: string;
  slug: string;
  category: ProductCategory;
  brand: string;
  name: string;
  priceNgn: number;
  sample: true;
  summary: string;
  description: string;
  details: string[];
  visual: string;
  sizes?: readonly ClothingSize[];
  volume?: string;
  notes?: {
    top: string[];
    heart: string[];
    base: string[];
  };
};

export const products: Product[] = [
  {
    id: "is-cl-obelisk-tee",
    slug: "obelisk-tee",
    category: "clothing",
    brand: "Imperial Signature",
    name: "The Obelisk Tee",
    priceNgn: 32000,
    sample: true,
    visual: "tee",
    sizes: clothingSizes,
    summary: "Heavyweight unisex jersey with gold-stitched neck tape.",
    description:
      "A clean, architectural tee cut for presence. Dense cotton holds its shape, with a slightly elongated hem and a gold-stitched neck that reads only at close range.",
    details: [
      "House line, unisex fit",
      "220gsm cotton jersey",
      "Gold-stitched interior neck tape",
      "Sample SKU — not live inventory",
    ],
  },
  {
    id: "is-cl-signature-oxford",
    slug: "signature-oxford",
    category: "clothing",
    brand: "Imperial Signature",
    name: "Signature Oxford Shirt",
    priceNgn: 58000,
    sample: true,
    visual: "shirt",
    sizes: clothingSizes,
    summary: "A precise oxford with a quiet gold inner placket.",
    description:
      "Cut to sit clean through the shoulder and taper without clinging. Wear open over the Obelisk Tee or closed for evening. The gold is a lining detail, never a logo shout.",
    details: [
      "House line, unisex fit",
      "Cotton oxford",
      "Hidden gold inner placket",
      "Sample SKU — not live inventory",
    ],
  },
  {
    id: "is-cl-noir-trouser",
    slug: "noir-tailored-trouser",
    category: "clothing",
    brand: "Imperial Signature",
    name: "Noir Tailored Trouser",
    priceNgn: 72000,
    sample: true,
    visual: "trousers",
    sizes: clothingSizes,
    summary: "Full-length tailored trouser with a soft crease.",
    description:
      "A straight, unisex trouser with enough drape to move and enough structure to hold a line. Intended as the house bottom for shirts, tees and the bomber.",
    details: [
      "House line, unisex fit",
      "Wool-blend suiting",
      "Hook, bar and concealed zip",
      "Sample SKU — not live inventory",
    ],
  },
  {
    id: "is-cl-goldline-hoodie",
    slug: "goldline-hoodie",
    category: "clothing",
    brand: "Imperial Signature",
    name: "Goldline Hoodie",
    priceNgn: 64000,
    sample: true,
    visual: "hoodie",
    sizes: clothingSizes,
    summary: "Brushed-back hoodie with a single gold drawcord tip.",
    description:
      "Relaxed through the body, set-in sleeves, and a double-layer hood. One gold aglet on the drawcord is the only ornament.",
    details: [
      "House line, unisex fit",
      "French terry",
      "Kangaroo pocket, rib cuff",
      "Sample SKU — not live inventory",
    ],
  },
  {
    id: "is-cl-harmattan-overshirt",
    slug: "harmattan-linen-overshirt",
    category: "clothing",
    brand: "Imperial Signature",
    name: "Harmattan Linen Overshirt",
    priceNgn: 78000,
    sample: true,
    visual: "overshirt",
    sizes: clothingSizes,
    summary: "Dry linen layer for Lagos heat and evening air.",
    description:
      "A mid-weight linen overshirt that works as a shirt or a light jacket. Washed for a lived-in hand, with horn-effect buttons and a single chest pocket.",
    details: [
      "House line, unisex fit",
      "European flax linen",
      "Corozo buttons",
      "Sample SKU — not live inventory",
    ],
  },
  {
    id: "is-cl-presence-bomber",
    slug: "presence-bomber",
    category: "clothing",
    brand: "Imperial Signature",
    name: "Presence Bomber",
    priceNgn: 128000,
    sample: true,
    visual: "bomber",
    sizes: clothingSizes,
    summary: "The house evening jacket — black, gold-lined, unisex.",
    description:
      "A compact bomber with a gold satin interior that only appears when you move. Rib collar, two-way zip, and a cut that sits over shirts or the hoodie.",
    details: [
      "House line, unisex fit",
      "Technical wool shell",
      "Gold satin lining",
      "Sample SKU — not live inventory",
    ],
  },
  {
    id: "is-fr-br540",
    slug: "baccarat-rouge-540",
    category: "fragrance",
    brand: "Maison Francis Kurkdjian",
    name: "Baccarat Rouge 540",
    priceNgn: 285000,
    sample: true,
    visual: "bottle-crystal",
    volume: "70ml Eau de Parfum",
    summary: "Saffron, amberwood and cedar — a luminous, long-wearing signature.",
    description:
      "A curated sample listing of an established house. Imperial Signature does not manufacture this fragrance; we intend to retail authentic stock from recognised distributors once live inventory is confirmed.",
    notes: {
      top: ["Saffron", "Jasmine"],
      heart: ["Amberwood", "Ambergris"],
      base: ["Fir resin", "Cedar"],
    },
    details: [
      "Curated from another brand — not a house scent",
      "Sample listing until live stock exists",
      "70ml Eau de Parfum",
    ],
  },
  {
    id: "is-fr-aventus",
    slug: "creed-aventus",
    category: "fragrance",
    brand: "Creed",
    name: "Aventus",
    priceNgn: 245000,
    sample: true,
    visual: "bottle-crest",
    volume: "50ml Eau de Parfum",
    summary: "Pineapple, birch, musk and oakmoss — bright fruit over smoke.",
    description:
      "A curated sample listing of an established house. Sold as a fragrance Imperial Signature intends to carry; not designed or bottled by us.",
    notes: {
      top: ["Pineapple", "Bergamot", "Blackcurrant", "Apple"],
      heart: ["Birch", "Patchouli", "Moroccan jasmine", "Rose"],
      base: ["Musk", "Oakmoss", "Ambergris", "Vanilla"],
    },
    details: [
      "Curated from another brand — not a house scent",
      "Sample listing until live stock exists",
      "50ml Eau de Parfum",
    ],
  },
  {
    id: "is-fr-sauvage",
    slug: "dior-sauvage",
    category: "fragrance",
    brand: "Dior",
    name: "Sauvage",
    priceNgn: 118000,
    sample: true,
    visual: "bottle-facet",
    volume: "60ml Eau de Parfum",
    summary: "Bergamot, Sichuan pepper and ambroxan — dry, mineral, modern.",
    description:
      "A curated sample listing. Imperial Signature will retail this as an authorised fragrance once supply is in place; this page is not a live offer to sell.",
    notes: {
      top: ["Bergamot", "Sichuan pepper"],
      heart: ["Lavender", "Star anise", "Nutmeg"],
      base: ["Ambroxan", "Vanilla", "Cedar"],
    },
    details: [
      "Curated from another brand — not a house scent",
      "Sample listing until live stock exists",
      "60ml Eau de Parfum",
    ],
  },
  {
    id: "is-fr-oud-wood",
    slug: "tom-ford-oud-wood",
    category: "fragrance",
    brand: "Tom Ford",
    name: "Oud Wood",
    priceNgn: 195000,
    sample: true,
    visual: "bottle-slab",
    volume: "50ml Eau de Parfum",
    summary: "Oud, rosewood and sandalwood — smoky, smooth, close to skin.",
    description:
      "A curated sample listing of Private Blend Oud Wood. Imperial Signature is a retailer of the house line, not the perfumer.",
    notes: {
      top: ["Oud", "Rosewood", "Cardamom"],
      heart: ["Sandalwood", "Vetiver"],
      base: ["Tonka bean", "Vanilla", "Amber"],
    },
    details: [
      "Curated from another brand — not a house scent",
      "Sample listing until live stock exists",
      "50ml Eau de Parfum",
    ],
  },
  {
    id: "is-fr-bleu",
    slug: "bleu-de-chanel",
    category: "fragrance",
    brand: "Chanel",
    name: "Bleu de Chanel",
    priceNgn: 145000,
    sample: true,
    visual: "bottle-navy",
    volume: "50ml Eau de Parfum",
    summary: "Citrus, labdanum and cedar — a composed, versatile blue.",
    description:
      "A curated sample listing. When live, Imperial Signature will sell authentic Chanel fragrance obtained through legitimate channels only.",
    notes: {
      top: ["Lemon", "Mint", "Pink pepper", "Grapefruit"],
      heart: ["Ginger", "Nutmeg", "Jasmine"],
      base: ["Incense", "Vetiver", "Cedar", "Sandalwood", "Labdanum"],
    },
    details: [
      "Curated from another brand — not a house scent",
      "Sample listing until live stock exists",
      "50ml Eau de Parfum",
    ],
  },
  {
    id: "is-fr-gypsy",
    slug: "byredo-gypsy-water",
    category: "fragrance",
    brand: "Byredo",
    name: "Gypsy Water",
    priceNgn: 165000,
    sample: true,
    visual: "bottle-clear",
    volume: "50ml Eau de Parfum",
    summary: "Bergamot, juniper, incense and vanilla — woody, airy, intimate.",
    description:
      "A curated sample listing from Byredo. Imperial Signature curates; we do not compose this scent.",
    notes: {
      top: ["Bergamot", "Lemon", "Pepper", "Juniper berries"],
      heart: ["Incense", "Orris", "Pine needles"],
      base: ["Vanilla", "Sandalwood", "Amber"],
    },
    details: [
      "Curated from another brand — not a house scent",
      "Sample listing until live stock exists",
      "50ml Eau de Parfum",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function productsIn(category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category);
}

export function featuredProducts(): Product[] {
  return [
    getProduct("presence-bomber")!,
    getProduct("baccarat-rouge-540")!,
    getProduct("signature-oxford")!,
    getProduct("creed-aventus")!,
  ];
}
