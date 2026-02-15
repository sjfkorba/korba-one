"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sprout, Search, MapPin, TrendingUp, TrendingDown, 
  Clock, ArrowLeft, Filter, Info, 
  Loader2
} from "lucide-react";
import Link from "next/link";

// --- TYPE DEFINITION ---
interface MandiRate {
  id: string;
  itemName: string;
  price: string;
  unit: string;
  district: string;
  trend: 'up' | 'down' | 'stable';
  updatedAt: any;
}

export default function PublicMandiPage() {
  const [rates, setRates] = useState<MandiRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  // --- REAL-TIME SYNC ---
  useEffect(() => {
    const q = query(collection(db, "mandi_rates"), orderBy("updatedAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MandiRate[];
      
      setRates(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- FILTER LOGIC ---
  const filteredRates = rates.filter(r => {
    const matchesSearch = r.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === "All" || r.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  return (
    <main className="min-h-screen bg-[#F9FAFB] pb-20">
      
      {/* --- PREMIUM HEADER --- */}
      <header className="bg-slate-950 pt-16 pb-28 px-6 md:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-600/20 via-transparent to-transparent opacity-50" />
        
        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] hover:text-orange-500 transition-colors">
            <ArrowLeft size={14} /> Back to Korba One
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter italic uppercase leading-none">
                Market <br/> <span className="text-orange-600">Dynamics.</span>
              </h1>
              <p className="text-slate-400 font-bold text-sm md:text-xl max-w-xl">
                Chhattisgarh ki mandiyon ke taaza aur sateek bhav, ab aapki ungliyon par.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[32px] flex items-center gap-6">
               <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Live Updates</p>
                  <p className="text-2xl font-black text-white italic">{rates.length} Items</p>
               </div>
               <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-600/20">
                 <TrendingUp size={28} />
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- SEARCH & FILTERS --- */}
      <section className="max-w-7xl mx-auto -mt-12 px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          <div className="lg:col-span-3 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors" size={22} />
            <input 
              type="text" 
              placeholder="Sabzi, phal ya anaj dhoondhein..."
              className="w-full h-20 pl-16 pr-8 rounded-[30px] bg-white shadow-2xl font-bold text-xl outline-none focus:ring-[12px] ring-orange-600/5 transition-all text-slate-900 border border-slate-100"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full h-20 pl-14 pr-8 rounded-[30px] bg-white shadow-xl font-black text-xs uppercase tracking-widest outline-none border border-slate-100 appearance-none cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <option value="All">All Districts</option>
              <option value="Korba">Korba</option>
              <option value="Raipur">Raipur</option>
              <option value="Bilaspur">Bilaspur</option>
            </select>
          </div>
        </div>

        {/* --- DYNAMIC RATE CARDS --- */}
        <AnimatePresence mode="popLayout">
          {loading ? (
             <div className="flex justify-center py-20"><Loader2 className="animate-spin text-orange-600" size={48} /></div>
          ) : filteredRates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredRates.map((rate, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  key={rate.id} 
                  className="bg-white rounded-[45px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden relative"
                >
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <MapPin size={10} className="text-orange-500" /> {rate.district}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">{rate.itemName}</h3>
                    </div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${rate.trend === 'up' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                      {rate.trend === 'up' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    </div>
                  </div>

                  <div className="relative z-10 mb-8">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Today's Price</p>
                    <div className="flex items-baseline gap-1">
                       <span className="text-4xl font-black text-slate-950 tracking-tighter italic">₹{rate.price}</span>
                       <span className="text-slate-400 font-bold text-sm">/{rate.unit}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      <Clock size={12} /> {rate.updatedAt?.toDate ? rate.updatedAt.toDate().toLocaleDateString('en-IN') : 'Live'}
                    </div>
                    <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${rate.trend === 'up' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {rate.trend === 'up' ? '+ High' : '- Low'}
                    </span>
                  </div>
                  
                  {/* Decorative Gradient Accent */}
                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-20 transition-all group-hover:opacity-40 ${rate.trend === 'up' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[60px] border-2 border-dashed border-slate-200">
               <Sprout size={64} className="mx-auto text-slate-200 mb-6" />
               <h3 className="text-2xl font-black text-slate-400 uppercase italic">Data Not Found</h3>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Hum is item ka bhav jald hi update karenge.</p>
            </div>
          )}
        </AnimatePresence>

        {/* --- INFO BANNER --- */}
        <div className="mt-20 p-10 bg-orange-600 rounded-[50px] shadow-2xl shadow-orange-600/20 flex flex-col md:flex-row items-center gap-8 text-white">
           <div className="bg-white/20 p-6 rounded-[32px] backdrop-blur-md">
             <Info size={40} />
           </div>
           <div className="space-y-2 text-center md:text-left">
             <h4 className="text-2xl font-black italic uppercase tracking-tighter leading-none">Market Accuracy Protocol</h4>
             <p className="text-orange-100 font-medium text-lg leading-relaxed">
               Ye rates Shatrughan Sharma ji ki team dwara local mandiyon se verify karke update kiye jate hain. Rates mein din bhar mein badlav ho sakta hai.
             </p>
           </div>
        </div>
      </section>
    </main>
  );
}