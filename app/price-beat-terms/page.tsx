import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import logo from "../../assets/dentlabnz_logo.png";

const SECTION = "mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-10 xl:max-w-6xl";

export const metadata: Metadata = {
  title: "10% Price Beat Guarantee Terms and Conditions",
  description:
    "Terms and conditions for the DentLabNZ 10% Price Beat Guarantee on eligible paintless dent removal repairs.",
  alternates: {
    canonical: "/price-beat-terms",
  },
};

const TERMS: { title: string; intro?: string; items: string[] }[] = [
  {
    title: "Valid competitor quotes",
    items: [
      "The competing quote must be provided in writing by a genuine, independent business that offers professional dent repair services.",
      "The quote must be current, dated within the previous 14 days, and valid at the time the price-beat request is made.",
      "DentLabNZ may request a copy of the original written quote to verify its authenticity and scope.",
      "Quotes must identify the repair work being offered and the total price payable, including GST and any applicable fees.",
      "Altered, incomplete, misleading or unverifiable quotes will not qualify.",
    ],
  },
  {
    title: "Like-for-like repairs",
    items: [
      "The competing quote must cover substantially the same repair scope, including the same vehicle or property, panels or affected areas, and comparable damage.",
      "The competing service must be a genuine alternative to the PDR service offered by DentLabNZ.",
      "Quotes for panel beating, conventional body repairs, panel replacement, repainting, temporary repairs or other materially different repair methods are excluded unless DentLabNZ confirms in writing that the services are comparable.",
      "Any differences in repair quality, finish, access requirements or included services may affect eligibility.",
    ],
  },
  {
    title: "Excluded offers",
    intro: "The price-beat guarantee does not apply to:",
    items: [
      "Insurance excess offers, insurance claim settlements or insurer-negotiated rates.",
      "Trade, fleet, wholesale, staff, loyalty, referral or other special-discount pricing that is not generally available to the public.",
      "Auction listings, online advertisements, indicative prices, estimates or verbal quotes.",
      "Promotional offers, vouchers, rebates or bundled deals where the comparable standalone repair price cannot be verified.",
      "Quotes from related businesses or businesses not independently offering the quoted service.",
    ],
  },
  {
    title: "Inspection and repair suitability",
    items: [
      "All repairs remain subject to DentLabNZ assessing the damage and confirming that PDR is a suitable repair method.",
      "Photographs may be used for an initial assessment, but DentLabNZ may require an in-person inspection before confirming its final price.",
      "If an inspection identifies damage, access limitations or repair requirements that materially differ from the information supplied, DentLabNZ may revise its proposed price or decline the price-beat request before the customer accepts the quote.",
      "No repair will proceed at a revised price without the customer's agreement.",
    ],
  },
  {
    title: "Price calculation",
    items: [
      "The 10% reduction is calculated from the verified competitor's comparable total price, including GST and applicable mandatory charges.",
      "For example, if an eligible competitor quote is $500 including GST, DentLabNZ's price would be $450 including GST.",
      "The price-beat guarantee applies only to the eligible repair scope identified in the competing quote.",
      "Any additional repairs, damage discovered outside the agreed scope, optional services or customer-requested variations are excluded from the comparison and will be quoted separately.",
    ],
  },
  {
    title: "Claim process",
    items: [
      "Customers must submit the competing written quote to DentLabNZ before accepting a DentLabNZ quote or authorising work to commence.",
      "DentLabNZ may contact the competing business to verify the quote, where reasonably necessary and with appropriate regard to customer privacy.",
      "Customers must provide accurate information and must not misrepresent the competing offer.",
      "DentLabNZ reserves the right to decline a claim where the eligibility requirements are not met or the quote cannot reasonably be verified.",
    ],
  },
  {
    title: "Availability and limitations",
    items: [
      "The guarantee is available for eligible repairs undertaken by DentLabNZ within its service area, subject to scheduling and repair suitability.",
      "The guarantee cannot be combined with another DentLabNZ discount, promotion or special offer unless agreed in writing.",
      "The guarantee has no cash value and cannot be exchanged for a refund, credit or other benefit after the repair has been completed.",
      "DentLabNZ may update or withdraw the promotion for future claims. Any eligible claim already accepted in writing will be honoured in accordance with the agreed terms.",
    ],
  },
  {
    title: "Consumer rights",
    items: [
      "Nothing in these terms and conditions excludes, restricts or modifies any rights or remedies that customers have under applicable New Zealand law, including the Consumer Guarantees Act 1993 and Fair Trading Act 1986.",
      "By requesting the DentLabNZ 10% Price Beat Guarantee, the customer agrees to provide the information reasonably required to assess eligibility.",
    ],
  },
];

export default function PriceBeatTerms() {
  return (
    <main className="bg-background text-foreground">
      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-white/8 bg-[#111111]/90 backdrop-blur">
        <div
          className={`${SECTION} relative flex h-22 items-center justify-between min-[360px]:h-26 sm:h-30 xl:h-38`}
        >
          <Link
            href="/"
            className="text-xs font-medium uppercase tracking-[0.18em] text-white/60 transition hover:text-white"
          >
            ← Home
          </Link>

          <Link
            href="/"
            aria-label="DentLabNZ home"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <Image
              src={logo}
              alt="DentLabNZ"
              className="h-16 w-auto min-[360px]:h-20 sm:h-24 xl:h-32"
              priority
            />
          </Link>

          <Link
            href="/#contact"
            className="ml-auto inline-flex items-center rounded-lg bg-[var(--accent)] px-3 py-2 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-black transition hover:brightness-110 sm:px-4 sm:text-xs"
          >
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Free quote</span>
          </Link>
        </div>
      </nav>

      {/* ── Terms ───────────────────────────────────────────── */}
      <section className="border-b border-white/8">
        <div className={`${SECTION} py-16 sm:py-18 lg:py-20`}>
          <div className="mx-auto max-w-3xl space-y-10">
            <header className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Terms and conditions
              </p>
              <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                DentLabNZ 10% Price Beat Guarantee
              </h1>
              <p className="text-sm leading-relaxed text-white/60">
                DentLabNZ is committed to offering competitive pricing for
                quality Paintless Dent Removal (PDR). If you receive a lower
                written quote from a competing business for the same eligible
                repair, we will aim to beat that quote by 10%, subject to the
                following terms and conditions.
              </p>
            </header>

            <ol className="space-y-6">
              {TERMS.map((section, i) => (
                <li
                  key={section.title}
                  className="rounded-xl border border-white/8 bg-[#1a1a1a] p-5 sm:p-6"
                >
                  <h2 className="flex items-baseline gap-3 text-base font-semibold text-white sm:text-lg">
                    <span className="text-[var(--accent)]">{i + 1}.</span>
                    {section.title}
                  </h2>
                  {section.intro && (
                    <p className="mt-3 text-sm text-white/60">
                      {section.intro}
                    </p>
                  )}
                  <ul className="mt-3 space-y-2.5">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-white/60"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <SiteFooter sectionClass={SECTION} />
    </main>
  );
}
