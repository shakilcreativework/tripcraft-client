import Image from "next/image";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Solo Traveler",
    image: "https://picsum.photos/id/1027/100/100",
    content: "The AI itinerary planner completely changed how I travel. It built a perfect 7-day trip to Japan that matched my budget and love for food exactly.",
  },
  {
    name: "Marcus & Emily",
    role: "Honeymooners",
    image: "https://picsum.photos/id/1011/100/100",
    content: "We booked our honeymoon to Santorini through TripCraft. The package was flawless, and the 24/7 AI chat assistant helped us find a last-minute dinner reservation.",
  },
  {
    name: "David Chen",
    role: "Digital Nomad",
    image: "https://picsum.photos/id/1005/100/100",
    content: "I use TripCraft for every new city I visit. The verified reviews are trustworthy, and the price guarantee ensures I'm never overpaying.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4 text-serif">
            What Our Travelers Say
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            Don't just take our word for it. Read the experiences of thousands of happy adventurers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div key={idx} className="bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)] shadow-[var(--shadow-card)] flex flex-col">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="text-[var(--warning)] w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-[var(--foreground)] text-lg leading-relaxed mb-8 flex-grow font-medium italic">
                "{test.content}"
              </p>
              <div className="flex items-center gap-4">
                <Image 
                  src={test.image} 
                  alt={test.name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-[var(--foreground)]">{test.name}</h4>
                  <span className="text-[var(--muted)] text-sm">{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
