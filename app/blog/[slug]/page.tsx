import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteNav } from "../../components/SiteNav";
import { BLOG_POSTS, formatPostDate, getPost } from "@/lib/blog";
import { BUSINESS, SITE_URL } from "@/lib/site";

const SECTION = "mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-10 xl:max-w-6xl";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    author: { "@type": "Organization", name: BUSINESS.name },
    publisher: { "@id": `${SITE_URL}/#business` },
  };

  return (
    <main className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <SiteNav sectionClass={SECTION} />

      <article className="border-b border-white/8">
        <div className={`${SECTION} py-16 sm:py-18 lg:py-20`}>
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="text-xs font-medium uppercase tracking-[0.18em] text-white/50 transition hover:text-white"
            >
              ← All posts
            </Link>

            <header className="mt-6 space-y-4">
              <time
                dateTime={post.date}
                className="block text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]"
              >
                {formatPostDate(post.date)}
              </time>
              <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                {post.title}
              </h1>
            </header>

            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-white/4">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 768px, 100vw"
                priority
              />
            </div>

            <div className="mt-10 space-y-4">
              {post.body.map((block, i) => {
                switch (block.type) {
                  case "h2":
                    return (
                      <h2
                        key={i}
                        className="pt-6 text-xl font-bold tracking-tight text-white sm:text-2xl"
                      >
                        {block.text}
                      </h2>
                    );
                  case "p":
                    return (
                      <p
                        key={i}
                        className="text-pretty text-sm leading-relaxed text-white/65 sm:text-base"
                      >
                        {block.text}
                      </p>
                    );
                  case "ul":
                    return (
                      <ul key={i} className="space-y-2.5">
                        {block.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm leading-relaxed text-white/65 sm:text-base"
                          >
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  case "tagline":
                    return (
                      <p
                        key={i}
                        className="pt-6 text-sm font-semibold text-[var(--accent)] sm:text-base"
                      >
                        {block.text}
                      </p>
                    );
                }
              })}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3 rounded-xl border border-white/8 bg-[#1a1a1a] p-5 sm:p-6">
              <p className="flex-1 text-sm text-white/60">
                Got a dent you&apos;d like looked at? Send us a photo for a
                free, no-obligation quote.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:brightness-110"
              >
                Get a free quote
              </Link>
            </div>
          </div>
        </div>
      </article>

      <SiteFooter sectionClass={SECTION} />
    </main>
  );
}
