/**
 * Single source of truth for business details (NAP) and site URL.
 *
 * Local SEO depends on the name / address / phone being byte-identical
 * everywhere Google sees them — page copy, JSON-LD, Google Business Profile,
 * and directory listings. Keep them here, not inlined in components.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dentlabnz.co.nz"
).replace(/\/$/, "");

export const BUSINESS = {
  name: "DentLab NZ",
  legalName: "DentLab NZ",
  tagline: "Paintless Dent Removal Specialists",
  email: "dentlabnz@gmail.com",
  phone: "+64204457065",
  phoneDisplay: "+64 20 445 7065",
  instagram: "https://www.instagram.com/dentlabnz",
  priceRange: "$$",
  areasServed: [
    "Hamilton",
    "Tauranga",
    "Waikato",
    "Bay of Plenty",
  ],
} as const;
