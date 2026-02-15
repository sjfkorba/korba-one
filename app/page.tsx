"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, orderBy, limit, where } from 'firebase/firestore';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  ShieldCheck, ArrowRight, Zap, Star, Users, PhoneCall, 
  CheckCircle2, Globe, TrendingUp, Navigation, Sprout, Search, Loader2 
} from 'lucide-react';

import GlobalSearch from "@/components/GlobalSearch";
import CategoryGrid from '@/components/CategoryGrid';

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

function SafeImage({ src, alt, className }: { src?: string; alt: string; className: string }) {
  const [error, setError] = useState(false);
  const fallback = "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1200&auto=format&fit=crop";
  return (
    <img 
      src={error || !src ? fallback : src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)} 
    />
  );
}

export default function Home() {
  const [ads, setAds] = useState<any[]>([]);
  const [mandiRates, setMandiRates] = useState<any[]>([]);
  const [featuredVendors, setFeaturedVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAds = onSnapshot(query(collection(db, "advertisements"), limit(3)), (snap) => {
      setAds(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubMandi = onSnapshot(query(collection(db, "mandi_rates"), orderBy("updatedAt", "desc"), limit(12)), (snap) => {
      setMandiRates(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubVendors = onSnapshot(query(collection(db, "vendors"), where("isVerified", "==", true), limit(6)), (snap) => {
      setFeaturedVendors(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return () => { unsubAds(); unsubMandi(); unsubVendors(); };
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden font-sans">
      
      {/* 🔴 1. LIVE MANDI TICKER */}
      <div className="bg-slate-950 py-4 border-b border-white/5 relative z-[60] overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap items-center gap-12">
          {mandiRates.map((rate) => (
            <div key={rate.id} className="flex items-center gap-4 text-white px-6 border-r border-white/10">
              <Sprout size={16} className="text-orange-500" />
              <span className="text-[11px] font-black uppercase tracking-widest">{rate.itemName}:</span>
              <span className="text-orange-500 font-black text-lg italic">₹{rate.price}/{rate.unit}</span>
              <span className={`text-[10px] font-bold ${rate.trend === 'up' ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>
                {rate.trend === 'up' ? '▲ TEZI' : '▼ MANDA'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 🟠 2. PREMIUM HERO SECTION */}
      <section className="relative min-h-[90vh] w-full flex items-center px-6 md:px-20 overflow-hidden pb-40 pt-20">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            {ads.length > 0 ? (
              <motion.div key={ads[0].id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                <SafeImage src={ads[0].imageUrl} alt="Campaign" className="w-full h-full object-cover brightness-[0.25] scale-105" />
              </motion.div>
            ) : (
              <div className="w-full h-full bg-slate-900" />
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 text-white px-6 py-2 rounded-full mb-10">
               <Zap size={14} className="text-orange-500" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Live in Korba, Chhattisgarh</span>
            </div>
            <h1 className="text-7xl md:text-[160px] font-black text-white tracking-tighter leading-[0.8] italic uppercase">
              Korba <br/> <span className="text-orange-600 underline decoration-white/10">Connected.</span>
            </h1>
          </motion.div>
          <GlobalSearch />
        </div>
      </section>

      {/* 🟡 3. BENTO CATEGORY HUB */}
      <section className="relative z-20 -mt-32 px-6 max-w-7xl mx-auto pb-32">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <CategoryGrid />
        </motion.div>
      </section>

      {/* 🟢 4. VERIFIED VENDORS (Integrated with Dynamic Profile) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
           <div className="space-y-4">
              <h2 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">
                Elite <span className="text-orange-600">Pros.</span>
              </h2>
              <p className="text-slate-500 text-xl font-medium max-w-xl">Verified businesses aur premium services ka Chhattisgarh ka sabse bada network.</p>
           </div>
           <Link href="/directory" className="group flex items-center gap-4 bg-white px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-widest border border-slate-100 shadow-xl hover:bg-orange-600 hover:text-white transition-all">
             Full Directory <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {featuredVendors.map((vendor, idx) => (
             <motion.div 
               key={vendor.id}
               variants={fadeInUp}
               initial="initial"
               whileInView="whiteInView"
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="bg-white p-12 rounded-[60px] border border-slate-50 shadow-sm hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 group relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="w-24 h-24 bg-slate-50 rounded-[30px] overflow-hidden mb-10 shadow-inner">
                   <SafeImage src={vendor.imageUrl} alt={vendor.shopName} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000" />
                </div>
                <h4 className="text-3xl font-black text-slate-900 mb-2 italic uppercase">{vendor.shopName}</h4>
                <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-10">{vendor.category} • Verified Member</p>
                
                {/* --- THE INTEGRATION: Dynamic Profile Link --- */}
                <Link href={`/directory/${vendor.id}`}>
                   <button className="w-full bg-slate-950 text-white py-6 rounded-[25px] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-orange-600 shadow-2xl transition-all active:scale-95">
                     View Full Profile
                   </button>
                </Link>
             </motion.div>
           ))}
        </div>
      </section>

      {/* 🔵 5. SHATRUGHAN SHARMA PERSONALIZED CTA */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="relative group overflow-hidden bg-slate-950 rounded-[80px] p-12 md:p-32 text-white shadow-3xl">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-orange-600/20 blur-[180px] rounded-full" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 space-y-12">
              <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-md text-orange-400 px-8 py-4 rounded-full border border-white/10">
                <TrendingUp size={20} />
                <span className="text-sm font-black uppercase tracking-[0.3em]">Building The Future of Korba</span>
              </div>
              <h2 className="text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter uppercase italic">
                Join <br/> <span className="text-orange-600">The Power.</span>
              </h2>
              <p className="text-slate-400 text-xl md:text-3xl font-medium max-w-2xl leading-relaxed">
                Platform ka vision bada hai. Chhattisgarh ki har shop ko digital authority banana hamara mission hai.
              </p>
              <div className="pt-10 flex flex-col sm:flex-row items-center gap-10">
                <Link href="/register" className="w-full sm:w-auto">
                  <motion.button whileHover={{ scale: 1.05, y: -5 }} className="w-full sm:w-auto bg-orange-600 text-white px-16 py-8 rounded-[35px] font-black text-2xl shadow-3xl shadow-orange-600/30 flex items-center justify-center gap-4 italic">
                    Register Shop <ArrowRight size={28} />
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ⚪ 6. FINAL STATS SECTION */}
      <section className="px-6 py-40 max-w-7xl mx-auto border-t border-slate-100">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          <StatCard icon={<Users size={40} className="text-orange-600" />} title="15k+" desc="Daily Active Users" delay={0.1} />
          <StatCard icon={<ShieldCheck size={40} className="text-blue-600" />} title="600+" desc="Verified Shops" delay={0.2} />
          <StatCard icon={<TrendingUp size={40} className="text-emerald-500" />} title="33" desc="Districts Ready" delay={0.3} className="col-span-2 md:col-span-1" />
        </div>
      </section>
    </main>
  );
}

function StatCard({ icon, title, desc, className = "", delay }: any) {
  return (
    <motion.div variants={fadeInUp} transition={{ delay }} className={`bg-white p-16 rounded-[60px] flex flex-col items-center text-center gap-6 border border-slate-50 shadow-sm hover:shadow-3xl transition-all duration-700 ${className}`}>
      <div className="bg-slate-50 p-8 rounded-3xl mb-4 shadow-inner">{icon}</div>
      <div className="text-6xl font-black text-slate-950 tracking-tighter italic">{title}</div>
      <div className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">{desc}</div>
    </motion.div>
  );
}