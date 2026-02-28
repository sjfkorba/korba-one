"use client";

import { useState, useEffect } from "react";
import ShopCard from "@/components/cards/ShopCard";
import { getLatestShops, PublicShop } from "@/lib/dashboard";

export default function ShopsPage() {
  const [shops, setShops] = useState<PublicShop[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Electronics",
    "Pharmacy",
    "Education",
    "Furniture",
    "Restaurant",
    "Fitness",
  ];

  // 🔥 Fetch from Firebase
  useEffect(() => {
    async function fetchShops() {
      try {
        const data = await getLatestShops();
        setShops(data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchShops();
  }, []);

  // 🔎 Filter Logic
  const filteredShops = shops.filter((shop) => {
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

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20 text-white/60">
            Loading shops...
          </div>
        ) : filteredShops.length > 0 ? (

          /* Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <ShopCard key={shop.id} {...shop} />
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