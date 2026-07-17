import React from 'react';

export interface FilterState {
  search: string;
  location: string;
  minPrice: number | '';
  maxPrice: number | '';
  minRating: number | '';
  dateStart: string;
  dateEnd: string;
  sort: string;
}

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  locations: string[];
}

export default function FilterBar({ filters, setFilters, locations }: FilterBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: (name === 'minPrice' || name === 'maxPrice' || name === 'minRating') && value !== '' 
        ? Number(value) 
        : value
    }));
  };

  return (
    <div className="bg-[var(--card)] p-4 md:p-6 rounded-2xl border border-[var(--border)] shadow-[var(--shadow-card)] flex flex-col gap-4">
      {/* Search and Sort row */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1" htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search by title or location..."
            value={filters.search}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-shadow"
          />
        </div>
        <div className="md:w-64">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1" htmlFor="sort">Sort By</label>
          <select
            id="sort"
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-shadow cursor-pointer"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating (Highest First)</option>
            <option value="date">Date</option>
          </select>
        </div>
      </div>

      {/* Filters row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1" htmlFor="location">Location</label>
          <select
            id="location"
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-shadow cursor-pointer"
          >
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1" htmlFor="minPrice">Min Price</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              placeholder="$0"
              value={filters.minPrice}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-shadow"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1" htmlFor="maxPrice">Max Price</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              placeholder="$Any"
              value={filters.maxPrice}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-shadow"
            />
          </div>
        </div>

        {/* Date Filter */}
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1" htmlFor="dateStart">Start Date</label>
            <input
              type="date"
              id="dateStart"
              name="dateStart"
              value={filters.dateStart}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-shadow"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1" htmlFor="dateEnd">End Date</label>
            <input
              type="date"
              id="dateEnd"
              name="dateEnd"
              value={filters.dateEnd}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-shadow"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1" htmlFor="minRating">Min Rating</label>
          <select
            id="minRating"
            name="minRating"
            value={filters.minRating}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-shadow cursor-pointer"
          >
            <option value="">Any Rating</option>
            <option value="3">3+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </div>
      </div>
    </div>
  );
}
