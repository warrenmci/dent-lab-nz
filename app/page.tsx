import Image from "next/image";
import Link from "next/link";
import { QuoteForm } from "./components/QuoteForm";
import InstagramFeed from "./components/InstagramFeed";
import { SiteFooter } from "./components/SiteFooter";
import { BlogCard } from "./components/BlogCard";
import { BLOG_POSTS } from "@/lib/blog";
// Trimmed, transparent build of the brand mark, derived from the supplied
// JPEG (kept alongside as dentlabnz_logo_dont_use.jpg). The JPEG's solid
// black field is keyed out to alpha, so the mark can cross the nav divider
// and sit on any surface without dragging a black rectangle behind it.
// This is the single logo source for the whole site, header and footer.
import logo from "../assets/dentlabnz_logo.png";
// Circular badge, cut out of price_beat.jpg so the gold seal sits on the
// page background with no black square around it.
import priceBeat from "../assets/price_beat.png";
import feature1Before from "../assets/feature_1_dent_before.jpg";
import feature1After from "../assets/feature_1_dent_after.jpg";
import feature2Before from "../assets/feature_2_dent_before.jpg";
import feature2After from "../assets/feature_2_dent_after.jpg";
import doorDings from "../assets/door_dings_1.jpg";
import creaseDamage from "../assets/crease_dmg_1.jpg";
import hailDamage from "../assets/hail_damage_1.jpg";
import garageDoorDamage from "../assets/garage_door_damage_1.jpg";

const SECTION = "mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-10 xl:max-w-6xl";

const NAV_LINK =
  "text-xs font-medium uppercase tracking-[0.18em] text-white/60 transition hover:text-white";

const FEATURE_PAIRS = [
  {
    before: feature1Before,
    beforeAlt: "Dent in a red vehicle's rear quarter panel before paintless dent removal",
    after: feature1After,
    afterAlt: "Same red panel after paintless dent removal, factory finish restored",
  },
  {
    before: feature2Before,
    beforeAlt: "Dent above the wheel arch of a silver vehicle before paintless dent removal",
    after: feature2After,
    afterAlt: "Same silver panel after paintless dent removal, factory finish restored",
  },
];

const SERVICES = [
  {
    title: "Door Dings & Parking Dents",
    desc: "The most common vehicle damage, caused by car doors, shopping trolleys, or tight car parks. We restore the panel to factory condition without touching the paint.",
    detail: "Most repairs completed in under 2 hours",
    image: doorDings,
  },
  {
    title: "Crease & Sharp Dent Repair",
    desc: "More complex damage with a defined edge or crease requires specialist technique. We assess each dent individually and advise honestly on what PDR can achieve.",
    detail: "Free assessment on complex repairs",
    image: creaseDamage,
  },
  {
    title: "Hail Damage Repair",
    desc: "A hailstorm can leave dozens of dents across every panel. Our technicians work methodically panel by panel, bringing your vehicle back to pre-storm condition.",
    detail: "Insurance claims supported",
    image: hailDamage,
  },
  {
    title: "Garage Door Repairs",
    desc: "A dented steel garage door panel responds to the same techniques we use on vehicles. We work the metal back into line, so there is no need to replace the section or repaint it.",
    detail: "No panel replacement needed",
    image: garageDoorDamage,
  },
];

const BENEFITS = [
  {
    label: "Factory finish preserved",
    body: "Your original paint is never touched. No repainting, no filler, no colour-match risk.",
  },
  {
    label: "Up to 70% cheaper",
    body: "PDR costs a fraction of traditional panel and paint repair for the same result, or better.",
  },
  {
    label: "Faster turnaround",
    body: "Most repairs are completed the same day. No waiting weeks for a panel shop slot.",
  },
  {
    label: "Resale value protected",
    body: "Original paint with no repair history commands higher resale prices. We keep your vehicle's record clean.",
  },
  {
    label: "Insurance friendly",
    body: "We work alongside insurance companies and can assist with the claims process.",
  },
  {
    label: "No harmful chemicals",
    body: "PDR is a purely mechanical process. No solvents, no fillers, no environmental waste.",
  },
];

