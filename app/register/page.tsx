"use client";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { checkUserIdentity } from "@/lib/auth-logic"; // Ensure this helper exists
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Zap, ShieldCheck, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

export default function VendorAuth() {
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  // 🛡️ SMART PERSISTENCE: Login check on mount
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        try {
          const { hasProfile } = await checkUserIdentity(user.email!);
          if (hasProfile) {
            router.push("/dashboard/manage");
          } else {
            router.push("/setup-profile");
          }
        } catch (error) {
          setErrorMessage("Profile sync failed. Please refresh.");
        } finally {
          setLoading(false);
        }
      }
      setCheckingAuth(false);
    });
    return () => unsub();
  }, [router]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (!email) throw new Error("Email retrieval failed.");

      // IDENTITY CHECK & REDIRECT
      const { hasProfile } = await checkUserIdentity(email);

      if (hasProfile) {
        router.push("/dashboard");
      } else {
        router.push("/setup-profile");
      }
    } catch (error: any) {
      console.error("Auth Detail Error:", error);
      
      if (error.code === 'auth/popup-closed-by-user') {
        setErrorMessage("Shatrughan ji, aapne login window band kar di.");
      } else if (error.code === 'auth/operation-not-allowed') {
        setErrorMessage("Firebase Console mein Google login enable karein.");
      } else {
        setErrorMessage("Connection unstable. Please try again.");
      }
      setLoading(false);
    }
  };

  // Loading Screen for Auth Persistence
  if (checkingAuth) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-orange-600" size={40} />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans antialiased">
      <div className="max-w-md w-full space-y-12 text-center">
        
        {/* BRANDING: Minimalist & Clean */}
        <header className="space-y-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-slate-950 rounded-[30px] flex items-center justify-center mx-auto shadow-2xl relative"
          >
            <Zap className="text-orange-500" size={36} fill="currentColor" />
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-2 -right-2 text-orange-600"
            >
              <Sparkles size={20} />
            </motion.div>
          </motion.div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Partner <span className="text-orange-600">Portal.</span>
            </h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">
              Korba One Admin Ecosystem
            </p>
          </div>
        </header>

        {/* AUTH BOX: Clean Card Design */}
        <section className="bg-white p-10 md:p-12 rounded-[45px] border border-slate-100 space-y-8 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-2 justify-center text-emerald-600 font-bold text-[10px] uppercase tracking-widest">
              <ShieldCheck size={14} /> Encrypted Login
            </div>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Apni web identity manage karein aur 15 listings tak free ads post karein.
            </p>
          </div>

          <button 
            onClick={handleGoogleLogin} 
            disabled={loading}
            className="w-full bg-slate-950 text-white py-6 rounded-[25px] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-orange-600 transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                <img src="https://www.google.com/favicon.ico" className="w-5" alt="Google" />
                Sign In With Google
              </>
            )}
          </button>

          {/* DYNAMIC ERROR ALERT */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-[11px] font-bold text-left"
              >
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <footer className="pt-4">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
            Developed & Managed by Shatrughan Sharma
          </p>
        </footer>
      </div>
    </main>
  );
}