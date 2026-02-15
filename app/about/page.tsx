"use client";
import { motion } from "framer-motion";
import { Target, Heart, ShieldCheck, Zap, ArrowRight, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO SECTION (Clean & Bold) */}
      <section className="relative pt-32 pb-20 px-6 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/5 blur-[120px] rounded-full" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-orange-600 font-black tracking-[0.3em] uppercase text-xs"
          >
            Digital Korba Initiative
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none"
          >
            Sheher Ka Apna <br/> <span className="text-orange-600 italic">Ecosystem.</span>
          </motion.h1>
          <p className="mt-8 text-slate-500 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
            Korba One ek digital kranti hai jo local vyapar aur modern technology ko jodkar humare sheher ko smart bana rahi hai.
          </p>
        </div>
      </section>

      {/* 2. OUR VISION (The Story) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="w-16 h-1 bg-orange-600" />
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
              Kyu banaya humne <br/> <span className="text-slate-400">Korba One?</span>
            </h2>
            <p className="text-slate-600 text-lg font-medium leading-relaxed">
              Korba Chhattisgarh ka ek garvshali sheher hai. Yahan ki urja aur vyapar mein bahut dum hai, lekin sahi digital platform ki kami thi. Humne mahsoos kiya ki Korba ke residents ko verified services aur daily updates (jaise Mandi rates) ke liye bhatakna padta hai.
            </p>
            <p className="text-slate-600 text-lg font-medium leading-relaxed">
              Humara lakshya hai ki har chota-bada vyapari digital bane aur har nagrik ko ek hi click par verified emergency aur lifestyle services milein.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <StatBox icon={<Target className="text-orange-600" />} label="Mission" text="Digital Empowerment" />
            <StatBox icon={<Heart className="text-red-500" />} label="Value" text="Trust & Reliability" />
            <StatBox icon={<ShieldCheck className="text-blue-600" />} label="Safety" text="Verified Services" />
            <StatBox icon={<Zap className="text-yellow-500" />} label="Speed" text="Real-time Updates" />
          </div>
        </div>
      </section>

      {/* 3. CORE PILLARS (The Tech Behind) */}
      <section className="py-24 bg-slate-950 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
             <h2 className="text-4xl md:text-7xl font-black tracking-tighter">Humare <span className="text-orange-500 italic">Stambh.</span></h2>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Core Principles of Korba One</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PillarCard 
              title="Verified Networking" 
              desc="Hum har business listing ko manually check karte hain taaki aapko mile sirf asli aur bharosemand data." 
            />
            <PillarCard 
              title="Hyper-Local Focus" 
              desc="Hamari har service khas Korba ke bhaugolik (geographical) aur social context ko dhyan mein rakh kar banayi gayi hai." 
            />
            <PillarCard 
              title="Zero Middleman" 
              desc="Hum user aur vendor ke beech koi commission nahi lete. Hamara maqsad hai local economy ko seedha support dena." 
            />
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter">
            Judna chahte hain <br/> Humare Saath?
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <LinkCard title="Apna Business Register Karein" href="/register" />
            <LinkCard title="Directory Explore Karein" href="/directory" />
          </div>
        </div>
      </section>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function StatBox({ icon, label, text }: any) {
  return (
    <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 flex flex-col items-center text-center gap-2">
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-2">{icon}</div>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
      <p className="text-slate-900 font-black text-lg leading-tight">{text}</p>
    </div>
  );
}

function PillarCard({ title, desc }: any) {
  return (
    <div className="p-10 bg-white/5 border border-white/10 rounded-[48px] hover:bg-white/10 transition-all group">
      <div className="w-12 h-1 bg-orange-600 mb-8 group-hover:w-20 transition-all" />
      <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{title}</h3>
      <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function LinkCard({ title, href }: { title: string, href: string }) {
  return (
    <motion.a 
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-8 bg-slate-900 text-white rounded-[32px] font-black text-xl flex items-center justify-center gap-4 group shadow-2xl"
    >
      {title}
      <ArrowRight className="group-hover:translate-x-2 transition-transform" />
    </motion.a>
  );
}