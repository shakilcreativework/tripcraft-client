import { FiCpu, FiStar, FiTag, FiLifeBuoy } from "react-icons/fi";

const features = [
  {
    icon: <FiCpu className="w-8 h-8 text-[var(--accent)]" />,
    title: "Smart AI Planning",
    description: "Our agentic AI builds personalized day-by-day itineraries tailored specifically to your budget and interests."
  },
  {
    icon: <FiStar className="w-8 h-8 text-[var(--warning)]" />,
    title: "Verified Reviews",
    description: "Book with confidence knowing every review comes from a real traveler who completed the trip."
  },
  {
    icon: <FiTag className="w-8 h-8 text-[var(--success)]" />,
    title: "Best Price Guarantee",
    description: "We negotiate directly with local vendors to ensure you get the most transparent and competitive prices."
  },
  {
    icon: <FiLifeBuoy className="w-8 h-8 text-[var(--info)]" />,
    title: "24/7 Global Support",
    description: "Travel peacefully with our dedicated support team and AI assistant available round-the-clock."
  }
];

export default function WhyTripCraft() {
  return (
    <section className="py-20 bg-[var(--surface-2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4 text-serif">
            Why Choose TripCraft?
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            We combine human expertise with cutting-edge AI to eliminate the stress of travel planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                {feature.title}
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
