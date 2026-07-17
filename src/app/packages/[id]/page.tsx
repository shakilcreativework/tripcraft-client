import Link from "next/link";
import { FiMapPin, FiCalendar, FiStar, FiUsers, FiClock, FiArrowLeft, FiZap } from "react-icons/fi";
import ImageGallery from "@/components/packages/ImageGallery";
import ItineraryAccordion from "@/components/packages/ItineraryAccordion";
import ReviewsList from "@/components/packages/ReviewsList";
import RelatedPackages from "@/components/packages/RelatedPackages";

// ─── Static sample data ───────────────────────────────────────────────────────

const SAMPLE_PACKAGE = {
  id: "pkg-bali-escape",
  title: "Bali Tropical Escape",
  location: "Bali, Indonesia",
  category: "Beach & Relaxation",
  price: 1299,
  duration: "7 Days / 6 Nights",
  groupSize: "2–12 People",
  rating: 4.9,
  totalReviews: 3,
  date: "Available Year Round",
  images: [
    "https://picsum.photos/seed/bali-1/900/600",
    "https://picsum.photos/seed/bali-2/900/600",
    "https://picsum.photos/seed/bali-3/900/600",
    "https://picsum.photos/seed/bali-4/900/600",
    "https://picsum.photos/seed/bali-5/900/600",
  ],
  shortDescription:
    "Experience the magic of Bali with guided tours, private villas, and beautiful beaches — a perfect blend of culture, adventure, and relaxation.",
  fullDescription: `Bali, the Island of the Gods, enchants visitors with its terraced rice fields, ancient temples, and world-class surf beaches. Our curated Bali Tropical Escape package takes you beyond the tourist trail to discover hidden waterfalls, authentic Balinese ceremonies, and the most breathtaking sunsets you've ever witnessed.

You'll stay in handpicked boutique villas surrounded by lush tropical gardens, enjoy private cooking classes, and be guided by local experts who share their deep knowledge of Balinese culture. From the artistic hub of Ubud to the vibrant nightlife of Seminyak, this itinerary strikes the perfect balance between exploration and pure relaxation.

Our small-group format (max 12 people) ensures a personalized experience, with plenty of free time built in for you to wander, unwind, and discover your own Bali.`,
  keyInfo: [
    { label: "Duration", value: "7 Days / 6 Nights", icon: "clock" },
    { label: "Group Size", value: "2–12 People", icon: "users" },
    { label: "Location", value: "Bali, Indonesia", icon: "map" },
    { label: "Availability", value: "Year Round", icon: "calendar" },
    { label: "Difficulty", value: "Easy to Moderate", icon: "star" },
    { label: "Meals", value: "Breakfast + 3 Dinners included", icon: "star" },
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival & Seminyak Welcome",
      activities: [
        "Airport pickup & transfer to Seminyak villa",
        "Welcome dinner at a beachfront restaurant",
        "Sunset walk along Seminyak Beach",
        "Briefing and trip overview with your guide",
      ],
      meals: "Welcome dinner included",
      accommodation: "Seminyak Boutique Villa",
    },
    {
      day: 2,
      title: "Ubud Arts & Rice Terraces",
      activities: [
        "Morning visit to Tegalalang Rice Terraces",
        "Guided tour of Ubud Monkey Forest",
        "Traditional Balinese art market exploration",
        "Evening Kecak fire dance performance at Uluwatu",
      ],
      meals: "Breakfast included",
      accommodation: "Ubud Jungle Retreat",
    },
    {
      day: 3,
      title: "Temple Trail & Sacred Rituals",
      activities: [
        "Sunrise prayer ceremony at Pura Besakih (Mother Temple)",
        "Visit Tirta Empul Holy Spring Temple",
        "Traditional Balinese cooking class (lunch you cook yourself!)",
        "Free afternoon for spa or personal exploration",
      ],
      meals: "Breakfast + Lunch included",
      accommodation: "Ubud Jungle Retreat",
    },
    {
      day: 4,
      title: "Volcano Sunrise & Coffee Plantation",
      activities: [
        "3 AM wake-up for Mount Batur sunrise trek",
        "Cook eggs in volcanic steam at the summit",
        "Visit Kintamani luwak coffee plantation",
        "Afternoon at leisure — pool and spa time",
      ],
      meals: "Breakfast included",
      accommodation: "Ubud Jungle Retreat",
    },
    {
      day: 5,
      title: "Nusa Penida Island Day Trip",
      activities: [
        "Fast boat to Nusa Penida island",
        "Kelingking Beach viewpoint (T-Rex cliff)",
        "Snorkelling with manta rays at Manta Bay",
        "Crystal Bay sunset before returning to Bali",
      ],
      meals: "Breakfast + packed lunch",
      accommodation: "Seminyak Beach Resort",
    },
    {
      day: 6,
      title: "Surf, Shop & Final Fiesta",
      activities: [
        "Morning beginner surf lesson at Kuta Beach",
        "Free time for shopping in Seminyak boutiques",
        "Farewell group dinner with traditional Balinese performance",
        "Canang sari flower offering ceremony on the beach",
      ],
      meals: "Breakfast + Farewell dinner",
      accommodation: "Seminyak Beach Resort",
    },
    {
      day: 7,
      title: "Departure Day",
      activities: [
        "Leisurely breakfast at the villa",
        "Free morning for last-minute shopping or beach time",
        "Airport transfer — departure",
      ],
      meals: "Breakfast included",
      accommodation: "Check-out by 12:00",
    },
  ],
  reviews: [
    {
      id: "rev-1",
      name: "Sarah Mitchell",
      avatar: "",
      rating: 5,
      date: "June 2026",
      comment:
        "Absolutely life-changing! The volcano sunrise trek was the hardest and most rewarding thing I've ever done. Our guide Wayan was extraordinary — knowledgeable, funny, and genuinely passionate about sharing Balinese culture. Booking again next year!",
    },
    {
      id: "rev-2",
      name: "James Okoye",
      avatar: "",
      rating: 5,
      date: "May 2026",
      comment:
        "Perfect balance of adventure and relaxation. The Nusa Penida day trip to see the manta rays was a bucket-list moment. Villas were stunning and the cooking class was such a fun touch. Worth every penny.",
    },
    {
      id: "rev-3",
      name: "Priya Sharma",
      avatar: "",
      rating: 4.5,
      date: "April 2026",
      comment:
        "Had an incredible time overall. Small group size made it feel very personal. The only minor thing was day 3's schedule felt a bit rushed, but the guide adapted perfectly. The food included was delicious — loved the welcome dinner especially.",
    },
  ],
};

