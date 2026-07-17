import PackageCard from "../shared/PackageCard";

const featuredData = [
  {
    id: "pkg-1",
    title: "Bali Tropical Escape",
    description: "Experience the magic of Bali with guided tours, private villas, and beautiful beaches.",
    price: 1299,
    date: "Available Year Round",
    rating: 4.9,
    location: "Bali, Indonesia",
    imageUrl: "https://picsum.photos/id/1016/600/400"
  },
  {
    id: "pkg-2",
    title: "Swiss Alps Adventure",
    description: "Skiing, hiking, and breathtaking mountain views in a premium resort.",
    price: 2450,
    date: "Dec - Mar",
    rating: 4.8,
    location: "Zermatt, Switzerland",
    imageUrl: "https://picsum.photos/id/1036/600/400"
  },
  {
    id: "pkg-3",
    title: "Tokyo Neon Nights",
    description: "A cultural deep dive into Tokyo's food, history, and futuristic technology.",
    price: 1850,
    date: "Mar - May (Cherry Blossoms)",
    rating: 4.7,
    location: "Tokyo, Japan",
    imageUrl: "https://picsum.photos/id/160/600/400"
  },
  {
    id: "pkg-4",
    title: "Santorini Sunset Bliss",
    description: "Relax in luxury cliffside suites with views of the Aegean Sea.",
    price: 1600,
    date: "Jun - Sep",
    rating: 4.9,
    location: "Santorini, Greece",
    imageUrl: "https://picsum.photos/id/1047/600/400"
  }
];

export default function FeaturedPackages() {
  return (
    <section className="py-20 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4 text-serif">
            Top Rated Packages
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            Handpicked experiences beloved by our travelers. Whether you're seeking adventure or relaxation, we have something for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredData.map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
