"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const stats = [
  { label: "Happy Travelers", target: 50000, suffix: "+" },
  { label: "Destinations", target: 450, suffix: "" },
  { label: "Countries", target: 120, suffix: "" },
  { label: "AI Packages Planned", target: 15000, suffix: "+" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const duration = 2000; // 2 seconds

      if (progress < duration) {
        setCount(Math.min(target, Math.floor((progress / duration) * target)));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    if (inView) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-2 font-serif">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="py-16 bg-[var(--surface-2)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-4">
              <Counter target={stat.target} suffix={stat.suffix} />
              <p className="text-[var(--muted)] font-medium mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
