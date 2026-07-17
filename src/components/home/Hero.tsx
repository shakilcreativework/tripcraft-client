"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiSearch, FiMapPin, FiCalendar } from "react-icons/fi";

const images = [
  "https://picsum.photos/id/1015/1920/1080", // Mountains
  "https://picsum.photos/id/1043/1920/1080", // Forest/Lake
  "https://picsum.photos/id/1036/1920/1080", // Winter/Snow
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[70vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[currentImage]})` }}
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-[-4rem]">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 text-serif drop-shadow-lg"
        >
          Discover Your Next Great Adventure
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-md"
        >
          Let AI craft your perfect itinerary. Explore curated packages or build a personalized trip in seconds.
        </motion.p>

        {/* Search Bar */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-2 rounded-2xl shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-2"
        >
          <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
            <FiMapPin className="text-gray-400 w-5 h-5 mr-3" />
            <input 
              type="text" 
              placeholder="Where do you want to go?" 
              className="bg-transparent border-none outline-none w-full text-gray-800 placeholder-gray-400"
            />
          </div>
          <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
            <FiCalendar className="text-gray-400 w-5 h-5 mr-3" />
            <input 
              type="text" 
              placeholder="When? (e.g., Oct 2026)" 
              className="bg-transparent border-none outline-none w-full text-gray-800 placeholder-gray-400"
            />
          </div>
          <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
            <FiSearch className="w-5 h-5" />
            Search
          </button>
        </motion.div>

        {/* Quick CTA Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Link href="/explore" className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg">
            Explore Packages
          </Link>
          <Link href="/ai/planner" className="bg-[var(--secondary)] hover:bg-[#ff6aab] text-white px-6 py-3 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(255,129,185,0.4)] flex items-center gap-2">
            ✨ Plan with AI
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
