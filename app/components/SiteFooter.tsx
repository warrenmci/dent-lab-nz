import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/dentlabnz_logo.png";

export function SiteFooter({ sectionClass }: { sectionClass: string }) {
  return (
    <footer className="bg-[#0a0a0a] py-4">
      <div
        className={`${sectionClass} flex flex-col items-center justify-between gap-4 sm:flex-row`}
      >
        <Link href="/" aria-label="DentLabNZ home" className="flex items-center">
          <Image src={logo} alt="DentLabNZ" className="h-16 w-auto" />
        </Link>
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} DentLabNZ · Paintless Dent Removal
            Specialists · New Zealand
          </p>
          <Link
            href="/price-beat-terms"
            className="text-xs text-white/40 underline-offset-4 transition hover:text-white hover:underline"
          >
            Price Beat Guarantee T&amp;Cs
          </Link>
        </div>
        <div className="flex items-center gap-1 text-xs text-white/30">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <span>PDR Specialists · NZ</span>
        </div>
      </div>
    </footer>
  );
}
