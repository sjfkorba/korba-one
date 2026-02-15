"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, Globe } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. PREMIUM HEADER */}
      <section className="relative pt-32 pb-20 px-6 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
           <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full" />
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-orange-600 font-black tracking-[0.3em] uppercase text-xs"
          >
            Connect with Korba One
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none"
          >
            Humein <span className="text-orange-600 italic">Sampark</span> Karein.
          </motion.h1>
          <p className="mt-8 text-slate-500 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
            Korba One team aapki har samasya ke samadhan ke liye tatpar hai. Humse judne ke liye niche diye gaye madhyamo ka upyog karein.
          </p>
        </div>
      </section>

      {/* 2. CONTACT INFO & FORM SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left Side: Professional Contact Info */}
          <div className="lg:col-span-1 space-y-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic border-b-4 border-orange-500 inline-block pb-2">Reach Us</h2>
            
            <ContactMethod 
              icon={<Phone size={24} className="text-orange-600" />}
              title="Official Helpline"
              detail="+91 7974427353"
              desc="Available for Support & Inquiry"
            />
            <ContactMethod 
              icon={<Mail size={24} className="text-blue-600" />}
              title="Email Support"
              detail="support@korbaone.com"
              desc="Get response within 24 hours"
            />
            <ContactMethod 
              icon={<Globe size={24} className="text-emerald-600" />}
              title="Service Area"
              detail="Korba City"
              desc="Chhattisgarh, India"
            />
          </div>

          {/* Right Side: High-End Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 md:p-14 rounded-[50px] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.08)] border border-slate-100"
            >
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormInput label="Aapka Naam" placeholder="Enter full name" />
                  <FormInput label="Mobile Number" placeholder="+91 79744 27353" />
                </div>
                <FormInput label="Subject" placeholder="Inquiry about Korba One" />
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Your Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Apna sandesh yahan likhein..."
                    className="w-full bg-slate-50 rounded-3xl p-6 outline-none focus:ring-4 ring-orange-500/10 border border-slate-100 transition-all font-medium text-slate-900"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-slate-950 text-white py-6 rounded-[28px] font-black text-xl flex items-center justify-center gap-4 shadow-2xl hover:bg-orange-600 transition-all duration-300"
                >
                  Message Bhejein <Send size={22} />
                </motion.button>
              </form>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 3. BRAND TRUST SECTION */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
         <div className="bg-slate-950 rounded-[60px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 relative z-10">
              Korba One: Sheher ki <span className="text-orange-500">Digital Pehchan</span>
            </h3>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto relative z-10">
              Hum Korba ke digital bhavishya ko behtar banane ke liye pratibadh hain. Humse kisi bhi samay sampark karein.
            </p>
         </div>
      </section>
    </main>
  );
}

// --- REUSABLE SUB-COMPONENTS ---

function ContactMethod({ icon, title, detail, desc }: any) {
  return (
    <div className="flex gap-6 items-start group">
      <div className="bg-slate-50 p-5 rounded-3xl group-hover:bg-orange-100 transition-all duration-500 shadow-inner">
        {icon}
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">{title}</h4>
        <p className="text-2xl font-black text-slate-900 leading-tight mb-1">{detail}</p>
        <p className="text-sm text-slate-500 font-bold">{desc}</p>
      </div>
    </div>
  );
}

function FormInput({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-black uppercase tracking-widest text-slate-400">{label}</label>
      <input 
        type="text"
        placeholder={placeholder}
        className="w-full h-16 bg-slate-50 rounded-2xl px-6 outline-none focus:ring-4 ring-orange-500/10 border border-slate-100 transition-all font-medium text-slate-900"
      />
    </div>
  );
}