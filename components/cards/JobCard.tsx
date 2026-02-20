"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, IndianRupee } from "lucide-react";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  postedAt?: string;
  featured?: boolean;
}


export default function JobCard({
  id,
  title,
  company,
  location,
  type,
  salary,
  postedAt,
  featured,
}: JobCardProps)
 {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative card-premium group"
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 right-3 text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
          Featured
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition">
            {title}
          </h3>
          <p className="text-sm text-orange-500 mt-1">{company}</p>
        </div>

        <Briefcase className="text-white/40" size={18} />
      </div>

      <div className="mt-4 space-y-2 text-sm text-white/60">
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={14} />
          <span>{type}</span>
        </div>

        {salary && (
          <div className="flex items-center gap-2 text-green-400">
            <IndianRupee size={14} />
            <span>{salary}</span>
          </div>
        )}
      </div>

      {postedAt && (
        <p className="mt-4 text-xs text-white/40">
          Posted {postedAt}
        </p>
      )}

      <Link
        href={`/jobs/${id || ""}`}
        className="mt-6 inline-block text-sm text-orange-500 hover:underline"
      >
        Apply Now →
      </Link>
    </motion.div>
  );
}
