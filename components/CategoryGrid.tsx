"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/lib/constants';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function CategoryGrid() {
  return (
    <section className="px-4 py-12 md:px-10 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-orange-600 font-black text-[10px] uppercase tracking-[0.3em]">
            <Sparkles size={14} />
            <span>Premium Services</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            Korba <span className="text-slate-400 font-medium not-italic">Hub.</span>
          </h2>
        </div>
        
        <Link href="/directory" className="group flex items-center gap-3 text-slate-950 font-black uppercase text-[10px] tracking-widest bg-white border border-slate-100 px-8 py-4 rounded-2xl shadow-sm hover:bg-orange-600 hover:text-white transition-all duration-500">
          Explore All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* --- SAFE & SMART GRID --- */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
        {CATEGORIES.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
          >
            <Link 
              // --- THE FIX: Pointing to directory with 'cat' param ---
              href={`/directory?cat=${cat.id || 'all'}`} 
              className={`group relative overflow-hidden p-6 md:p-10 rounded-[45px] flex flex-col items-center justify-center gap-6 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] active:scale-95 ${cat.color || 'bg-slate-50'} border border-transparent hover:border-white hover:bg-white`}
            >
              {/* Decorative Accent */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/30 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-1000"></div>
              
              {/* Visual Icon */}
              <div className="relative z-10 text-5xl md:text-7xl group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 drop-shadow-xl">
                {cat.icon}
              </div>

              {/* Safe Text Handling */}
              <div className="relative z-10 flex flex-col items-center">
                <span className={`text-[10px] md:text-xs font-black text-center uppercase tracking-[0.15em] leading-none ${cat.urgent ? 'text-red-600' : 'text-slate-900'}`}>
                  {cat.name}
                </span>
                
                {/* Indicator Dot */}
                <div className={`mt-3 w-1 h-1 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:w-6 ${cat.urgent ? 'bg-red-500' : 'bg-orange-600'}`}></div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}