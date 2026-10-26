import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/dentlabnz_logo.png";

/** Top bar for sub-pages: back home, centred logo, quote button. */
export function SiteNav({ sectionClass }: { sectionClass: string }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/8 bg-[#111111]/90 backdrop-blur">
      <div
        className={`${sectionClass} relative flex h-22 items-center justify-between min-[360px]:h-26 sm:h-30 xl:h-38`}
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
  );
}
