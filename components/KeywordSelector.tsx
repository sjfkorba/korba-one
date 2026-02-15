"use client";
import { useState } from "react";
import { MASTER_SEO_LIBRARY } from "@/lib/seo-data";
import { Search, CheckCircle, Info } from "lucide-react";

export default function KeywordSelector({ category, onSelectionComplete }: any) {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const keywords = MASTER_SEO_LIBRARY[category as keyof typeof MASTER_SEO_LIBRARY] || [];
  
  // Filter search
  const filteredKeywords = keywords.filter(kw => 
    kw.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleKeyword = (kw: string) => {
    if (selected.includes(kw)) {
      setSelected(selected.filter(k => k !== kw));
    } else {
      if (selected.length < 50) {
        setSelected([...selected, kw]);
      } else {
        alert("Shatrughan ji, 50 keywords ki limit poori ho gayi hai!");
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Selection Progress */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-100 shadow-sm z-30">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-black italic">SEO Optimization</h3>
          <span className="bg-orange-600 text-white px-4 py-1.5 rounded-full text-xs font-black">
            {selected.length} / 50 SELECTED
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-orange-600 transition-all duration-500" 
            style={{ width: `${(selected.length / 50) * 100}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest flex items-center gap-1">
          <Info size={12} /> Kam se kam 20-30 keywords select karein best ranking ke liye.
        </p>
      </div>

      {/* Search Box */}
      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
        <input 
          type="text" 
          placeholder="Search specific keywords..."
          className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 ring-orange-500/10 font-medium"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Keywords Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {filteredKeywords.map((kw) => (
          <button
            key={kw}
            onClick={() => toggleKeyword(kw)}
            className={`p-4 rounded-2xl text-left text-xs font-bold transition-all border-2 flex justify-between items-center ${
              selected.includes(kw) 
                ? 'bg-slate-950 border-slate-950 text-white shadow-xl' 
                : 'bg-white border-slate-100 text-slate-500 hover:border-orange-500/30'
            }`}
          >
            {kw}
            {selected.includes(kw) && <CheckCircle size={14} className="text-orange-500" />}
          </button>
        ))}
      </div>

      <button 
        onClick={() => onSelectionComplete(selected)}
        disabled={selected.length < 5}
        className="w-full bg-orange-600 text-white py-6 rounded-3xl font-black text-xl shadow-2xl disabled:opacity-50 transition-all"
      >
        SAVE SEO PROFILE
      </button>
    </div>
  );
}