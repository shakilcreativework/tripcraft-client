import Image from "next/image";
import Link from "next/link";

const destinations = [
  { name: "Santorini, Greece", image: "https://picsum.photos/id/1047/400/400" },
  { name: "Kyoto, Japan", image: "https://picsum.photos/id/134/400/400" },
  { name: "Swiss Alps", image: "https://picsum.photos/id/1036/400/400" },
  { name: "Maui, Hawaii", image: "https://picsum.photos/id/1015/400/400" },
  { name: "Rome, Italy", image: "https://picsum.photos/id/1067/400/400" },
  { name: "Banff, Canada", image: "https://picsum.photos/id/1016/400/400" },
];

export default function PopularDestinations() {
  return (
    <section className="py-20 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4 text-serif">
              Popular Destinations
            </h2>
            <p className="text-[var(--muted)] max-w-2xl">
              Explore the most loved locations by our global community. From stunning beaches to snow-capped mountains.
            </p>
          </div>
          <Link href="/explore" className="text-[var(--accent)] font-medium hover:text-[var(--accent-hover)] transition-colors whitespace-nowrap">
            View All Destinations →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {destinations.map((dest, idx) => (
            <Link 
              key={idx} 
              href={`/explore?location=${encodeURIComponent(dest.name)}`}
              className="group relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-md block"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white font-semibold text-lg drop-shadow-md">
                {dest.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
