"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

export type Review = {
  name: string;
  profileUrl: string;
  rating: number;
  text: string;
  /** YYYY-MM-DD */
  timestamp: string;
};

const AUTOPLAY_MS = 10000;

const noopSubscribe = () => () => {};

export function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="h-4 w-4"
          fill={star <= rating ? "var(--accent)" : "none"}
          stroke="var(--accent)"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.53.044.739.676.354 1.014l-4.193 3.674a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.193-3.674a.562.562 0 01.354-1.014l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  );
}

function timeAgo(date: string) {
  const days = Math.floor(
    (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24),
  );
  const unit = (n: number, label: string) =>
    `${n} ${label}${n === 1 ? "" : "s"} ago`;
  if (days < 7) return "This week";
  if (days < 30) return unit(Math.floor(days / 7), "week");
  if (days < 365) return unit(Math.floor(days / 30), "month");
  return unit(Math.floor(days / 365), "year");
}

/**
 * Scroll-snapped row of review cards. The arrows step one card at a time
 * and wrap around at either end; it also advances on its own every 10s,
 * pausing while the pointer is over it.
 */
export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  // Relative dates depend on "now", so they're filled in after hydration
  // to keep the server and client markup identical.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const step = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const stride = card.offsetWidth + gap;
    const max = track.scrollWidth - track.clientWidth;
    const atEnd = track.scrollLeft >= max - 2;
    const atStart = track.scrollLeft <= 2;

    if (direction === 1 && atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
    else if (direction === -1 && atStart)
      track.scrollTo({ left: max, behavior: "smooth" });
    else track.scrollBy({ left: direction * stride, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (paused || reviews.length < 2) return;
    const id = setInterval(() => step(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reviews.length, step]);

  const arrow =
    "absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#1a1a1a] text-white/70 shadow-lg transition hover:border-white/30 hover:text-white sm:flex";

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={() => step(-1)}
        className={`${arrow} -left-5 lg:-left-14`}
        aria-label="Previous review"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto py-2 [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <article
            key={`${review.name}-${review.timestamp}`}
            className="w-[85%] shrink-0 snap-start rounded-xl border border-white/8 bg-[#1a1a1a] p-5 sm:w-[342px]"
          >
            <div className="flex items-start justify-between gap-3">
              <a
                href={review.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-white underline-offset-4 transition hover:underline"
              >
                {review.name}
              </a>
              <StarRating rating={review.rating} />
            </div>
            <p className="mt-1 h-4 text-[0.65rem] uppercase tracking-[0.15em] text-white/35">
              {mounted ? timeAgo(review.timestamp) : ""}
            </p>
            <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-white/60">
              “{review.text}”
            </p>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => step(1)}
        className={`${arrow} -right-5 lg:-right-14`}
        aria-label="Next review"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
