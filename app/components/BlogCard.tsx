import Image from "next/image";
import Link from "next/link";
import { formatPostDate, type BlogPost } from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/8 bg-[#1a1a1a] transition hover:border-white/20"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-white/4">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <time
          dateTime={post.date}
          className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
        >
          {formatPostDate(post.date)}
        </time>
        <h3 className="text-base font-semibold text-white">{post.title}</h3>
        <p className="text-xs leading-relaxed text-white/50">{post.excerpt}</p>
        <span className="mt-auto pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 transition group-hover:text-white">
          Read more →
        </span>
      </div>
    </Link>
  );
}
