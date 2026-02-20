"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function SmartSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;

    const lower = query.toLowerCase();

    // Smart routing logic
    if (lower.includes("job")) {
      router.push(`/jobs?query=${query}`);
    } else if (lower.includes("service")) {
      router.push(`/services?query=${query}`);
    } else if (lower.includes("emergency") || lower.includes("hospital")) {
      router.push(`/emergency?query=${query}`);
    } else if (lower.includes("sell") || lower.includes("buy")) {
      router.push(`/buy-sell?query=${query}`);
    } else {
      router.push(`/shops?query=${query}`);
    }
  };

  return (
    <section className="section-padding">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-3 flex items-center gap-3 border border-white/10"
        >
          <Search className="text-white/50" size={20} />

          <input
            type="text"
            placeholder="Search shops, jobs, services, emergency..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="bg-transparent outline-none flex-1 text-white placeholder:text-white/40"
          />

          <button
            onClick={handleSearch}
            className="btn-primary px-5 py-2 text-sm"
          >
            Search
          </button>
        </motion.div>
      </div>
    </section>
  );
}
