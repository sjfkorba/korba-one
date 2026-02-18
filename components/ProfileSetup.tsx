"use client";
import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { doc, setDoc, collection, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, CheckCircle2, XCircle, Loader2, Zap, ArrowRight } from "lucide-react";

export default function ProfileSetup() {
  const [username, setUsername] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const router = useRouter();

  // 1. LIVE USERNAME CHECKER
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

  // 2. LAUNCH & REDIRECT TO ADMIN PANEL
  const handleLaunch = async () => {
    if (!isAvailable || !auth.currentUser) return;
    setLoading(true);
    try {
      const userEmail = auth.currentUser.email!;
      const profileData = {
        uid: auth.currentUser.uid,
        username: username.toLowerCase(),
        email: userEmail,
        displayName: auth.currentUser.displayName || "User",
        createdAt: serverTimestamp(),
        listingsCount: 0,
        accountStatus: "active",
        isPremium: false
      };

      await setDoc(doc(db, "users", userEmail), profileData);
      router.push("/dashboard"); 
    } catch (error) {
      alert("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 antialiased">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl w-full space-y-10">
        <header className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <Zap size={14} fill="currentColor" /> Step 1: Create Identity
          </div>
          <h1 className="text-5xl font-bold text-slate-900 tracking-tight">Claim Your <span className="text-orange-600">Handle.</span></h1>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">Choose a unique username for your public business profile.</p>
        </header>

        <section className="bg-white border border-slate-100 p-10 md:p-14 rounded-[50px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] space-y-10">
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Unique Profile Link</label>
            <div className={`flex items-center bg-slate-50 border-2 rounded-3xl p-6 transition-all ${
              isAvailable === true ? 'border-emerald-500/20 bg-emerald-50/10' : isAvailable === false ? 'border-red-500/20 bg-red-50/10' : 'border-slate-100 focus-within:border-orange-500/20'
            }`}>
              <Globe size={20} className="text-slate-300 mr-4" />
              <span className="text-slate-400 font-bold text-sm hidden sm:inline">korbaone.com/p/</span>
              <input 
                type="text" 
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9-]/g, ""))}
                className="bg-transparent border-none outline-none font-bold text-xl text-slate-950 w-full placeholder:text-slate-200 lowercase"
              />
              <div className="ml-2">
                {checking ? <Loader2 size={20} className="animate-spin text-orange-500" /> : (
                  <>
                    {isAvailable === true && <CheckCircle2 className="text-emerald-500" size={28} />}
                    {isAvailable === false && <XCircle className="text-red-500" size={28} />}
                  </>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={handleLaunch}
            disabled={!isAvailable || loading}
            className="w-full bg-slate-950 text-white py-7 rounded-[30px] font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-orange-600 transition-all shadow-xl disabled:opacity-30 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Launch My Admin Panel <ArrowRight size={20} /></>}
          </button>
        </section>
      </motion.div>
    </main>
  );
}