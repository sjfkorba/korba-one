import { Metadata } from 'next';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { 
  Phone, MapPin, ShieldCheck, MessageCircle, ArrowLeft, 
  Share2, Star, Zap, Globe, Clock, Eye, ChevronRight, 
  ArrowRight, Calendar
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: Promise<{ user: string; slug: string }>;
}

async function getAdData(user: string, slug: string) {
  const q = query(
    collection(db, "listings"),
    where("ownerUid", "==", user),
    where("slug", "==", slug),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as any;
}

export default async function AdDetailPage({ params }: Props) {
  const { user, slug } = await params;
  const ad = await getAdData(user, slug);
  if (!ad) notFound();

  const displayPrice = ad.price ? `₹${Number(ad.price).toLocaleString('en-IN')}` : "Contact for Price";

  return (
    <main className="min-h-screen bg-[#F2F4F5] pb-20 font-sans">
      {/* 🧭 NAVIGATION BREADCRUMBS (Small & Visible) */}
      <nav className="bg-white py-3 px-6 border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight text-slate-400">
          <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/directory" className="hover:text-orange-600 transition-colors">Directory</Link>
          <ChevronRight size={10} />
          <span className="text-slate-900 truncate max-w-[150px]">{ad.title}</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-8">
        
        {/* 🖼️ LEFT CONTENT (8 Columns) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Main Image Gallery Frame */}
          <div className="bg-black rounded-xl overflow-hidden shadow-sm aspect-[16/9] flex items-center justify-center relative group">
            {ad.imageUrl ? (
              <img src={ad.imageUrl} className="w-full h-full object-contain" alt="" />
            ) : (
              <div className="flex flex-col items-center opacity-30 text-white">
                <Zap size={48} className="mb-2" />
                <p className="text-[10px] font-black uppercase italic tracking-widest">No Media Available</p>
              </div>
            )}
            <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-md font-black text-[9px] uppercase italic shadow-lg">
              {ad.category}
            </div>
          </div>

          {/* Description Block (Clean Typography) */}
          <div className="bg-white p-6 md:p-10 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 uppercase italic mb-6 border-b-2 border-slate-100 pb-3">
              Description
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap font-medium">
              {ad.description}
            </p>
            
            {/* Ad Stats Footer */}
            <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between text-[10px] font-black uppercase text-slate-400">
               <div className="flex items-center gap-4">
                 <span className="flex items-center gap-1.5"><Calendar size={12}/> Posted: Feb 17</span>
                 <span className="flex items-center gap-1.5"><Eye size={12}/> Views: {ad.views || 0}</span>
               </div>
               <span className="text-slate-300">AD ID: {ad.id.substring(0,8).toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* 💰 RIGHT SIDEBAR (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Price & Title Info Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="space-y-1">
               <h2 className="text-2xl font-black text-slate-950 leading-tight tracking-tighter uppercase italic">
                 {displayPrice}
               </h2>
               <h1 className="text-sm font-bold text-slate-500 leading-snug">
                 {ad.title}
               </h1>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[11px]">
                <MapPin size={14} className="text-orange-600" /> {ad.address}
              </div>
              <span className="text-[10px] font-black text-slate-300 uppercase">Today</span>
            </div>
          </div>

          {/* Seller Profile Card (Compact) */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Advertiser Detail</p>
            <Link href={`/p/${ad.ownerUid}`} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center text-white font-black text-xl italic uppercase shadow-inner">
                  {ad.ownerEmail?.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-orange-600 transition-colors uppercase italic">{ad.ownerEmail?.split('@')[0]}</h4>
                  <p className="text-[9px] font-bold text-emerald-500 flex items-center gap-1 uppercase tracking-widest">
                    <ShieldCheck size={10} /> Verified Identity
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <a href={`tel:${ad.phone}`} className="w-full bg-slate-950 text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-md active:scale-95">
                <Phone size={14} /> Call Now
              </a>
              <a href={`https://wa.me/91${ad.phone}`} className="w-full bg-emerald-50 text-emerald-600 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100">
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </div>

          {/* Location Safety Tip Card */}
          <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
            <h5 className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2 mb-2">
              <Star size={12} fill="currentColor"/> Safety Tips
            </h5>
            <p className="text-[10px] font-medium text-orange-800 leading-relaxed">
              Never pay in advance. Verify business identity on <b>Korba One</b> before any transaction. 
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}