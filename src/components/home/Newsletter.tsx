import { FiSend } from "react-icons/fi";

export default function Newsletter() {
  return (
    <section className="py-24 bg-[var(--surface)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--accent-soft)] rounded-3xl p-8 md:p-16 text-center border border-[var(--accent)]/20 shadow-lg relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-[var(--accent)] rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-[var(--secondary)] rounded-full opacity-10 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4 text-serif">
              Get Travel Inspiration & Deals
            </h2>
            <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto mb-8 text-lg">
              Subscribe to our newsletter to receive curated itineraries, exclusive offers, and the latest features from our AI travel planner.
            </p>

            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="flex-grow px-5 py-4 rounded-xl border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] bg-[var(--input-bg)] text-[var(--foreground)] shadow-sm"
              />
              <button
                type="submit"
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-md whitespace-nowrap"
              >
                Subscribe
                <FiSend className="w-4 h-4" />
              </button>
            </form>
            
            <p className="text-sm text-[var(--foreground)]/50 mt-4">
              We respect your privacy. No spam, just travel magic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
