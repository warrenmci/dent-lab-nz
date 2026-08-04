import Image from "next/image";
import Link from "next/link";
import { QuoteForm } from "./components/QuoteForm";
import InstagramFeed from "./components/InstagramFeed";
import logo from "../assets/dentlabnz_logo_landscape.png";
import featureBefore from "../assets/feature_dent_before.jpg";
import featureAfter from "../assets/feature_dent_after.jpg";

const SECTION = "mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-10 xl:max-w-6xl";

const SERVICES = [
  {
    title: "Door Dings & Parking Dents",
    desc: "The most common vehicle damage — caused by car doors, shopping trolleys, or tight car parks. We restore the panel to factory condition without touching the paint.",
    detail: "Most repairs completed in under 2 hours",
  },
  {
    title: "Crease & Sharp Dent Repair",
    desc: "More complex damage with a defined edge or crease requires specialist technique. We assess each dent individually and advise honestly on what PDR can achieve.",
    detail: "Free assessment on complex repairs",
  },
  {
    title: "Hail Damage Repair",
    desc: "A hailstorm can leave dozens of dents across every panel. Our technicians work methodically panel by panel, bringing your vehicle back to pre-storm condition.",
    detail: "Insurance claims supported",
  },
  {
    title: "Fleet & Dealership PDR",
    desc: "We work with car dealerships and fleet operators to keep vehicles looking their best. Competitive volume pricing and flexible scheduling to suit your operation.",
    detail: "Volume pricing available",
  },
];

const BENEFITS = [
  {
    label: "Factory finish preserved",
    body: "Your original paint is never touched. No repainting, no filler, no colour-match risk.",
  },
  {
    label: "Up to 70% cheaper",
    body: "PDR costs a fraction of traditional panel and paint repair for the same — or better — result.",
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
    body: "PDR is a purely mechanical process — no solvents, no fillers, no environmental waste.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Get a free quote",
    body: "Send us photos of the damage or describe it in the form below. We'll respond within one business day with an honest assessment and price.",
  },
  {
    n: "02",
    title: "Book your repair",
    body: "We'll arrange a time that works for you. Mobile service available — we can come to your home, workplace, or dealership.",
  },
  {
    n: "03",
    title: "Precision repair",
    body: "Our specialist uses industry-leading PDR tools to carefully massage the metal back to its original form. No paint, no filler — just skill.",
  },
];

