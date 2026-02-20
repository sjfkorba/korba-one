"use client";

import { useState } from "react";
import ShopCard from "@/components/cards/ShopCard";

const demoShops = [
  {
    name: "Balaji Electronics",
    category: "Electronics",
    location: "Transport Nagar, Korba",
    slug: "balaji-electronics",
  },
  {
    name: "Shree Medical Store",
    category: "Pharmacy",
    location: "Power House Road, Korba",
    slug: "shree-medical",
  },
  {
    name: "Modern Coaching Center",
    category: "Education",
    location: "Niharika, Korba",
    slug: "modern-coaching",
  },
  {
    name: "RK Furniture House",
    category: "Furniture",
    location: "Balco Nagar, Korba",
    slug: "rk-furniture",
  },
  {
    name: "City Fast Food",
    category: "Restaurant",
    location: "Kosabadi, Korba",
    slug: "city-fast-food",
  },
  {
    name: "Korba Fitness Gym",
    category: "Fitness",
    location: "Dipka Road, Korba",
    slug: "korba-fitness",
  },
];

export default function ShopsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Electronics", "Pharmacy", "Education", "Furniture", "Restaurant", "Fitness"];

  const filteredShops = demoShops.filter((shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || shop.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black">
            Explore <span className="text-orange-500">Shops</span> in Korba
          </h1>
          <p className="mt-4 text-white/60">
            Discover trusted local businesses across Korba.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">

          {/* Search */}
          <input
            type="text"
            placeholder="Search shop name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-premium flex-1"
          />

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-premium md:w-64"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-900">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <ShopCard key={shop.slug} {...shop} />
            ))}
          </div>
        ) : (
          <div className="text-center text-white/50 py-20">
            No shops found.
          </div>
        )}
      </div>
    </section>
  );
}
