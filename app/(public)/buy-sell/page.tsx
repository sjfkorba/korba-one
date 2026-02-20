"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { IndianRupee } from "lucide-react";
import Link from "next/link";

const demoListings = [
  {
    title: "iPhone 13 (128GB)",
    price: "₹38,000",
    category: "Electronics",
    condition: "Used",
    location: "Niharika, Korba",
    slug: "iphone-13-128gb",
  },
  {
    title: "Wooden Study Table",
    price: "₹4,500",
    category: "Furniture",
    condition: "Used",
    location: "Transport Nagar, Korba",
    slug: "wooden-study-table",
  },
  {
    title: "Brand New Office Chair",
    price: "₹6,200",
    category: "Furniture",
    condition: "New",
    location: "Balco, Korba",
    slug: "office-chair-new",
  },
  {
    title: "Samsung LED TV 42 inch",
    price: "₹18,000",
    category: "Electronics",
    condition: "Used",
    location: "Kosabadi, Korba",
    slug: "samsung-led-42",
  },
];

export default function BuySellPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [condition, setCondition] = useState("All");

  const categories = ["All", "Electronics", "Furniture"];
  const conditions = ["All", "New", "Used"];

  const filteredListings = useMemo(() => {
    return demoListings.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        category === "All" || item.category === category;

      const matchCondition =
        condition === "All" || item.condition === condition;

      return matchSearch && matchCategory && matchCondition;
    });
  }, [search, category, condition]);

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black">
            Buy & <span className="text-orange-500">Sell</span> in Korba
          </h1>
          <p className="mt-4 text-white/60">
            Discover great deals or post your own listing.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-premium flex-1"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-premium md:w-48"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-900">
                {cat}
              </option>
            ))}
          </select>

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="input-premium md:w-40"
          >
            {conditions.map((cond) => (
              <option key={cond} value={cond} className="bg-slate-900">
                {cond}
              </option>
            ))}
          </select>

          <Link href="/dashboard/seller/post-ad">
            <button className="btn-primary">
              Post Ad
            </button>
          </Link>
        </div>

        {/* Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredListings.map((item) => (
              <motion.div
                key={item.slug}
                whileHover={{ y: -6 }}
                className="card-premium cursor-pointer"
              >
                <Link href={`/buy-sell/${item.slug}`}>
                  <div>
                    <div className="h-40 bg-slate-800 rounded-xl mb-4" />

                    <h3 className="font-semibold text-white text-sm">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-1 text-orange-500 font-bold mt-2">
                      <IndianRupee size={14} />
                      {item.price}
                    </div>

                    <p className="text-xs text-white/50 mt-2">
                      {item.condition} • {item.location}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white/50 py-20">
            No listings found.
          </div>
        )}

      </div>
    </section>
  );
}
