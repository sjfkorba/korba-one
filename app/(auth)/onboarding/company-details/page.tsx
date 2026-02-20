"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Building2, Phone, MapPin, Loader2 } from "lucide-react";

export default function CompanyDetailsPage() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);

    try {
      await setDoc(doc(db, "vendors", user.uid), {
        uid: user.uid,
        companyName,
        phone,
        address,
        createdAt: serverTimestamp(),
        status: "draft",
      });

      router.push("/onboarding/category-select");

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white/5 backdrop-blur-xl p-12 rounded-[40px] border border-white/10 shadow-2xl"
      >
        {/* Heading */}
        <h1 className="text-3xl font-black text-white mb-3">
          Setup Your <span className="text-orange-500">Business</span>
        </h1>

        <p className="text-white/60 text-sm mb-10">
          Step 1 of 3 – Basic Company Information
        </p>

        <form onSubmit={handleNext} className="space-y-6">

          {/* Company Name */}
          <div>
            <label className="text-xs text-white/60">Company Name</label>
            <div className="relative mt-2">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input
                required
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="input-premium pl-10"
                placeholder="e.g. Balaji Electronics"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs text-white/60">Contact Number</label>
            <div className="relative mt-2">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-premium pl-10"
                placeholder="Enter mobile number"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-xs text-white/60">Business Address</label>
            <div className="relative mt-2">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <textarea
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input-premium pl-10 h-24 resize-none"
                placeholder="Full address in Korba"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              "Next → Select Category"
            )}
          </button>

        </form>
      </motion.div>

    </div>
  );
}
