"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  meals: string;
  accommodation: string;
}

interface ItineraryAccordionProps {
  itinerary: ItineraryDay[];
}

export default function ItineraryAccordion({ itinerary }: ItineraryAccordionProps) {
  const [openDay, setOpenDay] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenDay((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col gap-2">
      {itinerary.map((day, index) => {
        const isOpen = openDay === index;
        return (
          <div
            key={day.day}
            className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--card)] shadow-[var(--shadow-card)]"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover:bg-[var(--surface-hover)] transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-bold text-sm flex items-center justify-center">
                  {day.day}
                </span>
                <span className="font-semibold text-[var(--foreground)]">{day.title}</span>
              </div>
              <FiChevronDown
                className={`w-5 h-5 text-[var(--muted)] transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Accordion Body */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-1 border-t border-[var(--border)]">
                  <ul className="space-y-2 mb-4">
                    {day.activities.map((activity, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    <div className="bg-[var(--surface-2)] rounded-lg px-4 py-3">
                      <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">Meals</p>
                      <p className="text-sm text-[var(--foreground)]">{day.meals}</p>
                    </div>
                    <div className="bg-[var(--surface-2)] rounded-lg px-4 py-3">
                      <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">Accommodation</p>
                      <p className="text-sm text-[var(--foreground)]">{day.accommodation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