const RELATED_PACKAGES = [
  {
    id: "pkg-lombok",
    title: "Lombok Island Surf & Dive",
    description: "World-class surf breaks and pristine dive sites in Lombok's hidden bays.",
    price: 1100,
    date: "Apr – Oct",
    rating: 4.7,
    location: "Lombok, Indonesia",
    imageUrl: "https://picsum.photos/seed/lombok-pkg/600/400",
  },
  {
    id: "pkg-komodo",
    title: "Komodo Dragon Trek",
    description: "Come face to face with ancient Komodo dragons on an unforgettable island trek.",
    price: 1450,
    date: "Apr – Dec",
    rating: 4.8,
    location: "Komodo, Indonesia",
    imageUrl: "https://picsum.photos/seed/komodo-pkg/600/400",
  },
  {
    id: "pkg-raja-ampat",
    title: "Raja Ampat Dive Expedition",
    description: "Explore the world's most biodiverse coral reefs in a remote paradise.",
    price: 2100,
    date: "Oct – Apr",
    rating: 4.9,
    location: "Raja Ampat, Indonesia",
    imageUrl: "https://picsum.photos/seed/rajaampat-pkg/600/400",
  },
  {
    id: "pkg-yogyakarta",
    title: "Yogyakarta Heritage Trail",
    description: "Sunrise at Borobudur, batik workshops, and royal Keraton palace immersion.",
    price: 890,
    date: "Year Round",
    rating: 4.6,
    location: "Yogyakarta, Indonesia",
    imageUrl: "https://picsum.photos/seed/yogya-pkg/600/400",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PackageDetailsPage({ params }: { params: { id: string } }) {
  const pkg = SAMPLE_PACKAGE; // In a real app, fetch by params.id

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ← Back link */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-6 group"
        >
          <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Explore
        </Link>

        {/* ─── Two-column layout ─────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── LEFT: Gallery + Content ── */}
          <div className="flex-grow min-w-0">

            {/* Gallery */}
            <ImageGallery images={pkg.images} title={pkg.title} />

            {/* Title row */}
            <div className="mt-8 mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-1 bg-[var(--accent-soft)] text-[var(--accent)] rounded-full">
                  {pkg.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] text-serif mb-3">
                {pkg.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="text-[var(--accent)]" /> {pkg.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiCalendar className="text-[var(--accent)]" /> {pkg.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiStar className="text-[var(--warning)] fill-[var(--warning)]" />
                  <strong className="text-[var(--foreground)]">{pkg.rating}</strong>
                  <span>({pkg.totalReviews} reviews)</span>
                </span>
              </div>
            </div>

            {/* Overview */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Overview</h2>
              <p className="text-[var(--muted)] text-sm leading-relaxed whitespace-pre-line">
                {pkg.fullDescription}
              </p>
            </section>

            {/* Key Info */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Key Information</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Duration", value: pkg.duration, Icon: FiClock },
                  { label: "Group Size", value: pkg.groupSize, Icon: FiUsers },
                  { label: "Location", value: pkg.location, Icon: FiMapPin },
                  { label: "Availability", value: pkg.date, Icon: FiCalendar },
                  { label: "Difficulty", value: "Easy – Moderate", Icon: FiStar },
                  { label: "Meals", value: "Breakfast + 3 Dinners", Icon: FiStar },
                ].map(({ label, value, Icon }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 p-3 bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-[var(--shadow-card)]"
                  >
                    <div className="p-1.5 bg-[var(--accent-soft)] rounded-lg mt-0.5">
                      <Icon className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--muted)] font-medium">{label}</p>
                      <p className="text-sm font-semibold text-[var(--foreground)]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
                Day-by-Day Itinerary
              </h2>
              <ItineraryAccordion itinerary={pkg.itinerary} />
            </section>

            {/* Reviews */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
                Reviews & Ratings
              </h2>
              <ReviewsList
                reviews={pkg.reviews}
                averageRating={pkg.rating}
                totalReviews={pkg.totalReviews}
              />
            </section>
          </div>

          {/* ── RIGHT: Sticky Booking Card ── */}
          <div className="lg:w-[340px] flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow-card-hover)] p-6">
                <div className="mb-4">
                  <p className="text-xs text-[var(--muted)]">Starting from</p>
                  <p className="text-4xl font-bold text-[var(--foreground)]">
                    ${pkg.price.toLocaleString()}
                    <span className="text-base font-normal text-[var(--muted)]"> / person</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-5">
                  <FiStar className="text-[var(--warning)] fill-[var(--warning)] w-4 h-4" />
                  <span className="font-semibold text-sm text-[var(--foreground)]">{pkg.rating}</span>
                  <span className="text-xs text-[var(--muted)]">({pkg.totalReviews} reviews)</span>
                </div>

                {/* Key details in card */}
                <div className="space-y-3 mb-6 text-sm">
                  {[
                    { Icon: FiClock, text: pkg.duration },
                    { Icon: FiUsers, text: pkg.groupSize },
                    { Icon: FiCalendar, text: pkg.date },
                    { Icon: FiMapPin, text: pkg.location },
                  ].map(({ Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[var(--muted)]">
                      <Icon className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <button className="w-full py-3 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold transition-colors shadow-lg shadow-[var(--accent)]/20">
                    Book This Package
                  </button>
                  <Link
                    href={`/ai/planner?packageId=${pkg.id}`}
                    className="w-full py-3 rounded-xl border-2 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-soft)] font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <FiZap className="w-4 h-4" />
                    Plan with AI
                  </Link>
                </div>

                <p className="text-xs text-center text-[var(--muted)] mt-4">
                  Free cancellation up to 30 days before departure
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Packages */}
        <section className="mt-16 border-t border-[var(--border)] pt-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2 text-serif">
            You Might Also Love
          </h2>
          <p className="text-[var(--muted)] mb-8">More incredible destinations in Indonesia.</p>
          <RelatedPackages packages={RELATED_PACKAGES} />
        </section>
      </div>
    </div>
  );
}
