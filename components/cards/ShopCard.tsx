"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, Store } from "lucide-react";

interface ShopCardProps {
  name: string;
  category: string;
  location: string;
  slug: string;
  rating?: number;
  totalReviews?: number;
  views?: number;
  verified?: boolean;
}

export default function ShopCard({
  name,
  category,
  location,
  slug,
  rating = 0,
  totalReviews = 0,
  views = 0,
  verified = false,
}: ShopCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="card-premium p-6 group relative overflow-hidden"
    >
      <Link href={`/shops/${slug}`} className="block space-y-4">

        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Store className="text-white/40" size={18} />
            {verified && (
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                Verified
              </span>
            )}
          </div>

          <span className="text-xs bg-orange-600/20 text-orange-500 px-2 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Shop Name */}
        <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition leading-snug">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <Star size={14} className="text-orange-500" />
          <span className="text-white">
            {rating.toFixed(1)}
          </span>
          <span className="text-white/50">
            ({totalReviews} reviews)
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-xs text-white/60">
          <MapPin size={14} />
          {location}
        </div>

        {/* Views */}
        {views > 0 && (
          <div className="text-xs text-white/40">
            {views} profile views
          </div>
        )}

        {/* CTA */}
        <div className="pt-2 text-sm text-orange-500 hover:underline">
          View Profile →
        </div>

      </Link>
    </motion.div>
  );
}