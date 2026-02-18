"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { 
  collection, query, where, onSnapshot, 
  addDoc, serverTimestamp 
} from 'firebase/firestore';
import { CATEGORIES } from '@/lib/constants'; 
import { 
  Search, Phone, MapPin, ShieldCheck, Loader2, Compass, 
  ArrowLeft, MessageCircle, Star, Filter, 
  SlidersHorizontal, CheckCircle2, Zap, X, ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

function DirectoryContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [dataList, setDataList] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    setSelectedCategory(searchParams.get('cat') || 'all');
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    
    // 🚀 FIXED: Pointing to 'listings' collection as per your latest Firebase data
    const q = query(
      collection(db, "listings"), 
      where("isActive", "==", true)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allResults = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const filtered = allResults.filter((item: any) => {
        const matchesCat = selectedCategory === 'all' || 
                           String(item.category).toLowerCase() === selectedCategory.toLowerCase();
        
        const term = searchQuery.toLowerCase();
        // 🚀 FIXED: Mapping both Title and ShopName for Jobs/Shops compatibility
        const matchesSearch = !searchQuery || 
                             String(item.title || "").toLowerCase().includes(term) || 
                             String(item.shopName || "").toLowerCase().includes(term) ||
                             String(item.description || "").toLowerCase().includes(term);
        
        return matchesCat && matchesSearch;
      });

      setDataList(filtered);
      setLoading(false);
    }, (error) => {
      console.error("Firebase Permission Error:", error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedCategory, searchQuery]);

  const handleAction = async (item: any, type: 'call' | 'whatsapp') => {
    try {
      // 🚀 FIXED: Ensuring leads collection handles public clicks
      await addDoc(collection(db, "leads"), {
        vendorId: item.id,
        vendorName: item.title || item.shopName || "Unknown",
        action: type,
        timestamp: serverTimestamp(),
      });
      
      const phoneNo = item.phone || "0000000000";
      if (type === 'call') {
        window.location.href = `tel:${phoneNo}`;
      } else {
        window.open(`https://wa.me/91${phoneNo}`, '_blank');
      }
    } catch (e) { console.error("Action Tracking Error:", e); }
  };

  return (
    <main className="min-h-screen bg-[#F4F7FA] font-sans antialiased">
      {/* 1. TOP NAV */}
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
              placeholder="Search Shops, Services or Jobs..." 
              className="w-full h-14 pl-14 pr-6 rounded-2xl bg-slate-100 border-none outline-none focus:ring-4 ring-orange-500/10 font-bold text-slate-900 transition-all" 
            />
          </div>

          <button onClick={() => setShowMobileFilters(true)} className="lg:hidden p-4 bg-slate-100 rounded-2xl text-slate-600 hover:bg-slate-200 transition-all">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-4 md:p-10">
        
        {/* 2. SIDEBAR */}
        <aside className="hidden lg:block w-72 shrink-0">
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
        </aside>

        {/* 3. FEED */}
        <section className="flex-grow space-y-6">
          <div className="px-2"><p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Showing {dataList.length} Verified Authorities</p></div>

          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="flex justify-center py-40"><Loader2 className="animate-spin text-orange-600" size={60} /></div>
            ) : dataList.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {dataList.map((item, index) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    key={item.id}
    className="bg-white rounded-3xl border border-slate-200 hover:border-orange-200 transition-all duration-300 overflow-hidden group hover:shadow-xl"
  >
    <div className="flex flex-col md:flex-row p-6 gap-6 items-start">

      {/* IMAGE */}
      <div className="w-full md:w-52 h-44 bg-slate-100 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center">
        <img
          src={
            item.imageUrl ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${
              item.title || item.shopName || "K"
            }`
          }
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt=""
        />
      </div>

      {/* CONTENT */}
      <div className="flex-grow space-y-3">

        {/* CATEGORY + VERIFIED */}
        <div className="flex items-center gap-3 text-xs">
          <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-semibold">
            {item.category}
          </span>
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <CheckCircle2 size={14} /> Verified
          </span>
        </div>

        {/* 🔥 NEW TITLE STYLE */}
        <h3 className="text-xl md:text-2xl font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
          {item.title || item.shopName}
        </h3>

        {/* LOCATION */}
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <MapPin size={14} className="text-orange-500" />
          <span className="truncate">
            {item.address || "Korba City Center"}
          </span>
        </div>

        {/* DESCRIPTION PREVIEW */}
        {item.description && (
          <p className="text-slate-500 text-sm line-clamp-2">
            {item.description}
          </p>
        )}

      </div>

      {/* ACTION HUB */}
      <div className="w-full md:w-48 flex flex-col gap-3 shrink-0">

        <Link href={`/p/${item.ownerUid}/ad/${item.slug}`}>
          <button className="w-full bg-slate-100 text-slate-900 py-3 rounded-xl font-medium text-sm hover:bg-orange-50 hover:text-orange-600 transition-all">
            View Details
          </button>
        </Link>

        <button
          onClick={() => handleAction(item, "call")}
          className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-orange-600 transition-all"
        >
          <Phone size={16} /> Call
        </button>

        <button
          onClick={() => handleAction(item, "whatsapp")}
          className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all"
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

      {/* MOBILE FILTERS */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl p-8 lg:hidden">
             <div className="flex justify-between items-center mb-8 text-white">
                <h3 className="font-black text-2xl uppercase italic">Selection</h3>
                <button onClick={() => setShowMobileFilters(false)} className="p-3 bg-white/10 rounded-full"><X size={24} /></button>
             </div>
             <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[75vh]">
                <FilterBtn label="All" active={selectedCategory === 'all'} onClick={() => { setSelectedCategory('all'); setShowMobileFilters(false); }} invert />
                {CATEGORIES.map(cat => (
                  <FilterBtn key={cat.id} label={cat.name} active={selectedCategory === cat.id} onClick={() => { setSelectedCategory(cat.id); setShowMobileFilters(false); }} invert />
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function FilterBtn({ label, active, onClick, icon, invert }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all ${active ? 'bg-orange-600 text-white shadow-lg' : invert ? 'bg-white/5 text-white/60' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'}`}>
      {icon && <span>{icon}</span>} {label}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-32 bg-white rounded-[60px] border border-slate-200">
      <Compass size={60} className="mx-auto text-slate-200 mb-6" />
      <h3 className="text-3xl font-black text-slate-950 italic uppercase tracking-tighter">No Experts Found.</h3>
      <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-widest">Adjust filters for Korba results</p>
    </div>
  );
}

export default function DirectoryPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-[#FDFDFD] text-slate-950 italic font-black uppercase text-[10px] tracking-widest">Loading Korba Network...</div>}>
      <DirectoryContent />
    </Suspense>
  );
}