"use client";
import { motion } from "framer-motion";
import { 
  Plus, 
  LayoutGrid, 
  BarChart3, 
  MessageSquare, 
  ExternalLink, 
  Zap,
  TrendingUp,
  Settings
} from "lucide-react";
import Link from "next/link";

interface DashboardProps {
  listingsCount: number;
  username: string;
}

export default function VendorDashboard({ listingsCount = 0, username = "pro" }: DashboardProps) {
  // 15 free listings ki limit logic
  const limit = 15;
  const percentage = (listingsCount / limit) * 100;

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 lg:p-20 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* 🏢 Header: Identity First */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              <Zap size={14} fill="currentColor" /> Business Authority
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-none">
              Control <span className="text-orange-600">Hub.</span>
            </h1>
            <Link 
              href={`/p/${username}`} 
              className="flex items-center gap-2 text-slate-400 font-medium text-sm hover:text-orange-600 transition-colors group"
            >
              korbaone.com/p/{username} <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 📊 15-Listing Progress Tracker */}
          <div className="w-full md:w-80 bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Free Capacity</span>
              <span className="text-2xl font-bold text-slate-900">{listingsCount}<span className="text-slate-300 text-sm">/{limit}</span></span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                className="h-full bg-orange-600"
              />
            </div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
              {limit - listingsCount} slots left for your Korba business ads.
            </p>
          </div>
        </header>

        {/* 🚀 Actions Grid: High-Contrast Minimalist */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ActionCard 
            href="/dashboard/new-listing"
            icon={<Plus size={28} />} 
            title="Post New Ad" 
            desc="Start a new campaign"
            isPrimary 
          />
          <ActionCard 
            href="/dashboard/my-listings"
            icon={<LayoutGrid size={28} />} 
            title="Active Ads" 
            desc="Manage your listings"
          />
          <ActionCard 
            href="/dashboard/analytics"
            icon={<BarChart3 size={28} />} 
            title="Performance" 
            desc="Track user views"
          />
          <ActionCard 
            href="/dashboard/leads"
            icon={<MessageSquare size={28} />} 
            title="New Leads" 
            desc="Customer inquiries"
          />
        </section>

        {/* 📈 Quick Insights */}
        <section className="bg-slate-950 p-12 rounded-[50px] text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5"><TrendingUp size={200} /></div>
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold tracking-tight italic">Pro Tips for <span className="text-orange-600">Growth.</span></h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  Korba ke top niches mein rank karne ke liye kam se kam 5 keywords use karein aur dukan ki asali photos dalein.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                    <div className="text-orange-500 font-bold text-2xl mb-1">28 Days</div>
                    <div className="text-[9px] font-black uppercase text-slate-500">Ad Visibility</div>
                 </div>
                 <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                    <div className="text-emerald-500 font-bold text-2xl mb-1">Elite</div>
                    <div className="text-[9px] font-black uppercase text-slate-500">Profile Status</div>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </main>
  );
}

function ActionCard({ icon, title, desc, href, isPrimary = false }: any) {
  return (
    <Link href={href}>
      <motion.div 
        whileHover={{ y: -5 }}
        className={`p-10 rounded-[40px] h-full flex flex-col justify-between gap-12 transition-all shadow-sm border ${
          isPrimary 
          ? 'bg-slate-950 border-slate-900 text-white shadow-orange-900/10' 
          : 'bg-white border-slate-100 text-slate-900 hover:shadow-xl hover:border-orange-500/20'
        }`}
      >
        <div className={`${isPrimary ? 'text-orange-500' : 'text-slate-400'}`}>
          {icon}
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-lg uppercase tracking-tight italic">{title}</h4>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${isPrimary ? 'text-slate-500' : 'text-slate-400'}`}>
            {desc}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}