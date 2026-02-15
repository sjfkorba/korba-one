"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { CATEGORIES } from '@/lib/constants'; 
import { Search, Phone, Share2, MapPin, ShieldCheck, Loader2, Compass, ArrowLeft, MessageCircle, ExternalLink, Star, Filter, SlidersHorizontal, CheckCircle2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

function DirectoryContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [vendors, setVendors] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    setSelectedCategory(searchParams.get('cat') || 'all');
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    // Hybrid Query: Indexing ke crash se bachne ke liye sirf verified mangaein
    const q = query(collection(db, "vendors"), where("isVerified", "==", true));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allVerified = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const filtered = allVerified.filter((v: any) => {
        const matchesCat = selectedCategory === 'all' || 
                           String(v.category).toLowerCase() === selectedCategory.toLowerCase();
        const term = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery || 
                             String(v.shopName || "").toLowerCase().includes(term) || 
                             String(v.keywords || "").toLowerCase().includes(term);
        return matchesCat && matchesSearch;
      });

      setVendors(filtered);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedCategory, searchQuery]);

  const handleAction = async (vendor: any, type: 'call' | 'whatsapp') => {
    try {
      await addDoc(collection(db, "leads"), {
        vendorId: vendor.id,
        vendorName: vendor.shopName || "Unknown",
        action: type,
        timestamp: serverTimestamp(),
      });
      window.location.href = type === 'call' ? `tel:${vendor.phone}` : `https://wa.me/91${vendor.phone}`;
    } catch (e) { console.error(e); }
  };

  return (
    <main className="min-h-screen bg-[#F4F7FA] font-sans">
      {/* 1. TOP MINIMAL NAV */}
      <nav className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-slate-950 p-2 rounded-xl group-hover:bg-orange-600 transition-colors">
              <ArrowLeft size={18} className="text-white" />
            </div>
            <span className="font-black uppercase tracking-tighter text-xl italic text-slate-900 hidden md:block">Korba One</span>
          </Link>
          
          <div className="flex-grow max-w-2xl relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Dhoondhiye Plumber, Mechanic ya Shops..." 
              className="w-full h-14 pl-14 pr-6 rounded-2xl bg-slate-100 border-none outline-none focus:ring-4 ring-orange-500/10 font-bold text-slate-900 transition-all" 
            />
          </div>

          <button onClick={() => setShowMobileFilters(true)} className="lg:hidden p-4 bg-slate-100 rounded-2xl text-slate-600">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex gap-8 p-6 lg:p-10">
        
        {/* 2. SIDEBAR FILTERS (Naukri/Indeed Style) */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-8">
          <div className="bg-white p-8 rounded-[35px] border border-slate-200 shadow-sm sticky top-28">
            <h3 className="font-black text-slate-900 uppercase italic tracking-tighter mb-6 flex items-center gap-2">
              <Filter size={16} className="text-orange-600" /> Categories
            </h3>
            <div className="space-y-2">
              <FilterBtn label="All Services" active={selectedCategory === 'all'} onClick={() => setSelectedCategory('all')} />
              {CATEGORIES.map(cat => (
                <FilterBtn 
                  key={cat.id} 
                  label={cat.name} 
                  icon={cat.icon}
                  active={selectedCategory === cat.id} 
                  onClick={() => setSelectedCategory(cat.id)} 
                />
              ))}
            </div>
          </div>
          
          <div className="bg-orange-600 p-8 rounded-[35px] text-white shadow-xl shadow-orange-600/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform duration-700"><Zap size={100} /></div>
            <h4 className="font-black italic uppercase leading-tight mb-4">Want to Grow <br/> Business?</h4>
            <Link href="/register">
              <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">List Shop Free</button>
            </Link>
          </div>
        </aside>

        {/* 3. LISTING FEED (OLX/Cars24 Style) */}
        <section className="flex-grow space-y-6">
          <div className="flex items-center justify-between mb-4">
             <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Showing {vendors.length} Verified Experts in Korba</p>
          </div>

          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="flex flex-col items-center py-40 opacity-20"><Loader2 className="animate-spin text-orange-600" size={60} /></div>
            ) : vendors.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {vendors.map((vendor, index) => (
                  <motion.div 
                    layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                    key={vendor.id}
                    className="bg-white rounded-[40px] border border-slate-200 hover:border-orange-200 transition-all duration-500 overflow-hidden group hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex flex-col md:flex-row p-6 md:p-10 gap-8 items-start">
                      {/* Image Frame */}
                      <div className="w-full md:w-56 h-48 bg-slate-50 rounded-[30px] overflow-hidden shrink-0 border border-slate-100">
                        <img src={vendor.imageUrl || 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?q=80&w=400'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                      </div>

                      {/* Content Section */}
                      <div className="flex-grow space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="bg-slate-900 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{vendor.category}</span>
                          <div className="flex items-center gap-1 text-emerald-600 font-black text-[9px] uppercase tracking-widest"><CheckCircle2 size={12} /> Verified</div>
                          <div className="flex items-center gap-1 text-orange-500 font-black text-[9px] tracking-widest uppercase"><Star size={12} fill="currentColor" /> 4.9 Rating</div>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-black text-slate-950 uppercase italic tracking-tighter group-hover:text-orange-600 transition-colors">
                          {vendor.shopName || vendor.name}
                        </h3>

                        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                          <MapPin size={16} className="text-orange-500" /> {vendor.address || "Korba, Chhattisgarh"}
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                           {(Array.isArray(vendor.keywords) ? vendor.keywords : []).slice(0, 3).map((k:any, i:number) => (
                             <span key={i} className="text-[10px] text-slate-400 font-black bg-slate-50 px-3 py-1 rounded-full uppercase border border-slate-100 shadow-inner">#{k}</span>
                           ))}
                        </div>
                      </div>

                      {/* Right Action Hub */}
                      <div className="w-full md:w-52 flex flex-col gap-3 shrink-0">
                        <Link href={`/directory/${vendor.id}`}>
                          <button className="w-full bg-slate-50 text-slate-950 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border border-slate-100 hover:bg-orange-50 hover:text-orange-600 transition-all flex items-center justify-center gap-2">
                            View Details <ArrowRight size={14} />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleAction(vendor, 'call')}
                          className="w-full bg-slate-950 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-orange-600 shadow-xl transition-all"
                        >
                          <Phone size={16} /> Contact Now
                        </button>
                        <button 
                          onClick={() => handleAction(vendor, 'whatsapp')}
                          className="w-full bg-emerald-50 text-emerald-600 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100"
                        >
                          <MessageCircle size={16} /> WhatsApp
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* MOBILE FILTERS MODAL */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md p-8 lg:hidden">
             <div className="flex justify-between items-center mb-8 text-white">
                <h3 className="font-black text-2xl uppercase italic">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)} className="p-3 bg-white/10 rounded-full"><X size={24} /></button>
             </div>
             <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[70vh]">
                <FilterBtn label="All" active={selectedCategory === 'all'} onClick={() => { setSelectedCategory('all'); setShowMobileFilters(false); }} invert />
                {CATEGORIES.map(cat => (
                  <FilterBtn 
                    key={cat.id} 
                    label={cat.name} 
                    active={selectedCategory === cat.id} 
                    onClick={() => { setSelectedCategory(cat.id); setShowMobileFilters(false); }} 
                    invert
                  />
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function FilterBtn({ label, active, onClick, icon, invert }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
        active 
        ? 'bg-orange-600 text-white shadow-lg translate-x-2' 
        : invert ? 'bg-white/5 text-white/60' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
      }`}
    >
      {icon && <span>{icon}</span>} {label}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-40 bg-white rounded-[60px] border border-slate-200">
      <Compass size={80} className="mx-auto text-slate-200 mb-8 animate-pulse" />
      <h3 className="text-4xl font-black text-slate-950 italic uppercase tracking-tighter">No Experts Found.</h3>
      <p className="text-slate-400 mt-4 font-bold uppercase text-xs tracking-widest">Adjust your filters to find more Pros in Korba</p>
    </div>
  );
}

export default function DirectoryPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-slate-950 text-white italic tracking-widest uppercase text-[10px]">Syncing Korba Intelligence...</div>}>
      <DirectoryContent />
    </Suspense>
  );
}

// Re-using pichle icons imports
import { X, ArrowRight } from "lucide-react";