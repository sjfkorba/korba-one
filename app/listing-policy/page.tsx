"use client";
import PolicyLayout from "@/components/PolicyLayout";
import { CheckCircle2, AlertTriangle, XCircle, Search, Award, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function ListingPolicy() {
  return (
    <PolicyLayout title="Listing Policy">
      <div className="space-y-16">
        
        {/* 1. INTRODUCTION (Premium Highlight) */}
        <section className="relative p-8 md:p-12 bg-slate-900 rounded-[40px] text-white overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 blur-[100px] rounded-full" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter mb-4 flex items-center gap-3">
              <Award className="text-orange-500" size={32} /> Quality First
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed max-w-2xl">
              Korba One par har listing hamare high-quality standards ko follow karti hai. Hum sirf verified aur genuine businesses ko hi platform par allow karte hain taaki users ka bharosa bana rahe.
            </p>
          </div>
        </section>

        {/* 2. ELIGIBILITY CRITERIA */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-slate-900">
            <CheckCircle2 size={24} className="text-green-600" />
            <h2 className="text-2xl font-black uppercase tracking-tight">Listing Requirements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RequirementCard title="Valid Documentation" desc="Business ke paas GST, Trade License ya valid ID proof hona chahiye." />
            <RequirementCard title="Physical Presence" desc="Dukan ya service center ka Korba mein physical address hona zaroori hai." />
            <RequirementCard title="Authentic Media" desc="Shop ki asali photos aur accurate contact details honi chahiye." />
            <RequirementCard title="Service Quality" desc="Vendor ko professional aur timely service provide karni hogi." />
          </div>
        </section>

        {/* 3. VERIFICATION PROCESS (Visual Step) */}
        <section className="space-y-8 pt-8 border-t border-slate-100">
          <div className="text-center space-y-2">
             <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Verification Protocol</h2>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">How we verify your business</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <StepItem num="01" title="Submission" desc="Owner apni details aur photos submit karta hai." />
             <StepItem num="02" title="Manual Audit" desc="Hamari team data aur location ko manually check karti hai." />
             <StepItem num="03" title="Badge Issued" desc="Verification ke baad 'Verified' badge live ho jata hai." />
          </div>
        </section>

        {/* 4. PROHIBITED LISTINGS (Red Zone) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-red-600">
            <XCircle size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight">Prohibited Content</h2>
          </div>
          <div className="bg-red-50 p-8 rounded-[40px] border border-red-100">
            <p className="text-red-900 font-bold mb-6">Niche di gayi cheezein Korba One par sakht mana hain:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-red-700">
               <li className="flex items-center gap-2">● Gair-kanooni drugs ya medicines.</li>
               <li className="flex items-center gap-2">● Duplicate ya counterfeit brands.</li>
               <li className="flex items-center gap-2">● Misleading prices ya fake discounts.</li>
               <li className="flex items-center gap-2">● Kisi bhi tarah ka offensive ya vulgar content.</li>
            </ul>
          </div>
        </section>

        {/* 5. REMOVAL POLICY */}
        <section className="p-8 border-2 border-dashed border-orange-200 rounded-[40px] flex flex-col md:flex-row gap-8 items-center bg-orange-50/30">
           <div className="bg-orange-500 p-5 rounded-3xl text-white shadow-xl">
              <AlertTriangle size={40} />
           </div>
           <div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Policy Violation</h2>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">
                Agar koi vendor niyam todta hai ya users se dhokha-dhari karta hai, toh Korba One ke paas bina notice ke listing ko suspend karne ka adhikaar hai. 
              </p>
           </div>
        </section>

        {/* Info Footer */}
        <div className="text-center pt-10">
           <p className="text-slate-400 text-sm font-bold flex items-center justify-center gap-2 italic">
             <Info size={16} /> Listing se juda koi sawal? Call humein: <strong>+91-XXXXX-XXXXX</strong>
           </p>
        </div>
      </div>
    </PolicyLayout>
  );
}

// --- SUB-COMPONENTS ---

function RequirementCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300">
      <h4 className="text-slate-900 font-black italic mb-2 tracking-tight uppercase text-sm">{title}</h4>
      <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function StepItem({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="p-8 bg-white border border-slate-100 rounded-[35px] text-center shadow-sm">
      <span className="text-4xl font-black text-slate-100 block mb-4">{num}</span>
      <h4 className="font-black text-slate-900 mb-2 uppercase tracking-tighter">{title}</h4>
      <p className="text-slate-500 text-xs font-bold leading-relaxed">{desc}</p>
    </div>
  );
}