const FAQS = [
  {
    q: "What is paintless dent removal (PDR)?",
    a: "PDR is a specialist technique that uses precision tools to gently push dented metal back to its original shape from behind the panel — without any repainting or filler. It preserves your vehicle's factory paint and finish.",
  },
  {
    q: "What types of dents can be repaired with PDR?",
    a: "PDR works best on round dents with no paint damage — door dings, hail dents, minor panel dents. Sharp creases and dents with cracked or chipped paint may need a different approach. We'll always give you an honest assessment.",
  },
  {
    q: "How much does paintless dent removal cost in NZ?",
    a: "Pricing depends on the size, depth, and location of the dent. A single door ding typically starts from $100 + GST. Hail damage and fleet work is priced per vehicle. Contact us for a free quote.",
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
    a: "Yes — we work with major NZ insurers and can assist you with the claims process for hail and collision damage.",
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
      {/* FAQ rich results — generated from the same FAQS array rendered below,
          so the markup and the schema can never drift apart. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-white/8 bg-[#111111]/90 backdrop-blur">
        <div className={`${SECTION} flex items-center justify-between py-4`}>
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="DentLabNZ"
              className="h-20 w-auto sm:h-24"
              priority
            />
          </Link>
          <div className="hidden items-center gap-6 sm:flex">
            <a
              href="#services"
              className="text-xs font-medium uppercase tracking-[0.18em] text-white/60 transition hover:text-white"
            >
              Services
            </a>
            <a
              href="#why-pdr"
              className="text-xs font-medium uppercase tracking-[0.18em] text-white/60 transition hover:text-white"
            >
              Why PDR
            </a>
            <a
              href="#faq"
              className="text-xs font-medium uppercase tracking-[0.18em] text-white/60 transition hover:text-white"
            >
              FAQ
            </a>
            <a
              href="#our-work"
              className="text-xs font-medium uppercase tracking-[0.18em] text-white/60 transition hover:text-white"
            >
              Our work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:brightness-110"
            >
              Free quote
            </a>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:brightness-110 sm:hidden"
          >
            Free quote
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
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                Paintless Dent Removal Specialists — NZ
              </p>
              <div className="space-y-4">
                <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Precision dent repair.{" "}
                  <span className="text-[var(--accent)]">
                    No paint. No filler.
                  </span>
                </h1>
                <p className="max-w-lg text-balance text-sm sm:text-base text-white/60">
                  DentLab NZ restores your vehicle&apos;s panels to factory
                  condition using expert paintless dent removal — faster,
                  cheaper, and better for your car&apos;s resale value.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-black shadow-lg shadow-[var(--accent)]/20 transition hover:brightness-110"
                >
                  Get a free quote
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition hover:border-white/30 hover:bg-white/10"
                >
                  View services
                </a>
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
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]/70">
                  PDR vs Traditional repair
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    ["Turnaround", "Same day", "1–2 weeks"],
                    ["Paint touched?", "Never", "Yes — repainted"],
                    ["Cost", "From $100+", "From $500+"],
                    ["Resale impact", "None", "Repair on record"],
                    ["Finish quality", "Factory original", "Colour-matched"],
                  ].map(([label, pdr, trad]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-2 rounded-lg bg-white/4 px-3 py-2.5"
                    >
                      <span className="text-[0.65rem] font-medium text-white/40">
                        {label}
                      </span>
                      <span className="text-[0.7rem] font-semibold text-[var(--accent)]">
                        {pdr}
                      </span>
                      <span className="text-[0.65rem] text-white/35 line-through">
                        {trad}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg bg-[var(--accent)]/10 px-3 py-2.5">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    PDR saves up to 70% vs traditional body repair
                  </p>
                </div>
              </div>
            </div>
            */}

            {/* Hero card — before/after */}
            <div className="relative">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent blur-2xl" />
              <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 shadow-2xl">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]/70">
                  Before &amp; after
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white/4">
                      <Image
                        src={featureBefore}
                        alt="Panel with dent before paintless dent removal"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 20vw, 45vw"
                      />
                    </div>
                    <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                      Before
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white/4">
                      <Image
                        src={featureAfter}
                        alt="Same panel after paintless dent removal, factory finish restored"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 20vw, 45vw"
                      />
                    </div>
                    <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                      After
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our work (Instagram) ────────────────────────────── */}
      <InstagramFeed
        limit={12}
        className="border-b border-white/8 bg-[#0f0f0f]"
        containerClass={`${SECTION} py-16 sm:py-18 lg:py-20`}
      />

      {/* ── Coverage ────────────────────────────────────────── */}
      <section className="border-b border-white/8 bg-[#0f0f0f]">
        <div className={`${SECTION} py-12 sm:py-14`}>
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
                dealership — contact us to confirm availability in your area.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Bay of Plenty", "Waikato"].map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] font-medium text-white/60"
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
        className="scroll-mt-28 border-b border-white/8 sm:scroll-mt-32"
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
                  <div className="mt-3 flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-black/20 bg-black/5">
                    <div className="flex flex-col items-center gap-1 text-black/40">
                      <svg
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <circle cx="8.5" cy="9.5" r="1.5" />
                        <path d="M21 16l-5-5-4 4-3-3-6 6" />
                      </svg>
                      <span className="text-[0.6rem] font-medium uppercase tracking-[0.15em]">
                        Placeholder
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-black/60">
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
        className="scroll-mt-28 border-b border-white/8 bg-[#0f0f0f] sm:scroll-mt-32"
      >
        <div className={`${SECTION} py-16 sm:py-18 lg:py-20`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Why paintless dent removal?
              </p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                The smarter repair — for your car and your wallet.
              </h2>
              <p className="max-w-md text-sm text-white/50">
                Traditional panel and paint repairs can cost thousands and leave
                a repair history that hurts resale value. PDR achieves the same
                result — often better — at a fraction of the cost and in a
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

      {/* ── Process ─────────────────────────────────────────── */}
      <section className="border-b border-white/8">
        <div className={`${SECTION} py-16 sm:py-18 lg:py-20`}>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              How it works
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Three steps to a flawless finish.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.n} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="absolute right-0 top-5 hidden h-px w-[calc(100%-2.5rem)] -translate-y-1/2 bg-gradient-to-r from-white/10 to-transparent sm:block" />
                )}
                <div className="relative z-10 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10">
                    <span className="text-xs font-bold tabular-nums text-[var(--accent)]">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-white/50">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section
        id="faq"
        className="scroll-mt-28 border-b border-white/8 sm:scroll-mt-32"
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

      {/* ── Gallery (Instagram placeholder) ──────────────────── */}
      <section
        id="our-work"
        className="scroll-mt-28 border-b border-white/8 sm:scroll-mt-32"
      >
        <div className={`${SECTION} py-16 sm:py-18 lg:py-20`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Gallery
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                More from Instagram.
              </h2>
            </div>
            <p className="max-w-xs text-xs text-white/45 sm:text-right">
              Real repairs on real vehicles — straight from our Instagram,
              updated as we work.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-white/15 bg-[#1a1a1a]"
              >
                <div className="flex flex-col items-center gap-1 text-white/25">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <circle cx="8.5" cy="9.5" r="1.5" />
                    <path d="M21 16l-5-5-4 4-3-3-6 6" />
                  </svg>
                  <span className="text-[0.6rem] font-medium uppercase tracking-[0.15em]">
                    Placeholder
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="https://www.instagram.com/dentlabnz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition hover:border-[var(--accent)]/40 hover:bg-white/10 hover:text-white"
              aria-label="Follow DentLab NZ on Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              More work on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────── */}
      <section
        id="contact"
        className="scroll-mt-28 border-b border-white/8 bg-[#0f0f0f] sm:scroll-mt-32"
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
                Send us a description — or better yet, a photo — of the damage
                and we&apos;ll come back with an honest assessment and a price.
                No obligation.
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
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
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
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
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
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
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
      <footer className="bg-[#0a0a0a] py-4">
        <div
          className={`${SECTION} flex flex-col items-center justify-between gap-4 sm:flex-row`}
        >
          <div className="flex items-center">
            <Image src={logo} alt="DentLabNZ" className="h-12 w-auto" />
          </div>
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} DentLab NZ · Paintless Dent Removal
            Specialists · New Zealand
          </p>
          <div className="flex items-center gap-1 text-xs text-white/30">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span>PDR Specialists · NZ</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
