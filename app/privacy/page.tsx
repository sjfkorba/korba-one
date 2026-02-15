"use client";
import PolicyLayout from "@/components/PolicyLayout";
import { ShieldCheck, Lock, Eye, Database, Globe, UserCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <PolicyLayout title="Privacy Policy">
      <div className="space-y-12">
        {/* Intro Section */}
        <section>
          <p className="text-xl text-slate-600 leading-relaxed">
            Korba One ("hum", "humara") aapki privacy ko lekar puri tarah gambhir hai. Yeh policy batati hai ki jab aap hamari services use karte hain, toh hum aapki jankari ko kaise handle karte hain. Hum international data protection standards ko follow karte hain taaki Korba ke har nagrik ka data safe rahe.
          </p>
        </section>

        {/* 1. Data Collection */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-orange-600">
              <Database size={24} />
              <h2 className="text-2xl font-black uppercase tracking-tight">Information We Collect</h2>
            </div>
            <ul className="space-y-3 list-disc pl-5 text-slate-500 font-medium">
              <li><strong>Personal Data:</strong> Naam, phone number, aur email address (Registration ke waqt).</li>
              <li><strong>Business Data:</strong> Dukan ka naam, category, location, aur contact details.</li>
              <li><strong>Usage Data:</strong> Aap app par kya search karte hain aur kaunsi category zyada dekhte hain.</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center justify-center">
             <p className="text-sm italic text-slate-400 text-center font-bold">
               "Hum kabhi bhi aapka sensitive personal data bina wajah collect nahi karte."
             </p>
          </div>
        </section>

        {/* 2. How We Use Data */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-blue-600">
            <Eye size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight">How We Use Your Data</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
             <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 font-bold text-blue-800">Service Delivery: Aapko sahi vendors aur emergency services se jodne ke liye.</div>
             <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 font-bold text-orange-800">Personalization: Aapke interest ke hisaab se categories dikhane ke liye.</div>
             <div className="p-4 bg-green-50 rounded-2xl border border-green-100 font-bold text-green-800">Safety: Fake listings aur spam ko rokne ke liye verification process mein.</div>
          </div>
        </section>

        {/* 3. Security Protocol */}
        <section className="relative p-8 md:p-12 bg-slate-900 rounded-[40px] text-white overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 blur-[100px] rounded-full" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-xl">
               <Lock size={40} className="text-orange-500" />
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter mb-4">World-Class Security</h2>
              <p className="text-slate-400 font-medium leading-relaxed">
                Hum aapke data ko protect karne ke liye industry-standard encryption aur secure Firebase servers ka use karte hain. Aapka data kisi bhi third-party marketing agency ko becha nahi jata.
              </p>
            </div>
          </div>
        </section>

        {/* 4. User Rights */}
        <section className="space-y-6 pt-8 border-t border-slate-100">
          <div className="flex items-center gap-3 text-emerald-600">
            <UserCheck size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight">Your Rights</h2>
          </div>
          <p className="text-slate-500 font-medium">
            Shatrughan ji, hum har user ko yeh adhikaar dete hain ki wo apni information ko update kar sakein ya zaroorat padne par delete karne ki request kar sakein.
          </p>
          <div className="flex flex-wrap gap-4">
             <span className="px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest">Right to Access</span>
             <span className="px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest">Right to Deletion</span>
             <span className="px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest">Data Portability</span>
          </div>
        </section>

        {/* 5. Contact Info */}
        <section className="text-center py-10">
          <p className="text-slate-400 text-sm font-bold italic mb-4">
            "Privacy se juda koi bhi sawal ho? Hum haazir hain."
          </p>
          <a href="mailto:privacy@korbaone.com" className="text-orange-600 font-black text-xl hover:underline">
            privacy@korbaone.com
          </a>
        </section>
      </div>
    </PolicyLayout>
  );
}