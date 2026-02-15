"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Zap, ShieldCheck, Star, Clock, Gift, Megaphone } from "lucide-react";

const ADS = [
  { id: 1, title: "Special Launch Offer", desc: "First 100 Businesses get FREE Verification!", icon: <Gift className="text-orange-400" />, color: "from-orange-600 to-red-600" },
  { id: 2, title: "Verified Professionals", desc: "Plumbers & Electricians checked by Korba One", icon: <ShieldCheck className="text-blue-400" />, color: "from-blue-600 to-indigo-700" },
  { id: 3, title: "Emergency Support", desc: "24x7 Ambulance & Blood Bank Contacts", icon: <Clock className="text-red-400" />, color: "from-red-600 to-rose-700" },
  { id: 4, title: "Daily Mandi Rates", desc: "Check Sabzi Mandi prices every morning", icon: <Zap className="text-yellow-400" />, color: "from-emerald-600 to-teal-700" },
  { id: 5, title: "Advertise Here", desc: "Reach 10,000+ local customers daily", icon: <Megaphone className="text-purple-400" />, color: "from-purple-600 to-violet-700" },
];

export default function AdBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ADS.length);
    }, 4000); // Har 4 second mein slide hoga
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full px-4 md:px-10 pt-6">
      <div className="max-w-7xl mx-auto overflow-hidden rounded-[24px] md:rounded-[32px] shadow-2xl relative h-28 md:h-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={ADS[index].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`absolute inset-0 bg-gradient-to-r ${ADS[index].color} p-6 md:px-12 flex items-center justify-between`}
          >
            <div className="flex items-center gap-4 md:gap-8">
              <div className="bg-white/20 p-3 md:p-4 rounded-2xl backdrop-blur-md">
                {ADS[index].icon}
              </div>
              <div>
                <h4 className="text-white text-sm md:text-lg font-black uppercase tracking-wider">
                  {ADS[index].title}
                </h4>
                <p className="text-white/80 text-xs md:text-base font-medium">
                  {ADS[index].desc}
                </p>
              </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block bg-white text-slate-900 px-6 py-2 rounded-xl font-bold text-sm"
            >
              Learn More
            </motion.button>
          </motion.div>
        </AnimatePresence>
        
        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {ADS.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/30'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}