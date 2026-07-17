import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiStar, FiCalendar } from "react-icons/fi";

export interface PackageCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  date: string;
  rating: number;
  location: string;
  imageUrl: string;
}

export default function PackageCard({
  id,
  title,
  description,
  price,
  date,
  rating,
  location,
  imageUrl,
}: PackageCardProps) {
  return (
    <div className="group flex flex-col bg-[var(--card)] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 border border-[var(--border)]">
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <FiStar className="text-[var(--warning)] w-4 h-4 fill-current" />
          <span className="text-sm font-semibold text-gray-900">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1 text-[var(--muted)] text-sm mb-2">
          <FiMapPin className="text-[var(--accent)]" />
          <span>{location}</span>
        </div>
        
        <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 line-clamp-1">
          {title}
        </h3>
        
        <p className="text-[var(--muted)] text-sm line-clamp-2 mb-4 flex-grow">
          {description}
        </p>

        <div className="flex items-center gap-2 text-[var(--muted-soft)] text-sm mb-4">
          <FiCalendar className="w-4 h-4" />
          <span>{date}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <div className="flex flex-col">
            <span className="text-xs text-[var(--muted)]">Starting from</span>
            <span className="text-lg font-bold text-[var(--foreground)]">${price}</span>
          </div>
          <Link
            href={`/packages/${id}`}
            className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
