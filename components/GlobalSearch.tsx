"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase"; // Firebase connection
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Search, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return;

    // --- 1. INTELLIGENCE LOGGING (For Admin Dashboard) ---
    try {
      await addDoc(collection(db, "search_logs"), {
        keyword: cleanQuery,
        timestamp: serverTimestamp(),
        device: window.innerWidth < 768 ? "mobile" : "desktop",
      });
    } catch (err) {
      console.error("Search logging failed:", err);
    }

    // --- 2. SMART REDIRECT LOGIC ---
    if (cleanQuery.includes("mandi") || cleanQuery.includes("bhav") || cleanQuery.includes("rate")) {
      router.push("/mandi");
    } else if (cleanQuery.includes("emergency") || cleanQuery.includes("police") || cleanQuery.includes("hospital")) {
      router.push("/emergency");
    } else {
      // Default: Directory filter
      router.push(`/directory?q=${encodeURIComponent(cleanQuery)}`);
    }
  };

  return (
    <motion.form 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      onSubmit={handleSearch}
      className="relative group max-w-3xl w-full mx-auto"
    >
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors" size={28} />
      
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Plumber, Shop, or Mandi Bhav..."
        className="w-full h-24 pl-20 pr-32 rounded-[40px] bg-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] font-bold text-2xl outline-none focus:ring-15 ring-orange-600/10 transition-all text-slate-900 border border-slate-100"
      />

      <button 
        type="submit"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-950 text-white p-5 rounded-3xl hover:bg-orange-600 transition-all active:scale-95 shadow-xl"
      >
        <ArrowRight size={28} />
      </button>

      {/* SEARCH CHIPS */}
      <div className="absolute -bottom-10 left-8 flex gap-4 overflow-hidden">
        {['Mandi', 'Plumber', 'Solar'].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => { setQuery(tag); router.push(tag === 'Mandi' ? '/mandi' : `/directory?q=${tag}`); }}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors"
          >
            #{tag}
          </button>
        ))}
      </div>
    </motion.form>
  );
}