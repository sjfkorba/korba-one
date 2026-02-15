import { Metadata } from 'next';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Phone, MapPin, ShieldCheck, MessageCircle, ArrowLeft, Share2, Clock, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>; // UPDATED: Params is now a Promise
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params; // Await params first
  const docSnap = await getDoc(doc(db, "vendors", id));
  
  if (!docSnap.exists()) return { title: "Not Found | Korba One" };
  const vendor = docSnap.data();

  return {
    title: `${vendor.shopName} | Verified in Korba`,
    description: `Contact ${vendor.shopName} for ${vendor.category} services.`,
  };
}

export default async function VendorProfile({ params }: Props) {
  const { id } = await params; // THE FIX: Await the dynamic ID
  const docSnap = await getDoc(doc(db, "vendors", id));
  
  if (!docSnap.exists()) notFound();
  const vendor = docSnap.data();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* HEADER SECTION */}
      <section className="bg-slate-950 pt-20 pb-48 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/20 blur-[120px] rounded-full" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Link href="/directory" className="inline-flex items-center gap-2 text-white/30 font-black uppercase text-[10px] tracking-widest mb-10 hover:text-orange-500 transition-all">
            <ArrowLeft size={14} /> Back to Directory
          </Link>

          <div className="flex flex-col md:flex-row gap-10 items-center text-center md:text-left">
            <div className="w-40 h-40 bg-white rounded-[45px] p-1 shadow-2xl border-4 border-white/10 overflow-hidden">
              <img src={vendor.imageUrl || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400'} className="w-full h-full object-cover rounded-[40px]" alt="" />
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-orange-600/20 text-orange-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-600/20">
                <Zap size={12} fill="currentColor" /> {vendor.category}
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none">{vendor.shopName}</h1>
              <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 font-bold">
                 <div className="flex items-center gap-1 text-emerald-400"><ShieldCheck size={18}/> <span className="text-[11px] uppercase tracking-widest">Verified Expert</span></div>
                 <div className="w-1 h-1 bg-slate-700 rounded-full" />
                 <div className="flex items-center gap-1 text-orange-400"><Star size={18} fill="currentColor"/> <span className="text-[11px] uppercase tracking-widest">4.9 Rating</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="max-w-6xl mx-auto -mt-24 px-6 relative z-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Services Card */}
            <div className="bg-white p-12 rounded-[60px] shadow-xl border border-slate-100">
               <h3 className="text-2xl font-black text-slate-900 uppercase italic mb-8">Specialized In</h3>
               <div className="flex flex-wrap gap-3">
                 {Array.isArray(vendor.keywords) ? vendor.keywords.map((k: string, i: number) => (
                   <span key={i} className="px-6 py-3 bg-slate-50 text-slate-500 rounded-2xl font-black text-[10px] uppercase border border-slate-100 shadow-sm">#{k}</span>
                 )) : <span className="text-slate-400 italic">No keywords listed</span>}
               </div>
            </div>

            {/* Location Card */}
            <div className="bg-slate-950 text-white p-12 rounded-[60px] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700"><MapPin size={120} /></div>
               <h3 className="text-2xl font-black italic uppercase mb-4">Location.</h3>
               <p className="text-slate-400 text-xl font-medium max-w-sm leading-relaxed">{vendor.address || "Korba, Chhattisgarh"}</p>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-10 rounded-[50px] shadow-2xl border border-slate-50 sticky top-10">
               <div className="flex items-center gap-3 text-emerald-500 mb-8">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Available for service</span>
               </div>
               <div className="space-y-4">
                  <a href={`tel:${vendor.phone}`} className="w-full bg-slate-950 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-xl active:scale-95">
                    <Phone size={18} /> Call Now
                  </a>
                  <a href={`https://wa.me/91${vendor.phone}`} className="w-full bg-emerald-600 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-xl">
                    <MessageCircle size={18} /> WhatsApp
                  </a>
               </div>
               <button className="w-full mt-10 text-slate-300 font-black text-[9px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:text-slate-900 transition-colors">
                 <Share2 size={14} /> Share Profile
               </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}