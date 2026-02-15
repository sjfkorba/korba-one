"use client";
import { motion } from "framer-motion";
import { Search, MapPin, Sparkles, Navigation } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#F8FAFC] px-6 py-12 md:py-24">
      {/* --- BACKGROUND AMBIANCE (Premium Effects) --- */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Soft Decorative Orbs */}
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-orange-200/40 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -60, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-blue-100/30 blur-[130px] rounded-full" 
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* --- PREMIUM BADGE --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 rounded-full"
        >
          <Sparkles size={16} className="text-orange-500 animate-pulse" />
          <span className="text-[11px] md:text-xs font-black tracking-[0.2em] text-slate-500 uppercase">
            Official City App of Korba
          </span>
        </motion.div>

        {/* --- MAIN TYPOGRAPHY (Bold & Sharp) --- */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[1] md:leading-[0.95]"
        >
          Sheher Ki Har <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-red-600">
            Zaroorat
          </span>, Ek Hi Jagah.
        </motion.h1>

        {/* --- SUB-TEXT --- */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-lg md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          Ab Verified Professionals aur Emergency Services <br className="hidden md:block"/> 
          aapki ungliyon par. Bharosemand. Tez. Local.
        </motion.p>

        {/* --- THE MASTER SEARCH BAR (Premium Design) --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 group relative max-w-3xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center bg-white p-3 md:p-4 rounded-[32px] md:rounded-full shadow-[0_30px_100px_rgba(0,0,0,0.12)] border border-slate-100 gap-2 md:gap-0 ring-0 group-focus-within:ring-4 ring-orange-500/10 transition-all duration-500">
            
            {/* Location Indicator (Desktop Only) */}
            <div className="hidden md:flex items-center gap-2 px-6 border-r border-slate-100">
              <MapPin size={20} className="text-orange-500" />
              <span className="text-slate-900 font-bold whitespace-nowrap">Korba</span>
            </div>

            <div className="flex-1 flex items-center w-full px-4">
              <Search className="text-slate-400 mr-3" size={22} />
              <input 
                type="text" 
                placeholder="Dhoondhein Plumber, Doctor ya Shop..." 
                className="w-full h-12 md:h-14 bg-transparent outline-none text-slate-900 font-medium text-lg placeholder:text-slate-400"
              />
            </div>

            <button className="w-full md:w-auto bg-slate-900 text-white px-10 py-4 md:py-0 h-14 md:h-16 rounded-[24px] md:rounded-full font-black text-lg hover:bg-orange-600 hover:shadow-xl transition-all flex items-center justify-center gap-2 group-active:scale-95">
              Dhoondhein
              <Navigation size={18} className="rotate-45" />
            </button>
          </div>

          {/* Popular Tags (Mobile Friendly) */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aksar Search:</span>
             <Tag text="Electrician" />
             <Tag text="Ambulance" />
             <Tag text="Jewellery" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full cursor-pointer hover:bg-orange-50 hover:text-orange-600 transition-colors">
      {text}
    </span>
  );
}