"use client";

import { useState } from "react";
import { auth, provider, db } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // 🆕 If new user → create basic doc & go to role selection
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role: null,
          createdAt: serverTimestamp(),
        });

        router.push("/onboarding/role-select");
        return;
      }

      const role = userSnap.data().role;

      if (!role) {
        router.push("/onboarding/role-select");
        return;
      }

      if (role === "seller") {
  router.push("/seller");
} else {
  router.push("/buyer");
}

    } catch (err) {
      setError("Login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl p-12 rounded-[40px] border border-white/10 shadow-2xl text-center"
      >
        {/* Brand */}
        <h1 className="text-3xl font-black text-white mb-4">
          Welcome to <span className="text-orange-500">KorbaOne</span>
        </h1>

        <p className="text-white/60 text-sm mb-10">
          Sign in securely with your Google account.
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-4 rounded-full bg-white text-black font-semibold hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Signing In...
            </>
          ) : (
            "Continue with Google"
          )}
        </button>

        <p className="text-xs text-white/40 mt-6">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </motion.div>

    </div>
  );
}
