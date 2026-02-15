"use client";
import PolicyLayout from "@/components/PolicyLayout";
import { Scale, CheckCircle2, AlertCircle, FileText, Ban, UserCheck } from "lucide-react";

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms & Conditions">
      <div className="space-y-12">
        {/* Intro Section */}
        <section>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            Korba One ("Platform") ka upyog karne se pehle kripya in niyam aur sharton (Terms) ko dhyan se padhein. Is platform ka upyog karke, aap hamare legal framework aur policies se sehmat hote hain.
          </p>
        </section>

        {/* 1. Acceptance of Terms */}
        <section className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
          <div className="bg-white p-5 rounded-2xl shadow-sm">
             <UserCheck size={32} className="text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-2">1. Acceptance of Terms</h2>
            <p className="text-slate-500 font-medium">
              Ye Terms har user, vendor aur visitor par lagu hote hain. Agar aap in sharton se sehmat nahi hain, toh kripya is platform ka upyog na karein.
            </p>
          </div>
        </section>

        {/* 2. User Obligations */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-blue-600">
            <CheckCircle2 size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight">2. User Responsibilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 italic">Authenticity:</h4>
              <p className="text-slate-500 text-sm">User ko registration ke waqt sahi aur up-to-date jankari deni hogi.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 italic">Legal Usage:</h4>
              <p className="text-slate-500 text-sm">Platform ka upyog sirf kanooni (legal) aur sheher ke hit mein kiya jana chahiye.</p>
            </div>
          </div>
        </section>

        {/* 3. Prohibited Activities (Red Alert Look) */}
        <section className="bg-red-50 p-8 md:p-12 rounded-[40px] border border-red-100">
          <div className="flex items-center gap-4 mb-6">
             <Ban className="text-red-600" size={32} />
             <h2 className="text-2xl md:text-3xl font-black text-red-900 tracking-tighter">Prohibited Activities</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <ProhibitedItem text="Fake ratings ya misleading reviews dena." />
             <ProhibitedItem text="Database scraping ya unauthorized hacking." />
             <ProhibitedItem text="Kisi bhi vendor ya user ko harass karna." />
             <ProhibitedItem text="Gair-kanooni advertisement ya spamming." />
          </ul>
        </section>

        {/* 4. Limitation of Liability */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-slate-800">
            <AlertCircle size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight">3. Limitation of Liability</h2>
          </div>
          <p className="text-slate-500 font-medium leading-relaxed">
            Korba One sirf ek bridge hai jo users ko vendors se jodta hai. Hum kisi bhi vendor ki service quality, product ya transaction ki seedhi zimmedari nahi lete. User ko koi bhi deal karne se pehle swayam dhyan dena chahiye.
          </p>
        </section>

        {/* 5. Intellectual Property */}
        <section className="p-8 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col md:flex-row gap-8 items-center">
           <div className="flex-1">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-2">4. Intellectual Property</h2>
              <p className="text-slate-500 text-sm font-medium">
                Korba One ka logo, design, code aur content hamari property hai. Bina permission iska upyog karna kanooni jurm hai.
              </p>
           </div>
           <div className="bg-slate-950 p-6 rounded-3xl text-white">
              <Scale size={40} className="text-orange-500" />
           </div>
        </section>

        {/* Final Disclaimer */}
        <div className="pt-10 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-sm italic">
            Last Updated: February 2026. Hum in sharton ko samay-samay par badal sakte hain.
          </p>
        </div>
      </div>
    </PolicyLayout>
  );
}

function ProhibitedItem({ text }: { text: string }) {
  return (
    <li className="flex gap-3 items-center text-red-800 font-bold text-sm">
      <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
      {text}
    </li>
  );
}