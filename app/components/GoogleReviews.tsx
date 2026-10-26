import reviewsData from "@/data/reviews.json";
import { BUSINESS } from "@/lib/site";
import { ReviewsCarousel, StarRating, type Review } from "./ReviewsCarousel";

/**
 * Google reviews, copied by hand from the Google Business Profile into
 * data/reviews.json (name, profileUrl, rating, text, timestamp as
 * YYYY-MM-DD). The section renders nothing until that file has reviews.
 */
export function GoogleReviews({
  sectionClass,
  className,
}: {
  sectionClass: string;
  className?: string;
}) {
  const reviews = reviewsData as Review[];
  if (reviews.length === 0) return null;

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <section id="reviews" className={className}>
      <div className={`${sectionClass} py-16 sm:py-18 lg:py-20`}>
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
            What customers say
          </p>
          <div className="mt-5 flex items-center justify-center gap-5">
            <div className="text-center">
              <p className="text-4xl font-bold tracking-tight">
                {averageRating.toFixed(1)}
              </p>
              <StarRating rating={Math.round(averageRating)} />
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="text-left">
              <p className="text-sm font-medium text-white/70">
                Based on {reviews.length} Google review
                {reviews.length === 1 ? "" : "s"}
              </p>
              <a
                href={BUSINESS.googleReviews}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/45 underline-offset-4 transition hover:text-white hover:underline"
              >
                View all reviews on Google
              </a>
            </div>
          </div>
        </div>

        <ReviewsCarousel reviews={reviews} />

        <p className="mt-8 text-center text-xs text-white/30">
          Powered by Google
        </p>
      </div>
    </section>
  );
}
