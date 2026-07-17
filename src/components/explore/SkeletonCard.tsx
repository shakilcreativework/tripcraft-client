export default function SkeletonCard() {
  return (
    <div className="flex flex-col bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)] animate-pulse shadow-sm">
      {/* Image Skeleton */}
      <div className="relative h-56 w-full bg-gray-200 dark:bg-gray-800"></div>

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Location */}
        <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-800 rounded mb-3"></div>
        
        {/* Title */}
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-3"></div>
        
        {/* Description */}
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded mt-2 mb-1"></div>
        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded mb-4 flex-grow"></div>

        {/* Date */}
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded mb-5 mt-auto"></div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] mt-auto">
          <div className="flex flex-col gap-1">
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
          <div className="h-9 w-28 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
