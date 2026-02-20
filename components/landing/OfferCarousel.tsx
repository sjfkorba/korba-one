"use client";

import { useEffect, useRef } from "react";

const staticOffers = [
  "🔥 Get Featured on Korba One – Reach 10,000+ Local Users",
  "⚡ Free 15 Listings Every Month for Sellers",
  "📈 Boost Your Shop Visibility in Korba Instantly",
  "🚀 Premium Placement Available – Stand Out",
  "💼 Post Jobs & Grow Your Business Faster",
];

export default function OfferCarousel() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    let animationFrame: number;
    let scrollAmount = 0;

    const speed = 0.5; // control speed here

    const animate = () => {
      scrollAmount += speed;

      if (scrollAmount >= el.scrollWidth / 2) {
        scrollAmount = 0;
      }

      el.style.transform = `translateX(-${scrollAmount}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-black via-[#0b0f1a] to-black border-y border-orange-500/20 py-4">
      
      {/* subtle glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,115,0,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative overflow-hidden">
        <div
          ref={marqueeRef}
          className="flex gap-16 whitespace-nowrap text-orange-500 font-semibold tracking-wide text-sm md:text-base"
        >
          {[...staticOffers, ...staticOffers].map((offer, index) => (
            <span
              key={index}
              className="relative px-6 py-2 transition hover:text-white hover:scale-105 duration-300"
            >
              {offer}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
