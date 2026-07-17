import Link from "next/link";
import { FiTwitter, FiInstagram, FiFacebook, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[var(--footer)] border-t border-[var(--border)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-[var(--accent)] text-serif">TripCraft</span>
            </Link>
            <p className="text-[var(--muted)] mb-6 text-sm">
              Your ultimate AI-powered travel companion. Discover, plan, and book the perfect curated trip with ease.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[var(--foreground)] font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/explore" className="text-[var(--muted)] hover:text-[var(--accent)] text-sm transition-colors">Explore Packages</Link></li>
              <li><Link href="/about" className="text-[var(--muted)] hover:text-[var(--accent)] text-sm transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="text-[var(--muted)] hover:text-[var(--accent)] text-sm transition-colors">Travel Blog</Link></li>
              <li><Link href="/contact" className="text-[var(--muted)] hover:text-[var(--accent)] text-sm transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[var(--foreground)] font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[var(--muted)] hover:text-[var(--accent)] text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-[var(--muted)] hover:text-[var(--accent)] text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-[var(--muted)] hover:text-[var(--accent)] text-sm transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[var(--foreground)] font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-[var(--accent)] mt-1 shrink-0" />
                <span className="text-[var(--muted)] text-sm">123 Travel Avenue, Suite 400<br/>San Francisco, CA 94107</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-[var(--accent)] shrink-0" />
                <span className="text-[var(--muted)] text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-[var(--accent)] shrink-0" />
                <span className="text-[var(--muted)] text-sm">hello@tripcraft.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--muted-soft)] text-sm">
            &copy; {new Date().getFullYear()} TripCraft. All rights reserved.
          </p>
          <div className="text-[var(--muted-soft)] text-sm flex gap-4">
            <span>Built with Agentic AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
