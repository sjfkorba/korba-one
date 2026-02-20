"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Tag } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: string;
  location: string;
  category: string;
  slug: string;
}

export default function ProductCard({
  title,
  price,
  location,
  category,
  slug,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="card-premium"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs bg-orange-600/20 text-orange-500 px-3 py-1 rounded-full">
          {category}
        </span>
        <Tag size={16} className="text-white/40" />
      </div>

      <h3 className="text-lg font-bold text-white mt-4">{title}</h3>

      <p className="text-orange-500 text-xl font-semibold mt-2">
        ₹ {price}
      </p>

      <div className="flex items-center gap-2 text-sm text-white/60 mt-4">
        <MapPin size={14} />
        <span>{location}</span>
      </div>

      <Link
        href={`/buy-sell/${slug}`}
        className="mt-6 inline-block text-sm text-orange-500 hover:underline"
      >
        View Details →
      </Link>
    </motion.div>
  );
}
