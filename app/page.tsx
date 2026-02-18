"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { db, auth } from '@/lib/firebase';
import { 
  collection, query, onSnapshot, orderBy, 
  limit, where, doc, getDoc 
} from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, ArrowRight, Zap, Star, MapPin, 
  ShoppingBag, ChevronRight, Globe, User, Clock,
  Navigation, Heart, Sparkles, Building2, Loader2, ImageOff,
  CheckCircle2
} from 'lucide-react';

import GlobalSearch from "@/components/GlobalSearch";

// --- 🎯 CATEGORY MASTER LIST ---
const CATEGORIES = [
  "All", "Car dealer", "Taxi service", "Hospitals", "Spa and saloon", 
  "Wedding planners", "Solar installers", "Insurance", "Loans", "Jobs", 
  "Automobile", "Doctors", "Gym", "Electronics", "Travel", "Real Estate", 
  "Furniture", "Decoration", "Events", "Industrial"
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [listings, setListings] = useState<any[]>([]);
  const [mandiRates, setMandiRates] = useState<any[]>([]);
  const [featuredVendors, setFeaturedVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 1. Live Mandi Ticker
    const unsubMandi = onSnapshot(query(collection(db, "mandi_rates"), limit(15)), (snap) => {
      setMandiRates(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // 2. Elite Vendors
    const unsubVendors = onSnapshot(
      query(collection(db, "users"), where("isVerified", "==", true), limit(6)), 
      (snap) => {
        setFeaturedVendors(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      }
    );

    return () => { unsubMandi(); unsubVendors(); };
  }, []);

  // 3. 🚀 DYNAMIC CATEGORY FILTER LOGIC
  useEffect(() => {
    setLoading(true);
    let q;
    if (selectedCategory === "All") {
      q = query(
        collection(db, "listings"), 
        where("isActive", "==", true), 
        orderBy("createdAt", "desc"), 
        limit(12)
      );
    } else {
      q = query(
        collection(db, "listings"), 
        where("isActive", "==", true), 
        where("category", "==", selectedCategory),
        orderBy("createdAt", "desc"), 
        limit(12)
      );
    }

    const unsubAds = onSnapshot(q, (snap) => {
      setListings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });

    return () => unsubAds();
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-[#FDFDFD] selection:bg-orange-100 font-sans antialiased">
      
      {/* 🪙 1. LIVE MANDI STRIP */}
      <div className="bg-slate-950 py-3 overflow-hidden border-b border-white/5 sticky top-0 z-50">
        <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
          {mandiRates.map((rate) => (
            <div key={rate.id} className="flex items-center gap-3 text-white px-6 border-r border-white/10 group cursor-default">
              <span className="text-[8px] font-black uppercase text-slate-500 tracking-[0.3em] group-hover:text-orange-500 transition-colors">{rate.itemName}</span>
              <span className="text-orange-500 font-black italic tracking-tighter text-sm">₹{rate.price}</span>
            </div>
          ))}
        </div>
      </div>

     {/* 🏙️ 2. THE LANDMARK HERO (Identity-First Logic) */}
<section className="relative pt-20 pb-40 px-6 overflow-hidden bg-white">
  
  {/* 🎨 PREMIUM BACKGROUND ILLUSTRATION LAYER */}
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
    {/* Abstract Glows */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/[0.03] blur-[120px] rounded-full -mr-40 -mt-40" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/[0.02] blur-[100px] rounded-full -ml-20 -mb-20" />

    {/* Transparent Icons Group - Left Side */}
    <div className="absolute top-20 left-10 md:left-20 opacity-[0.03] -rotate-12">
      <Building2 size={120} strokeWidth={1} />
    </div>
    <div className="absolute bottom-40 left-20 md:left-40 opacity-[0.04] rotate-12">
      <Zap size={80} strokeWidth={1} />
    </div>
    <div className="absolute top-1/2 left-5 opacity-[0.02] -rotate-45">
      <Navigation size={150} strokeWidth={0.5} />
    </div>

    {/* Transparent Icons Group - Right Side */}
    <div className="absolute top-40 right-10 md:right-20 opacity-[0.03] rotate-12">
      <ShieldCheck size={130} strokeWidth={1} />
    </div>
    <div className="absolute bottom-20 right-20 md:right-40 opacity-[0.04] -rotate-12">
      <MapPin size={90} strokeWidth={1} />
    </div>
    <div className="absolute top-1/2 right-5 opacity-[0.02] rotate-45">
      <Globe size={160} strokeWidth={0.5} />
    </div>
  </div>

  {/* 🏛️ HERO CONTENT */}
  <div className="max-w-7xl mx-auto relative z-10 text-center space-y-16">
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      <div className="inline-flex items-center gap-2 bg-slate-950 text-white px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.4em] shadow-2xl">
        <ShieldCheck size={12} className="text-orange-500" /> Korba One Official Network
      </div>
      
      <h1 className="text-6xl md:text-[130px] font-black tracking-tighter uppercase italic leading-[0.85] text-slate-900">
        The City <br/> 
        <span className="relative inline-block">
          <span className="text-orange-600">Authority.</span>
          {/* Subtle underline for branding */}
          <div className="absolute -bottom-2 left-0 w-full h-1 md:h-2 bg-slate-100 rounded-full" />
        </span>
      </h1>

      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.5em] max-w-xl mx-auto leading-relaxed">
        Premium Directory • Verified Listings • City Insights
      </p>
    </motion.div>

    {/* 🔍 SEARCH BRIDGE */}
    <div className="max-w-3xl mx-auto relative group">
      {/* Search Bar Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-[35px] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
      <div className="relative">
        <GlobalSearch />
      </div>
    </div>
  </div>
</section>

      {/* 🏷️ 3. DYNAMIC CATEGORY FILTER HUB */}
      <section className="px-6 -mt-10 max-w-7xl mx-auto relative z-20 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 p-4 bg-white/60 backdrop-blur-2xl rounded-[40px] border border-white shadow-2xl min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-4 rounded-[25px] font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${
                selectedCategory === cat 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' 
                : 'bg-white text-slate-400 hover:text-slate-950 hover:bg-slate-50 border border-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

    
      {/* 💎 4. KORBA EXCLUSIVES (Responsive Smart Grid) */}
<section className="px-4 md:px-6 py-16 md:py-24 max-w-7xl mx-auto space-y-10 md:space-y-16">
  <div className="flex justify-between items-end px-2 md:px-4">
     <h2 className="text-3xl md:text-7xl font-black uppercase italic tracking-tighter text-slate-950">
       Korba <span className="text-orange-600">Exclusives.</span>
     </h2>
  </div>

  {loading ? (
    <div className="flex flex-col items-center justify-center py-40">
      <Loader2 className="animate-spin text-orange-600 mb-4" size={40} />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Updating Feed...</p>
    </div>
  ) : (
    /* 📱 Mobile: 2 Columns | 🖥️ Desktop: 3 to 4 Columns */
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10">
      <AnimatePresence mode="popLayout">
        {listings.length > 0 ? listings.map((ad) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            key={ad.id}
            /* Styling optimized for both mobile (compact) and desktop (big & minimal) */
            className="group bg-white rounded-[30px] md:rounded-[55px] border border-slate-100 p-2 md:p-3 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] transition-all duration-700"
          >
            <Link href={`/p/${ad.username || '...'}/ad/${ad.slug}`}>
              {/* Image Aspect Ratio optimized for grid visibility */}
              <div className="relative aspect-[1/1.1] md:aspect-[4/5] bg-slate-50 rounded-[25px] md:rounded-[45px] overflow-hidden">
                <img 
                  src={ad.imageUrl || 'https://via.placeholder.com/600x800?text=Premium+Listing'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  alt={ad.title} 
                />
                
                {/* Price Tag: Desktop pe bada, Mobile pe compact */}
                <div className="absolute bottom-2 left-2 right-2 md:bottom-6 md:left-6 md:right-6 bg-slate-950/90 backdrop-blur-xl p-2.5 md:p-5 rounded-[18px] md:rounded-[30px] shadow-2xl">
                  <p className="hidden md:block text-[8px] font-black uppercase tracking-widest text-orange-500 mb-1 italic">Value</p>
                  <p className="text-sm md:text-2xl font-black italic tracking-tighter text-white">
                    ₹{Number(ad.price).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
              
              {/* Content Area: Mobile pe text chota rakha gaya hai */}
              <div className="px-2 py-4 md:px-6 md:py-8 space-y-3 md:space-y-5">
                 <h4 className="text-sm md:text-xl font-black text-slate-900 leading-[1.1] uppercase italic line-clamp-2 group-hover:text-orange-600 transition-colors">
                   {ad.title}
                 </h4>
                 
                 {/* Metadata: Mobile pe extra padding hatayi gayi hai */}
                 <div className="pt-2 md:pt-6 border-t border-slate-50 flex items-center justify-between text-[7px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-1 md:gap-2 truncate max-w-[50%]">
                      <User size={10} className="md:w-3 md:h-3"/> {ad.username || 'Owner'}
                    </div>
                    <div className="flex items-center gap-1 md:gap-1.5 whitespace-nowrap">
                      <Clock size={10} className="md:w-3 md:h-3"/> 
                      {ad.createdAt ? ad.createdAt.toDate().toLocaleDateString('en-IN', {day:'2-digit', month:'short'}) : 'Today'}
                    </div>
                 </div>
              </div>
            </Link>
          </motion.div>
        )) : (
          <div className="col-span-full py-20 md:py-40 text-center space-y-6">
             <Building2 size={60} className="mx-auto text-slate-100" />
             <h3 className="text-xl md:text-2xl font-black italic uppercase text-slate-300">No Listings in {selectedCategory}</h3>
          </div>
        )}
      </AnimatePresence>
    </div>
  )}
</section>



    {/* 🏢 5. THE NETWORK (Elite Business Hub) */}
<section className="bg-[#050505] py-24 md:py-40 rounded-[60px] md:rounded-[120px] mx-2 md:mx-10 relative overflow-hidden">
  
  {/* Ambient Background Glows */}
  <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

  <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24 md:space-y-32">
    
    {/* Heading with Subtitle */}
    <div className="text-center space-y-6">
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-orange-500"
       >
         <ShieldCheck size={14} /> Certified City Partners
       </motion.div>
       <h2 className="text-6xl md:text-[120px] font-black text-white italic uppercase tracking-tighter leading-none">
         The <span className="text-orange-500 underline decoration-white/10 underline-offset-8">Network.</span>
       </h2>
       <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.5em] max-w-xl mx-auto">
         Exclusive verified business profiles of Korba
       </p>
    </div>

    {/* Elite Vendor Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      {featuredVendors.map((v) => (
        <motion.div 
          key={v.id}
          whileHover={{ y: -15 }}
          className="group relative bg-white/[0.02] border border-white/5 p-12 rounded-[70px] flex flex-col items-center text-center space-y-10 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-700 shadow-2xl"
        >
          {/* Decorative Background Icon */}
          <div className="absolute top-10 right-10 opacity-5 text-white group-hover:opacity-20 transition-opacity">
            <Zap size={60} strokeWidth={1} />
          </div>

          {/* Profile Image with Golden Ring */}
          <div className="relative">
            <div className="w-32 h-32 bg-white p-1.5 rounded-[40px] shadow-[0_0_50px_rgba(234,88,12,0.1)] overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
              <img 
                src={v.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${v.username}`} 
                className="w-full h-full object-cover rounded-[35px]" 
                alt={v.displayName} 
              />
            </div>
            {/* Verified Floating Badge */}
            <div className="absolute -bottom-2 -right-2 bg-orange-600 p-2.5 rounded-2xl shadow-2xl border-4 border-[#050505]">
              <CheckCircle2 size={16} className="text-white" />
            </div>
          </div>

          {/* Business Info */}
          <div className="space-y-4">
             <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">
               {v.displayName}
             </h4>
             <div className="flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-orange-600/30"></span>
                <p className="text-orange-500 text-[9px] font-black uppercase tracking-[0.4em]">Elite Business</p>
                <span className="h-px w-8 bg-orange-600/30"></span>
             </div>
          </div>

          {/* Premium CTA Button */}
          <Link href={`/p/${v.username}`} className="w-full relative z-10">
             <button className="w-full bg-white text-slate-950 py-7 rounded-[35px] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-orange-600 hover:text-white transition-all shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)] active:scale-95 flex items-center justify-center gap-3">
               Explore Profile <ArrowRight size={16} />
             </button>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* 💎 6. FINAL CINEMATIC CTA: THE LEGEND IDENTITY */}
<section className="relative py-40 md:py-60 overflow-hidden bg-white">
  
  {/* Abstract Background Elements */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/[0.03] blur-[150px] rounded-full pointer-events-none" />
  
  <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-20">
    
    {/* Headline with Staggered Animation */}
    <div className="space-y-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 text-orange-600 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] italic mb-6"
      >
        <Sparkles size={16} /> Your Legacy Starts Here
      </motion.div>
      
      <h2 className="text-7xl md:text-[160px] font-black tracking-tighter uppercase italic leading-[0.8] text-slate-950">
        Become <br/> 
        <span className="relative inline-block text-orange-600">
          The Legend.
          {/* Subtle underline glow */}
          <div className="absolute -bottom-4 left-0 w-full h-2 bg-orange-600/10 blur-md rounded-full" />
        </span>
      </h2>
    </div>

    {/* The Ultimate Action Bridge */}
    <div className="flex flex-col items-center gap-10">
      <Link href="/register" className="group relative">
        {/* Outer Pulsating Aura */}
        <div className="absolute -inset-6 bg-orange-600/20 rounded-[50px] blur-2xl group-hover:bg-orange-600/40 transition-all duration-1000 animate-pulse" />
        
        {/* Main Button Body */}
        <motion.button 
          whileHover={{ scale: 1.05, y: -10 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-12 md:px-20 py-8 md:py-10 bg-slate-950 text-white rounded-[45px] font-black text-xl md:text-2xl uppercase italic tracking-[0.2em] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] flex items-center gap-6 overflow-hidden transition-all duration-700"
        >
          {/* Internal Glow Effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <span className="relative z-10">Establish My Identity</span>
          <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 bg-orange-600 rounded-2xl flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-1000 shadow-xl">
            <ArrowRight size={28} className="text-white" />
          </div>
        </motion.button>
      </Link>

      {/* Trust & Social Proof */}
      <div className="space-y-6">
        <p className="text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] italic">
          Join 240+ Verified Korba Authorities
        </p>
        <div className="flex justify-center -space-x-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-12 h-12 rounded-2xl border-4 border-white bg-slate-100 overflow-hidden shadow-xl transform hover:-translate-y-2 transition-transform duration-500">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 50}`} alt="user" />
            </div>
          ))}
          <div className="w-12 h-12 rounded-2xl border-4 border-white bg-orange-600 flex items-center justify-center text-[10px] font-black text-white shadow-xl italic">
            +ALL
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom Decorative Label */}
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full text-center px-6">
    <p className="text-slate-200 font-black text-[6vw] md:text-[10vw] uppercase italic leading-none opacity-20 select-none pointer-events-none tracking-widest">
      KORBA ONE IDENTITY
    </p>
  </div>
</section>
    </main>
  );
}