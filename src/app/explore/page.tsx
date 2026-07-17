"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import FilterBar, { FilterState } from "@/components/explore/FilterBar";
import PackageCard from "@/components/shared/PackageCard";
import SkeletonCard from "@/components/explore/SkeletonCard";

// Helper to generate static placeholder data
const generateMockData = () => {
  const locations = ["Bali, Indonesia", "Zermatt, Switzerland", "Tokyo, Japan", "Santorini, Greece", "Paris, France", "Kyoto, Japan", "Rome, Italy", "New York, USA", "Cape Town, South Africa", "Sydney, Australia"];
  return Array.from({ length: 20 }).map((_, i) => {
    const loc = locations[i % locations.length];
    const price = 500 + (i * 123) % 3000;
    const rating = 3.5 + ((i * 0.1) % 1.5); // ratings between 3.5 and 5.0
    // Generate dates around August 2026
    const startDay = (i % 28) + 1;
    const startDate = `2026-08-${startDay.toString().padStart(2, '0')}`;
    const endDate = `2026-08-${(startDay + 5).toString().padStart(2, '0')}`;
    
    return {
      id: `pkg-${i + 1}`,
      title: `Amazing Trip to ${loc.split(',')[0]} ${i + 1}`,
      description: `Experience the wonders of ${loc} with our exclusive guided tour. Perfect for adventure and relaxation.`,
      price,
      rating: Number(rating.toFixed(1)),
      location: loc,
      date: `${startDate} to ${endDate}`, // Display string
      _startDate: startDate, // For filtering
      _endDate: endDate,     // For filtering
      imageUrl: `https://picsum.photos/seed/tripcraft-${i}/600/400`,
    };
  });
};

const MOCK_PACKAGES = generateMockData();
const ALL_LOCATIONS = Array.from(new Set(MOCK_PACKAGES.map(p => p.location)));

export default function ExplorePage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    dateStart: "",
    dateEnd: "",
    sort: "price-asc",
  });

  const [visibleCount, setVisibleCount] = useState(10);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and Sort Data
  const filteredAndSortedData = useMemo(() => {
    let result = [...MOCK_PACKAGES];

    // Search filter (title or location)
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)
      );
    }

    // Location filter
    if (filters.location) {
      result = result.filter((p) => p.location === filters.location);
    }

    // Price filters
    if (filters.minPrice !== "") {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice !== "") {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }

    // Rating filter
    if (filters.minRating !== "") {
      result = result.filter((p) => p.rating >= Number(filters.minRating));
    }

    // Date filters (simple string comparison works for YYYY-MM-DD)
    if (filters.dateStart) {
      result = result.filter((p) => p._startDate >= filters.dateStart || p._endDate >= filters.dateStart);
    }
    if (filters.dateEnd) {
      result = result.filter((p) => p._startDate <= filters.dateEnd);
    }

    // Sort
    result.sort((a, b) => {
      switch (filters.sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating; // Highest first
        case "date":
          return a._startDate.localeCompare(b._startDate);
        default:
          return 0;
      }
    });

    return result;
  }, [filters]);

  const visibleData = filteredAndSortedData.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedData.length;

  // Infinite Scroll logic
  useEffect(() => {
    if (inView && hasMore && !isInitialLoading && !isFetchingMore) {
      setIsFetchingMore(true);
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 10);
        setIsFetchingMore(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [inView, hasMore, isInitialLoading, isFetchingMore]);

  // Reset pagination when filters change (instant without loader)
  useEffect(() => {
    setVisibleCount(10);
  }, [filters]);

  return (
    <div className="min-h-screen bg-[var(--background)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2 text-serif">Explore Packages</h1>
          <p className="text-[var(--muted)]">Find your next adventure from our curated selection of travel packages.</p>
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <FilterBar 
            filters={filters} 
            setFilters={setFilters} 
            locations={ALL_LOCATIONS} 
          />
        </div>

        {/* Main Content */}
        <div>
          {/* Top stats bar */}
          <div className="mb-6 flex justify-between items-center text-sm text-[var(--muted)]">
            <span>
              Showing {isInitialLoading ? 0 : visibleData.length} of {filteredAndSortedData.length} packages
            </span>
          </div>

          {isInitialLoading ? (
            // Initial Loading Skeletons
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={`skel-${i}`} />
              ))}
            </div>
          ) : filteredAndSortedData.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 text-center bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-[var(--shadow-card)]">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">No packages found</h3>
              <p className="text-[var(--muted)] mb-4">Try adjusting your filters or search query to find more results.</p>
              <button 
                onClick={() => setFilters({
                  search: "", location: "", minPrice: "", maxPrice: "", minRating: "", dateStart: "", dateEnd: "", sort: "price-asc"
                })}
                className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            // Data Grid (1 col mobile, 2 cols tablet, 4 cols desktop)
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleData.map((pkg, index) => (
                <PackageCard key={pkg.id} {...pkg} priority={index < 4} />
              ))}
            </div>
          )}

          {/* Infinite Scroll trigger & loading state */}
          {!isInitialLoading && hasMore && (
            <div ref={ref} className="mt-8">
              {isFetchingMore && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={`skel-more-${i}`} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
