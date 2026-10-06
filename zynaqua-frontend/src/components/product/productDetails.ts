export type ProductTier = "aura" | "prime" | "premium";

export function getProductTier(productName: string): ProductTier {
  const n = productName.toLowerCase();
  if (n.includes("premium")) return "premium";
  if (n.includes("prime")) return "prime";
  return "aura";
}

export const PURIFICATION_BY_TIER: Record<ProductTier, string> = {
  aura: "RO + Alkaline",
  prime: "RO + UV + Alkaline",
  premium: "RO + UV + Copper + Zinc + Alkaline + Mineraliser",
};

const PURIFIER_HIGHLIGHT_BY_TIER: Record<ProductTier, string> = {
  aura: "Get pure drinking water with ISI certified RO technology. Enriched with essential minerals, including calcium and magnesium, and balanced with alkaline.",
  prime: "Get pure drinking water with ISI certified RO + UV technology. Enriched with essential minerals, including calcium and magnesium, and balanced with alkaline.",
  premium: "Get pure drinking water with ISI certified RO + UV technology. Enriched with essential minerals, including calcium and magnesium, and charged with copper, zinc and alkaline.",
};

const BASE_HIGHLIGHTS = [
  ["No Service for 2 Years", "Advanced multi-micron filtration and self-cleaning technology means filters last a full 2 years without any maintenance, AMC or service calls. Save up to ₹18500 on service costs over 8 years."],
  ["2-Year Unconditional Warranty", "All filters, membranes & electrical parts covered, irrespective of input water quality or consumption."],
  ["10-Stage Purifier", ""], // description filled per tier below
  ["Science-Backed Purity, No Half Measures", "Even low TDS water can hide metals and plastics. We eliminate traces of virus, bacteria and heavy metals with 100% RO processing, then restore essential minerals. No MTDS mixing, no RO bypassing either. Just safe remineralisation."],
  ["Advanced Multi-Layered Pre-Filter", "Captures all large sediment particles without clogging, maintaining optimal flow for the full 2-year filter life."],
  ["Complete Peace of Mind", "After 2 years, filters can be refreshed for ₹7,499/- which includes all filters, servicing cost and warranty renewal for the next 2 years."],
  ["Free Installation by zynaqua Company", "Professional installation at your preferred date and time. Additional pressure equipment may be required for certain installations (₹250-1750)."],
  ["10-Litre Storage", "Perfect capacity for a family of 4. The food-grade tank keeps water mineral-enriched and safe for consumption."],
  ["Works with All Water Sources", "Tanker, borewell, municipal and tap water - universal compatibility for any home."],
  ["Box Contents", "Water Purifier, Pre-filter, Power adapter, Installation kit, Spanner, Valve, Nipple, Taflon Tape"],
] as const;

export function getProductHighlights(tier: ProductTier): ReadonlyArray<readonly [string, string]> {
  return BASE_HIGHLIGHTS.map(([title, description]) =>
    title === "10-Stage Purifier"
      ? ([title, PURIFIER_HIGHLIGHT_BY_TIER[tier]] as const)
      : ([title, description] as const)
  );
}

export function getProductDetailSpecs(tier: ProductTier): ReadonlyArray<readonly [string, string]> {
  return [
    ["Brand", "Native by zynaqua"],
    ["Material", "Polypropylene"],
    ["Included Components", "Water Purifier, Installation Kit, External Sediment Filter, User Manual & Warranty Card"],
    ["Purification Method", PURIFICATION_BY_TIER[tier]],
    ["Special Feature", "Needs no service for 2 years"],
    ["Product Dimensions", "330L × 240W × 485H millimeter"],
    ["Other Special Features", "Unconditional for 2 years warranty"],
    ["Container Type", "Dispenser"],
    ["Installation Type", "Wall Mount"],
    ["Power Source Type", "Corded Electric"],
    ["Filter Life Cycle", "2 Years"],
  ];
}

// Which infographic shows on which model.
// CONFIRM the file ↔ content mapping below matches your actual files.
export const SPEC_IMAGES: ReadonlyArray<{
  src: string;
  alt: string;
  tiers: ReadonlyArray<ProductTier>;
}> = [
  { src: "/images/spec/spec1.webp", alt: "High-quality food grade, BPA free, lead free materials with coconut shell activated carbon", tiers: ["aura", "prime", "premium"] },
  { src: "/images/spec/spec2.webp", alt: "2 year filter life saves over ₹18,000 on filter replacements compared to other brands", tiers: ["aura", "prime", "premium"] },
  { src: "/images/spec/spec3.webp", alt: "Copper-Zinc infusion technology with controlled release", tiers: ["premium"] },
  { src: "/images/spec/spec4.webp", alt: "Advanced 5th generation mercury-free UV LED purification with 10 year life", tiers: ["prime", "premium"] },
  { src: "/images/spec/spec5.webp", alt: "Antioxidant benefits of mineral-rich water", tiers: ["aura", "prime", "premium"] },
];