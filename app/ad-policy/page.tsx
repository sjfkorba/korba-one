"use client";
import PolicyLayout from "@/components/PolicyLayout";
import { Megaphone, Target, Eye, ShieldCheck, Ban, Zap, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function AdPolicy() {
  return (
    <PolicyLayout title="Advertisement Policy">
      <div className="space-y-16">
        
        {/* 1. BRAND PROMISE (Premium Visual) */}
        <section className="relative p-10 md:p-16 bg-slate-950 rounded-[50px] text-white overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-[130px] rounded-full" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="bg-orange-600 p-6 rounded-[30px] shadow-2xl shadow-orange-600/30">
               <Megaphone size={40} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-tight mb-4 text-orange-500">
                Premium Reach. <br/> <span className="text-white">Trusted Exposure.</span>
              </h2>
              <p className="text-slate-400 font-medium max-w-xl leading-relaxed">
                Korba One ka advertising model sheher ke businesses ko targeted audience tak pahunchane ke liye banaya gaya hai. Hum sirf wahi ads allow karte hain jo hamare community standards aur quality guidelines ko follow karte hain.
              </p>
            </div>
          </div>
        </section>

        {/* 2. ADVERTISING STANDARDS (The "Big Brand" Rules) */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-slate-900">
            <Target size={24} className="text-blue-600" />
            <h2 className="text-2xl font-black uppercase tracking-tight">Our Ad Standards</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StandardCard 
               icon={<ShieldCheck size={20} />} 
               title="Authenticity" 
               desc="Ads mein di gayi jankari, offers aur claims 100% sach hone chahiye." 
            />
            <StandardCard 
               icon={<Zap size={20} />} 
               title="Visual Quality" 
               desc="Banners high-resolution aur professionally designed hone chahiye." 
            />
            <StandardCard 
               icon={<BarChart3 size={20} />} 
               title="Non-Intrusive" 
               desc="Ads user experience ko kharab nahi karne chahiye (No spamming)." 
            />
          </div>
        </section>

        {/* 3. PERMITTED AD SLOTS (Bento Grid) */}
        <section className="space-y-8 pt-8 border-t border-slate-100">
          <div className="text-center">
             <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Available Placements</h2>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2 italic">Standard Ad Units on Korba One</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                <h4 className="text-xl font-black mb-2 italic">01. Premium Home Slider</h4>
                <p className="text-sm text-slate-500 font-medium">Landing page par sabse upar dikhne wale bade banners.</p>
             </div>
             <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                <h4 className="text-xl font-black mb-2 italic">02. Category Sponsored</h4>
                <p className="text-sm text-slate-500 font-medium">Specific categories (e.g. Real Estate) mein top placement.</p>
             </div>
          </div>
        </section>

        {/* 4. PROHIBITED ADS (The Red Zone) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-red-600">
            <Ban size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight">Prohibited Categories</h2>
          </div>
          <div className="bg-red-50 p-8 md:p-12 rounded-[40px] border border-red-100">
            <p className="text-red-900 font-bold mb-8">Niche diye gaye vishayon par ads Korba One par sakht mana hain:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
               <ProhibitedItem text="Adult content aur Gambling services." />
               <ProhibitedItem text="Tobacco, Alcohol aur gair-kanooni nasha." />
               <ProhibitedItem text="Misleading financial schemes (Get rich quick)." />
               <ProhibitedItem text="Political propaganda ya inflammatory content." />
               <ProhibitedItem text="Gair-kanooni hathiyar ya explosives." />
               <ProhibitedItem text="Health claims jo medical science se verified na hon." />
            </div>
          </div>
        </section>

        {/* 5. DATA & TARGETING (International Tech Touch) */}
        <section className="p-8 border-2 border-dashed border-slate-200 rounded-[40px] bg-[#F8FAFC]">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="bg-slate-900 p-5 rounded-3xl text-white">
               <Eye size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black uppercase tracking-tight">Privacy-First Advertising</h2>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Hum advertisers ko sirf anonymous data provide karte hain. Kisi bhi user ki private information bina unki marzi ke advertisers ke saath share nahi ki jati. Hum ethical marketing ko promote karte hain.
              </p>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <div className="pt-10 text-center">
          <p className="text-slate-400 text-sm font-black uppercase tracking-widest italic mb-4">Interested in advertising?</p>
          <a href="mailto:ads@korbaone.com" className="text-orange-600 font-black text-2xl hover:underline">
            ads@korbaone.com
          </a>
        </div>
      </div>
    </PolicyLayout>
  );
}

// --- SUB-COMPONENTS ---

function StandardCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-8 bg-white rounded-[35px] border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
         {icon}
      </div>
      <h4 className="text-slate-900 font-black uppercase tracking-tighter mb-2">{title}</h4>
      <p className="text-slate-500 text-xs font-bold leading-relaxed">{desc}</p>
    </div>
  );
}

function ProhibitedItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
       <div className="w-2 h-2 bg-red-600 rounded-full" />
       <span className="text-red-900 font-bold text-sm">{text}</span>
    </div>
  );
}