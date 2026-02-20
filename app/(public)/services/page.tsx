"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Link from "next/link";

const demoServices = [
  {
    name: "Raj Electrical Services",
    category: "Electrician",
    location: "Niharika, Korba",
    slug: "raj-electrical",
  },
  {
    name: "Sharma Plumbing Works",
    category: "Plumber",
    location: "Transport Nagar, Korba",
    slug: "sharma-plumbing",
  },
  {
    name: "CleanPro Housekeeping",
    category: "Cleaning",
    location: "Balco, Korba",
    slug: "cleanpro-housekeeping",
  },
  {
    name: "Bright Future Coaching",
    category: "Education",
    location: "Kosabadi, Korba",
    slug: "bright-future-coaching",
  },
];

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Electrician", "Plumber", "Cleaning", "Education"];

  const filteredServices = useMemo(() => {
    return demoServices.filter((service) => {
      const matchSearch =
        service.name.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        category === "All" || service.category === category;

      return matchSearch && matchCategory;
    });
  }, [search, category]);

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black">
            Local <span className="text-orange-500">Services</span> in Korba
          </h1>
          <p className="mt-4 text-white/60">
            Find trusted professionals near you.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Search service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-premium flex-1"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-premium md:w-56"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-900">
                {cat}
              </option>
            ))}
          </select>

          <Link href="/dashboard/seller/post-service">
            <button className="btn-primary">
              List Your Service
            </button>
          </Link>
        </div>

        {/* Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <motion.div
                key={service.slug}
                whileHover={{ y: -6 }}
                className="card-premium"
              >
                <Link href={`/services/${service.slug}`}>
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      {service.name}
                    </h3>

                    <p className="text-orange-500 text-sm mt-1">
                      {service.category}
                    </p>

                    <div className="flex items-center gap-2 text-white/60 text-xs mt-3">
                      <MapPin size={14} />
                      {service.location}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white/50 py-20">
            No services found.
          </div>
        )}

      </div>
    </section>
  );
}
