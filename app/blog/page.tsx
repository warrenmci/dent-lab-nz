import type { Metadata } from "next";
import { BlogCard } from "../components/BlogCard";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { BLOG_POSTS } from "@/lib/blog";

const SECTION = "mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-10 xl:max-w-6xl";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Paintless dent removal tips, repair stories and advice from DentLabNZ, serving Tauranga, the Bay of Plenty and Waikato.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndex() {
  return (
    <main className="bg-background text-foreground">
      <SiteNav sectionClass={SECTION} />

      <section className="border-b border-white/8">
        <div className={`${SECTION} py-16 sm:py-18 lg:py-20`}>
          <header className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Blog
            </p>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Dent repair advice and stories
            </h1>
            <p className="text-sm leading-relaxed text-white/60">
              Tips on paintless dent removal, what it can fix, and recent
              repairs from around the Bay of Plenty and Waikato.
            </p>
          </header>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter sectionClass={SECTION} />
    </main>
  );
}
