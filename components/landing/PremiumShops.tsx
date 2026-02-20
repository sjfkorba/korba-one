"use client";

import { useEffect, useState } from "react";
import ShopCard from "@/components/cards/ShopCard";
import Link from "next/link";
import { getLatestShops } from "@/lib/dashboard";

export default function ShopsGrid() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      const data = await getLatestShops();
      setShops(data);
      setLoading(false);
    };

    fetchShops();
  }, []);

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-black">
            Featured <span className="text-orange-500">Shops</span>
          </h2>

          <Link
            href="/shops"
            className="text-sm text-orange-500 hover:underline"
          >
            View All →
          </Link>
        </div>

        {loading && (
          <div className="text-white/60">Loading shops...</div>
        )}

        {!loading && shops.length === 0 && (
          <div className="text-white/60">
            No shops available.
          </div>
        )}

        {!loading && shops.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shops.slice(0, 6).map((shop) => (
              <ShopCard key={shop.id} {...shop} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}