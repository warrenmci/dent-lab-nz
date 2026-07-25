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
  email: "info@dentlabnz.co.nz",
  /** TODO: replace with the real number — used in tel: links and JSON-LD. */
  phone: "+6400000000",
  phoneDisplay: "0800 DENTLAB",
  instagram: "https://www.instagram.com/dentlabnz",
  priceRange: "$$",
  /** Regions served — drives the coverage chips and areaServed in schema. */
  areasServed: [
    "Auckland",
    "Hamilton",
    "Tauranga",
    "Wellington",
    "Christchurch",
    "Waikato",
    "Bay of Plenty",
  ],
} as const;
