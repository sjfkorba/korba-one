"use client";
import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { doc, setDoc, collection, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, CheckCircle2, XCircle, Loader2, Zap, ArrowRight, UserCircle } from "lucide-react";

export default function SetupProfile() {
  const [username, setUsername] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (username.length < 3) {
      setIsAvailable(null);
      return;
    }
    const checkAvailability = async () => {
      setChecking(true);
      const q = query(collection(db, "users"), where("username", "==", username.toLowerCase()));
      const querySnapshot = await getDocs(q);
      setIsAvailable(querySnapshot.empty);
      setChecking(false);
    };
    const timeoutId = setTimeout(checkAvailability, 500);
    return () => clearTimeout(timeoutId);
  }, [username]);

  const handleLaunch = async () => {
    if (!isAvailable || !auth.currentUser) return;
    setLoading(true);
    try {
      const userEmail = auth.currentUser.email!;
      await setDoc(doc(db, "users", userEmail), {
        uid: auth.currentUser.uid,
        username: username.toLowerCase(),
        email: userEmail,
        displayName: auth.currentUser.displayName || "User",
        photoURL: auth.currentUser.photoURL || "",
        createdAt: serverTimestamp(),
        listingsCount: 0,
        accountStatus: "active"
      });
      router.push("/dashboard/manage");
    } catch (error) {
      alert("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 font-sans antialiased">
      
      {/* 🚀 Minimalist Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 space-y-2"
      >
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          <Zap size={14} fill="currentColor" /> Account Setup
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Claim Your <span className="text-orange-600">Handle.</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          Choose a unique username for your public business profile.
        </p>
      </motion.div>

      {/* 🛡️ The Main Card (Clean & Floating) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white border border-slate-100 rounded-[40px] p-10 md:p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]"
      >
        <div className="space-y-10">
          
          {/* Handle Input Area */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">User Handle</label>
              {checking && <Loader2 size={14} className="animate-spin text-orange-500" />}
            </div>
            
            <div className={`relative flex items-center bg-slate-50 border-2 rounded-3xl p-6 transition-all duration-300 ${
              isAvailable === true ? 'border-emerald-500/30 bg-emerald-50/10' : 
              isAvailable === false ? 'border-red-500/30 bg-red-50/10' : 'border-slate-100 focus-within:border-orange-500/20'
            }`}>
              <Globe size={20} className="text-slate-300 mr-4" />
              <span className="text-slate-400 font-bold text-sm hidden sm:inline">korbaone.com/p/</span>
              <input 
                type="text" 
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9-]/g, ""))}
                className="bg-transparent border-none outline-none font-bold text-xl text-slate-900 w-full placeholder:text-slate-300 lowercase"
              />
              <div className="ml-2">
                {isAvailable === true && <CheckCircle2 className="text-emerald-500" size={24} />}
                {isAvailable === false && <XCircle className="text-red-500" size={24} />}
              </div>
            </div>

            <AnimatePresence>
              {isAvailable === false && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-2">
                  Handle already taken by another pro.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleLaunch}
            disabled={!isAvailable || loading}
            className="w-full bg-slate-950 text-white py-6 rounded-[28px] font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-xl disabled:opacity-30 disabled:grayscale active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>Create Identity <ArrowRight size={18} /></>
            )}
          </button>
        </div>
      </motion.div>

      {/* 🛡️ Trust Badges */}
      <div className="mt-12 flex items-center gap-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-tighter">
          <UserCircle size={18} /> Verified Profiles
        </div>
        <div className="flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-tighter">
          <Globe size={18} /> Global Presence
        </div>
      </div>
    </main>
  );
}