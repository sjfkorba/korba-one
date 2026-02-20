"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, MapPin } from "lucide-react";

interface ServiceCardProps {
  name: string;
  category: string;
  location: string;
  slug: string;
}

export default function ServiceCard({
  name,
  category,
  location,
  slug,
}: ServiceCardProps) {
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
        <Wrench size={16} className="text-white/40" />
      </div>

      <h3 className="text-lg font-bold text-white mt-4">{name}</h3>

      <div className="flex items-center gap-2 text-sm text-white/60 mt-4">
        <MapPin size={14} />
        <span>{location}</span>
      </div>

      <Link
        href={`/services/${slug}`}
        className="mt-6 inline-block text-sm text-orange-500 hover:underline"
      >
        View Service →
      </Link>
    </motion.div>
  );
}
