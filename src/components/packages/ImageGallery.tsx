"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div className="relative w-full h-[320px] md:h-[480px] rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800">
        <Image
          src={images[activeIndex]}
          alt={`${title} - image ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 65vw"
          className="object-cover transition-opacity duration-300"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative flex-shrink-0 w-20 h-16 md:w-24 md:h-18 rounded-xl overflow-hidden transition-all duration-200 ${
              activeIndex === i
                ? "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--background)] opacity-100"
                : "opacity-60 hover:opacity-90"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${i + 1}`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
