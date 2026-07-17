import { FiStar } from "react-icons/fi";

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

interface ReviewsListProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          className={`${size === "lg" ? "w-5 h-5" : "w-4 h-4"} ${
            star <= Math.round(rating)
              ? "text-[var(--warning)] fill-[var(--warning)]"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewsList({ reviews, averageRating, totalReviews }: ReviewsListProps) {
  return (
    <div>
      {/* Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-[var(--shadow-card)] mb-6">
        <div className="text-center pr-4 sm:border-r border-[var(--border)]">
          <p className="text-5xl font-bold text-[var(--foreground)]">{averageRating.toFixed(1)}</p>
          <StarRating rating={averageRating} size="lg" />
          <p className="text-xs text-[var(--muted)] mt-1">{totalReviews} reviews</p>
        </div>
        <div className="flex-grow w-full sm:pl-4">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => Math.round(r.rating) === star).length;
            const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2 mb-1">
                <span className="text-xs text-[var(--muted)] w-3">{star}</span>
                <FiStar className="w-3 h-3 text-[var(--warning)] fill-[var(--warning)]" />
                <div className="flex-grow h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--warning)] rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-[var(--muted)] w-4">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-5 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-[var(--shadow-card)]"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-bold text-sm flex items-center justify-center flex-shrink-0 uppercase">
                {review.name.charAt(0)}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <p className="font-semibold text-[var(--foreground)] text-sm">{review.name}</p>
                  <p className="text-xs text-[var(--muted)]">{review.date}</p>
                </div>
                <StarRating rating={review.rating} />
              </div>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
