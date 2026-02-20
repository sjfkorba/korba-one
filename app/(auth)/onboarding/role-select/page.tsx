"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Store, ShoppingBag, Loader2 } from "lucide-react";

export default function RoleSelectionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<"buyer" | "seller" | null>(null);

  const handleSelect = async (role: "buyer" | "seller") => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(role);

    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        role: role,
      });

      if (role === "seller") {
        router.push("/onboarding/company-details");
      } else {
        router.push("/(dashboard)/buyer");
      }

    } catch (error) {
      console.error(error);
    }

    setLoading(null);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center"
      >
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
          How will you use <span className="text-orange-500">KorbaOne</span>?
        </h1>

        <p className="text-white/60 mb-14 max-w-xl mx-auto">
          Choose your role to personalize your experience.
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Buyer Card */}
          <motion.div
            whileHover={{ y: -6 }}
            className="card-premium p-10 text-left cursor-pointer"
            onClick={() => handleSelect("buyer")}
          >
            <div className="flex items-center gap-4 mb-6">
              <ShoppingBag className="text-orange-500" size={28} />
              <h3 className="text-2xl font-bold text-white">
                I’m a Buyer
              </h3>
            </div>

            <p className="text-white/60 text-sm mb-6">
              Discover shops, apply for jobs, buy & sell products,
              explore services and emergency contacts.
            </p>

            <button className="btn-primary w-full">
              {loading === "buyer" ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Continue as Buyer"
              )}
            </button>
          </motion.div>

          {/* Seller Card */}
          <motion.div
            whileHover={{ y: -6 }}
            className="card-premium p-10 text-left cursor-pointer"
            onClick={() => handleSelect("seller")}
          >
            <div className="flex items-center gap-4 mb-6">
              <Store className="text-orange-500" size={28} />
              <h3 className="text-2xl font-bold text-white">
                I’m a Seller
              </h3>
            </div>

            <p className="text-white/60 text-sm mb-6">
              List your business, post jobs, create offers and grow
              your visibility in Korba.
            </p>

            <button className="btn-primary w-full">
              {loading === "seller" ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Continue as Seller"
              )}
            </button>
          </motion.div>

        </div>
      </motion.div>

    </div>
  );
}
