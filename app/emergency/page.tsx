"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PhoneCall, Siren, Flame, Activity, ShieldAlert, 
  HeartPulse, Search, Info, Users, ArrowLeft 
} from "lucide-react";
import Link from "next/link";

// --- KORBA LOCAL EMERGENCY DATA ---
const EMERGENCY_SERVICES = [
  { id: '1', title: 'Police Control Room', number: '100', icon: <Siren />, color: 'bg-blue-600', desc: 'Police assistance ke liye turant dial karein.' },
  { id: '2', title: 'Ambulance (Sanjeevani)', number: '108', icon: <Activity />, color: 'bg-emerald-600', desc: 'Sarkari medical emergency service.' },
  { id: '3', title: 'Fire Brigade Korba', number: '101', icon: <Flame />, color: 'bg-orange-600', desc: 'Aag ya rescue operation ke liye call karein.' },
  { id: '4', title: 'District Hospital Korba', number: '07759223001', icon: <HeartPulse />, color: 'bg-red-600', desc: 'Korba District HQ Hospital direct line.' },
  { id: '5', title: 'Women Helpline', number: '1091', icon: <ShieldAlert />, color: 'bg-purple-600', desc: '24/7 support for women safety.' },
  { id: '6', title: 'Child Help Line', number: '1098', icon: <Users size={20}/>, color: 'bg-indigo-600', desc: 'Bachon ki suraksha ke liye helpline.' },
];

export default function EmergencyPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // --- LEAD TRACKING LOGIC ---
  const trackEmergencyLead = async (service: any) => {
    try {
      await addDoc(collection(db, "leads"), {
        category: "Emergency",
        vendorName: service.title,
        interactionType: 'call',
        timestamp: serverTimestamp(),
        location: "Korba, Chhattisgarh", // User summary context
        device: navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'
      });
      console.log(`Lead logged for ${service.title}`);
    } catch (error) {
      console.error("Lead Tracking Error:", error);
    }
  };

  const filteredServices = EMERGENCY_SERVICES.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* --- PREMIUM PANIC HEADER --- */}
      <header className="bg-red-600 pt-12 pb-28 px-6 md:px-20 relative overflow-hidden">
        {/* Decorative Neon Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 font-black uppercase text-[10px] tracking-[0.3em] hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back to Korba One
          </Link>
          
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter italic uppercase leading-[0.85]"
            >
              Emergency <br/> <span className="text-red-200">Network.</span>
            </motion.h1>
            <p className="text-red-100 font-bold text-sm md:text-xl max-w-xl leading-relaxed">
              Korba sheher ki har life-saving service ab aapke ek touch ki doori par hai. 
            </p>
          </div>
        </div>
      </header>

      {/* --- SEARCH & INTERFACE --- */}
      <section className="max-w-7xl mx-auto -mt-14 px-6 relative z-20">
        <div className="relative group mb-16">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" size={24} />
          <input 
            type="text" 
            placeholder="Type 'Police' or 'Ambulance'..."
            className="w-full h-24 pl-20 pr-10 rounded-[40px] bg-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] font-black text-2xl outline-none focus:ring-[15px] ring-red-600/10 transition-all text-slate-900 border border-slate-100"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* --- DYNAMIC GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                key={service.id} 
                className="bg-white rounded-[50px] p-10 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className={`${service.color} text-white p-6 rounded-[32px] shadow-2xl shadow-slate-200 group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Direct Line</p>
                    <p className="text-4xl font-black text-slate-950 tracking-tighter italic">{service.number}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-12">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">{service.title}</h3>
                  <p className="text-slate-400 font-bold text-sm leading-relaxed">{service.desc}</p>
                </div>

                {/* --- THE FIX: Anchor tag for native dialer integration --- */}
                <a 
                  href={`tel:${service.number.replace(/\s+/g, '')}`}
                  onClick={() => trackEmergencyLead(service)}
                  className={`w-full ${service.color} text-white py-6 rounded-[30px] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-xl hover:brightness-110 active:scale-95 transition-all`}
                >
                  <PhoneCall size={20} /> Call Now
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- OFFICIAL NOTICE --- */}
        <div className="mt-24 p-12 bg-slate-950 rounded-[60px] border border-white/5 flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
           <div className="bg-red-600/20 text-red-500 p-6 rounded-full animate-pulse">
             <Info size={40} />
           </div>
           <div className="space-y-3">
             <h4 className="text-white font-black uppercase text-sm tracking-[0.3em]">Important Safety Notice</h4>
             <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-3xl">
               Ye saare helpline numbers Korba District Administration dwara satyapit (verified) hain. Emergency ke waqt ghabrayein nahi, bas upar diye gaye button par click karein. Aapki location auto-track ho sakti hai.
             </p>
           </div>
        </div>
      </section>
    </main>
  );
}