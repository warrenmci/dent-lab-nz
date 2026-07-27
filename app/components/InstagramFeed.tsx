import { getInstagramPosts, InstagramPost } from "@/lib/instagram";
import Image from "next/image";

function PostCard({ post }: { post: InstagramPost }) {
  const imageUrl =
    post.media_type === "VIDEO"
      ? (post.thumbnail_url ?? post.media_url)
      : post.media_url;

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1a] transition hover:border-[var(--accent)]/40"
      aria-label={
        post.caption
          ? post.caption.slice(0, 80)
          : "DentLab NZ paintless dent removal job on Instagram"
      }
    >
      <Image
        src={imageUrl}
        alt={post.caption ?? "Paintless dent removal repair by DentLab NZ"}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {post.media_type === "VIDEO" && (
        <span className="absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[0.65rem] text-[var(--accent)]">
          ▶
        </span>
      )}

      {post.media_type === "CAROUSEL_ALBUM" && (
        <span className="absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[0.65rem] text-[var(--accent)]">
          ⧉
        </span>
      )}

      {/* Hover caption overlay */}
      {post.caption && (
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="line-clamp-3 text-xs leading-snug text-white/90">
            {post.caption}
          </p>
        </div>
      )}
    </a>
  );
}

interface InstagramFeedProps {
  limit?: number;
  className?: string;
  containerClass?: string;
}

export default async function InstagramFeed({
  limit = 12,
  className = "",
  containerClass = "",
}: InstagramFeedProps) {
  let posts: InstagramPost[];

  try {
    posts = await getInstagramPosts(limit);
  } catch (error) {
    console.error("[InstagramFeed]", error);
    // Fail silently in production — don't break the page
    return null;
  }

  if (!posts.length) return null;

  return (
    <section className={className}>
      <div className={containerClass}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Our work
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              See the quality for yourself.
            </h2>
          </div>
          <p className="max-w-xs text-xs text-white/45 sm:text-right">
            Real repairs on real vehicles — straight from our Instagram, updated
            as we work.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
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
  );
}