const FAQS = [
  {
    q: "What is paintless dent removal (PDR)?",
    a: "PDR is a specialist technique that uses precision tools to gently push dented metal back to its original shape from behind the panel, without any repainting or filler. It preserves your vehicle's factory paint and finish.",
  },
  {
    q: "What types of dents can be repaired with PDR?",
    a: "PDR works best on round dents with no paint damage: door dings, hail dents, minor panel dents. Sharp creases and dents with cracked or chipped paint may need a different approach. We'll always give you an honest assessment.",
  },
  {
    q: "How much does paintless dent removal cost in NZ?",
    a: "Pricing depends on the size, depth and location of the dent. A single door ding typically starts from $100 + GST. Hail damage and fleet work is priced per vehicle. Contact us for a free quote.",
  },
  {
    q: "Will the dent come back after repair?",
    a: "No. Once the metal is correctly restored to its original position, it holds permanently. The repair is as durable as the original panel.",
  },
  {
    q: "Do you offer mobile PDR service?",
    a: "Yes. We can travel to your home, office, or dealership. Contact us to discuss mobile service availability in your area.",
  },
  {
    q: "Can you help with insurance claims?",
    a: "Yes. We work with major NZ insurers and can assist you with the claims process for hail and collision damage.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      {/* FAQ rich results, generated from the same FAQS array rendered below,
          so the markup and the schema can never drift apart. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* ── Nav ─────────────────────────────────────────────── */}
      {/* The bar is as tall as the logo it carries: each height below is the
          logo height at that breakpoint plus even breathing room above and
          below, so the mark sits fully inside a single flat header. */}
      <nav className="sticky top-0 z-50 border-b border-white/8 bg-[#111111]/90 backdrop-blur">
        <div
          className={`${SECTION} relative flex h-22 items-center justify-between min-[360px]:h-26 sm:h-30 xl:h-38`}
        >
          {/* Section links, left. Below lg there is not enough room between
              them and the centred logo, so they give way to the logo. */}
          <div className="hidden items-center gap-6 lg:flex">
            <a href="#our-work" className={NAV_LINK}>
              Our work
            </a>
            <a href="#services" className={NAV_LINK}>
              Services
            </a>
            <a href="#why-pdr" className={NAV_LINK}>
              Why PDR
            </a>
            <a href="#faq" className={NAV_LINK}>
              FAQ
            </a>
            <Link href="/blog" className={NAV_LINK}>
              Blog
            </Link>
          </div>

          {/* Centred logo, absolutely placed so it centres on the viewport
              rather than on the space left over by the links and button. */}
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

          {/* Call to action, right. Shortened on small screens so it never
              crowds the logo. */}
          <a
            href="#contact"
            className="ml-auto inline-flex items-center rounded-lg bg-[var(--accent)] px-3 py-2 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-black transition hover:brightness-110 sm:px-4 sm:text-xs"
          >
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Free quote</span>
          </a>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/8">
        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Yellow glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.07] blur-[120px]" />

        <div className={`${SECTION} py-20 sm:py-24 lg:py-32`}>
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div className="space-y-7">
              <div className="space-y-4">
                {/* The service on its own line, then the area and promise
                    one size down. */}
                <h1 className="text-balance font-bold tracking-tight">
                  <span className="block text-[2.25rem] leading-[1.08] sm:text-[2.875rem] lg:text-[3.625rem]">
                    Paintless Dent Removal
                  </span>
                  <span className="mt-3 block text-xl leading-snug sm:text-2xl lg:text-3xl">
                    Tauranga, Bay of Plenty &amp; Waikato.{" "}
                    <span className="text-[var(--accent)]">
                      No paint. No filler.
                    </span>
                  </span>
                </h1>
                {/* Intro, with the price beat seal floated into the second
                    paragraph so the copy runs above, beside and beneath it.
                    shape-outside makes the lines follow the badge's curve. */}
                <div className="flow-root">
                  <div className="max-w-xl space-y-3 text-pretty text-sm sm:text-base text-white/60">
                    <p>
                      We repair car park dents, door dings, hail damage and
                      other suitable dents without repainting the panel,
                      helping customers avoid unnecessary panel replacement
                      and traditional paint repairs where paintless dent
                      removal is appropriate.
                    </p>
                    <p>
                      <Image
                        src={priceBeat}
                        alt="Guaranteed price beat. Show us a written quote from another repairer and we will beat it by 10 percent. Valid written competitor quotes only, terms and conditions apply."
                        className="float-right ml-4 h-32 w-auto drop-shadow-[0_10px_30px_rgba(240,197,0,0.25)] [shape-margin:0.5rem] [shape-outside:circle(50%)] sm:h-40 lg:h-48 xl:h-52"
                        priority
                      />
                      We offer free, no-obligation quotes and a mobile service
                      at your home or workplace. Found a cheaper qualifying
                      written quote? We&apos;ll beat it by 10%, subject to our{" "}
                      <Link
                        href="/price-beat-terms"
                        className="underline underline-offset-4 transition hover:text-white"
                      >
                        price-beat terms
                      </Link>
                      .
                    </p>
                    <p>
                      <a
                        href="#contact"
                        className="underline underline-offset-4 transition hover:text-white"
                      >
                        Contact DentLabNZ
                      </a>{" "}
                      to send photos of your damage and arrange an assessment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust bar */}
              <div className="flex flex-wrap gap-5 pt-2">
                {[
                  "No repainting",
                  "Factory finish preserved",
                  "Insurance supported",
                  "Mobile service available",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <svg
                      className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
                    </svg>
                    <span className="text-xs text-white/50">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero card */}
            {/*
            <div className="relative">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent blur-2xl" />
              <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 shadow-2xl">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]/70">
                  PDR vs Traditional repair
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    ["Turnaround", "Same day", "1 to 2 weeks"],
                    ["Paint touched?", "Never", "Yes, repainted"],
                    ["Cost", "From $100+", "From $500+"],
                    ["Resale impact", "None", "Repair on record"],
                    ["Finish quality", "Factory original", "Colour-matched"],
                  ].map(([label, pdr, trad]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-2 rounded-lg bg-white/4 px-3 py-2.5"
                    >
                      <span className="text-[0.7rem] font-medium text-white/40">
                        {label}
                      </span>
                      <span className="text-[0.75rem] font-semibold text-[var(--accent)]">
                        {pdr}
                      </span>
                      <span className="text-[0.7rem] text-white/35 line-through">
                        {trad}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg bg-[var(--accent)]/10 px-3 py-2.5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    PDR saves up to 70% vs traditional body repair
                  </p>
                </div>
              </div>
            </div>
            */}

            {/* Hero card, before and after */}
            <div className="relative">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent blur-2xl" />
              <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 shadow-2xl">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]/70">
                  Before &amp; after
                </p>
                <div className="mt-4 space-y-4">
                  {FEATURE_PAIRS.map((pair) => (
                    <div key={pair.beforeAlt} className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white/4">
                          <Image
                            src={pair.before}
                            alt={pair.beforeAlt}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 20vw, 45vw"
                          />
                        </div>
                        <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                          Before
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white/4">
                          <Image
                            src={pair.after}
                            alt={pair.afterAlt}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 20vw, 45vw"
                          />
                        </div>
                        <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                          After
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our work (Instagram) ────────────────────────────── */}
      <InstagramFeed
        limit={12}
        id="our-work"
        className="scroll-mt-28 border-b border-white/8 bg-[#0f0f0f] sm:scroll-mt-32 xl:scroll-mt-40"
        containerClass={`${SECTION} py-16 sm:py-18 lg:py-20`}
      />

      {/* ── Coverage ────────────────────────────────────────── */}
      <section className="border-b border-white/8 bg-[#0f0f0f]">
        <div className={`${SECTION} pt-20 pb-12 sm:pt-24 sm:pb-14 lg:pt-28`}>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Coverage
              </p>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Serving Bay of Plenty &amp; Waikato
              </h2>
              <p className="max-w-md text-sm text-white/50">
                Mobile service available. We travel to your home, workplace, or
                dealership. Contact us to confirm availability in your area.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Bay of Plenty", "Waikato"].map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/75 sm:px-6 sm:py-3 sm:text-base"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────── */}
      <section
        id="services"
        className="scroll-mt-28 border-b border-white/8 sm:scroll-mt-32 xl:scroll-mt-40"
      >
        <div className={`${SECTION} py-16 sm:py-18 lg:py-20`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Services
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Every type of dent, handled with precision.
              </h2>
            </div>
            <p className="max-w-xs text-xs text-white/45 sm:text-right">
              Not sure which service you need? Send us a photo and we&apos;ll
              advise.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <article
                key={s.title}
                className="flex flex-col justify-between rounded-2xl bg-[var(--accent)] p-5 text-black"
              >
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-black">{s.title}</h3>
                  <p className="text-xs leading-relaxed text-black/70">
                    {s.desc}
                  </p>
                  <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-lg bg-black/5">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                </div>
                <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black/60">
                  {s.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why PDR ─────────────────────────────────────────── */}
      <section
        id="why-pdr"
        className="scroll-mt-28 border-b border-white/8 bg-[#0f0f0f] sm:scroll-mt-32 xl:scroll-mt-40"
      >
        <div className={`${SECTION} py-16 sm:py-18 lg:py-20`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Why paintless dent removal?
              </p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                The smarter repair for your car and your wallet.
              </h2>
              <p className="max-w-md text-sm text-white/50">
                Traditional panel and paint repairs can cost thousands and leave
                a repair history that hurts resale value. PDR achieves the same
                result, often better, at a fraction of the cost and in a
                fraction of the time.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)] transition hover:bg-[var(--accent)]/15"
              >
                Get a free assessment
              </a>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {BENEFITS.map((b) => (
                <div
                  key={b.label}
                  className="rounded-xl border border-white/8 bg-[#1a1a1a] p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <p className="text-xs font-semibold text-white">
                      {b.label}
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed text-white/45">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog ────────────────────────────────────────────── */}
      <section
        id="blog"
        className="scroll-mt-28 border-b border-white/8 sm:scroll-mt-32 xl:scroll-mt-40"
      >
        <div className={`${SECTION} py-16 sm:py-18 lg:py-20`}>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                From the blog
              </p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Dent repair advice and stories.
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)] transition hover:bg-[var(--accent)]/15"
            >
              View all posts
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section
        id="faq"
        className="scroll-mt-28 border-b border-white/8 sm:scroll-mt-32 xl:scroll-mt-40"
      >
        <div className={`${SECTION} py-16 sm:py-18`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                FAQ
              </p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Common questions about PDR.
              </h2>
              <p className="text-sm text-white/50">
                Can&apos;t find what you&apos;re looking for? Send us a message
                and we&apos;ll get back to you.
              </p>
            </div>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl border border-white/8 bg-[#1a1a1a] p-5"
                >
                  <h3 className="text-sm font-semibold text-white">{faq.q}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/50">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────── */}
      <section
        id="contact"
        className="scroll-mt-28 border-b border-white/8 bg-[#0f0f0f] sm:scroll-mt-32 xl:scroll-mt-40"
      >
        <div className={`${SECTION} py-16 sm:py-18 lg:py-20`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Get a free quote
              </p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to restore your vehicle?
              </h2>
              <p className="max-w-md text-sm text-white/55">
                Send us a description, or better yet a photo, of the damage and
                we&apos;ll come back with an honest assessment and a price. No
                obligation.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-[#1a1a1a] p-4">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/15">
                    <svg
                      className="h-3.5 w-3.5 text-[var(--accent)]"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm0 1h12a1 1 0 0 1 1 1v.5l-7 4-7-4V4a1 1 0 0 1 1-1zm0 10a1 1 0 0 1-1-1V6.5l7 4 7-4V12a1 1 0 0 1-1 1H2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                      Email
                    </p>
                    <a
                      href="mailto:dentlabnz@gmail.com"
                      className="text-sm text-white/70 transition hover:text-white"
                    >
                      dentlabnz@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-[#1a1a1a] p-4">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/15">
                    <svg
                      className="h-3.5 w-3.5 text-[var(--accent)]"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58L3.654 1.328z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                      Phone
                    </p>
                    <a
                      href="tel:+6400000000"
                      className="text-sm text-white/70 transition hover:text-white"
                    >
                      +64 20 445 7065
                    </a>
                  </div>
                </div>

                <div className="rounded-xl border border-white/8 bg-[#1a1a1a] p-4">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Response time
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    We reply to all quote requests within one business day.
                  </p>
                </div>
              </div>
            </div>

            <QuoteForm />
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <SiteFooter sectionClass={SECTION} />
    </main>
  );
}
