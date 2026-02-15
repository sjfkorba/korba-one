"use client";
import { motion } from "framer-motion";

export default function PolicyLayout({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 md:p-16"
      >
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-10 tracking-tighter italic">
          {title}
        </h1>
        <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed space-y-6">
          {children}
        </div>
      </motion.div>
    </main>
  );
}