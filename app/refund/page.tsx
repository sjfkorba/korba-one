"use client";
import PolicyLayout from "@/components/PolicyLayout";
import { RefreshCcw, CreditCard, ShieldAlert, CheckCircle2, HelpCircle, Clock } from "lucide-react";

export default function RefundPage() {
  return (
    <PolicyLayout title="Refund Policy">
      <div className="space-y-16">
        
        {/* 1. OVERVIEW (The "Big Brand" Trust) */}
        <section className="bg-slate-950 p-10 md:p-16 rounded-[48px] text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 blur-[120px] rounded-full" />
          <div className="relative z-10 space-y-6">
            <div className="bg-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
              <RefreshCcw size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-tight">
              Simple. Transparent. <br/> <span className="text-orange-500">Fair Refunds.</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-xl leading-relaxed">
              Korba One par hamari koshish hai ki aapko best digital services milein. Agar kisi wajah se transaction mein samasya aati hai, toh humne ek transparent refund policy banayi hai.
            </p>
          </div>
        </section>

        {/* 2. ELIGIBILITY GRID (Bento Style) */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-slate-900">
            <CheckCircle2 size={24} className="text-emerald-600" />
            <h2 className="text-2xl font-black uppercase tracking-tight">Eligibility for Refund</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatusCard 
              type="YES" 
              title="Technical Failure" 
              desc="Agar payment ho gayi ho lekin listing active na hui ho ya tech error aaye." 
            />
            <StatusCard 
              type="NO" 
              title="Change of Mind" 
              desc="Business registration ya listing ke baad mann badalne par refund nahi diya jayega." 
            />
            <StatusCard 
              type="YES" 
              title="Duplicate Payment" 
              desc="Galti se ek hi service ke liye do baar payment hone par extra paisa wapas hoga." 
            />
            <StatusCard 
              type="NO" 
              title="Policy Violation" 
              desc="Agar niyam todne ki wajah se aapki listing remove hoti hai, toh koi refund nahi milega." 
            />
          </div>
        </section>

        {/* 3. REFUND TIMELINE (Process) */}
        <section className="py-12 px-8 bg-slate-50 rounded-[40px] border border-slate-100">
          <div className="flex items-center gap-3 text-slate-900 mb-10">
            <Clock size={24} className="text-blue-600" />
            <h2 className="text-2xl font-black uppercase tracking-tight">Process & Timeline</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-12 justify-between">
            <ProcessStep num="1" title="Request" desc="Support team ko mail karein." />
            <ProcessStep num="2" title="Review" desc="Team 48 ghante mein verify karegi." />
            <ProcessStep num="3" title="Initiate" desc="Bank ko request bheji jayegi." />
            <ProcessStep num="4" title="Credit" desc="5-7 working days mein paisa credit." />
          </div>
        </section>

        {/* 4. IMPORTANT NOTE (Warning Box) */}
        <section className="p-8 border-2 border-red-100 bg-red-50/30 rounded-[40px] flex flex-col md:flex-row gap-8 items-center">
          <div className="bg-red-600 p-5 rounded-3xl text-white shadow-xl">
            <ShieldAlert size={40} />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-red-900 mb-2">Non-Refundable Services</h2>
            <p className="text-slate-600 font-medium text-sm leading-relaxed">
              Kripya dhyan dein ki <strong>Advertisement Banners</strong> aur <strong>Premium Verified Badges</strong> ek baar live hone ke baad non-refundable hote hain, kyunki ye digital services turant consume ho jati hain.
            </p>
          </div>
        </section>

        {/* 5. HELP CENTER */}
        <section className="text-center py-10 bg-blue-50/50 rounded-[40px] border border-blue-100">
          <div className="flex justify-center mb-4 text-blue-600">
            <HelpCircle size={48} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">Refund se juda sawal hai?</h3>
          <p className="text-slate-500 font-bold mb-6 italic text-sm">Hamari team aapki poori madad karegi.</p>
          <div className="flex flex-wrap justify-center gap-4">
             <div className="bg-white px-6 py-3 rounded-2xl shadow-sm font-black text-slate-700 border border-slate-100">
                billing@korbaone.com
             </div>
          </div>
        </section>

      </div>
    </PolicyLayout>
  );
}

// --- SUB-COMPONENTS ---

function StatusCard({ type, title, desc }: { type: "YES" | "NO", title: string, desc: string }) {
  return (
    <div className={`p-8 rounded-[32px] border transition-all duration-300 ${
      type === "YES" ? "bg-white border-emerald-100 hover:shadow-emerald-100/50" : "bg-white border-red-100 hover:shadow-red-100/50"
    } hover:shadow-2xl`}>
      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block ${
        type === "YES" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
      }`}>
        {type === "YES" ? "Eligible" : "Non-Eligible"}
      </span>
      <h4 className="text-slate-900 font-black text-xl mb-2 tracking-tight">{title}</h4>
      <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function ProcessStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex-1 space-y-4 relative">
      <div className="text-5xl font-black text-slate-200 tracking-tighter italic">{num}</div>
      <h4 className="font-black text-slate-900 uppercase tracking-tighter text-sm">{title}</h4>
      <p className="text-slate-500 text-xs font-bold leading-relaxed">{desc}</p>
    </div>
  );
}