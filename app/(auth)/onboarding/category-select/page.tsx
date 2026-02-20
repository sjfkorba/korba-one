"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Store,
  Briefcase,
  Wrench,
  ShoppingCart,
  Loader2,
  CheckCircle,
} from "lucide-react";

const categories = [
  { id: "shops", label: "Shop / Retail Store", icon: Store },
  { id: "services", label: "Service Provider", icon: Wrench },
  { id: "jobs", label: "Job Provider", icon: Briefcase },
  { id: "buy-sell", label: "Buy & Sell Seller", icon: ShoppingCart },
];

export default function CategorySelectPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id]
    );
  };

  const handleNext = async () => {
    const user = auth.currentUser;
    if (!user || selected.length === 0) return;

    setLoading(true);

    try {
      await updateDoc(doc(db, "vendors", user.uid), {
        category: selected,
      });

      router.push("/onboarding/sub-category-select");
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
        className="w-full max-w-4xl"
      >
        <h1 className="text-4xl font-black text-white mb-3 text-center">
          Select Your <span className="text-orange-500">Category</span>
        </h1>

        <p className="text-white/60 text-sm mb-14 text-center">
          Step 2 of 3 – Choose one or more categories
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selected.includes(cat.id);

            return (
              <motion.div
                key={cat.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleCategory(cat.id)}
                className={`
                  relative p-8 rounded-3xl cursor-pointer transition-all duration-300
                  ${isActive
                    ? "bg-orange-600/15 border-2 border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.4)]"
                    : "bg-white/5 border border-white/10 hover:border-orange-500/50"
                  }
                `}
              >
                {/* Selected Badge */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 text-orange-500"
                  >
                    <CheckCircle size={24} />
                  </motion.div>
                )}

                <div className="flex items-center gap-4 mb-4">
                  <Icon
                    size={30}
                    className={isActive ? "text-orange-500" : "text-white/70"}
                  />
                  <h3 className="text-xl font-bold text-white">
                    {cat.label}
                  </h3>
                </div>

                <p className="text-white/50 text-sm">
                  List your business under this category and reach
                  customers actively searching in Korba.
                </p>
              </motion.div>
            );
          })}

        </div>

        <div className="mt-14 text-center">
          <button
            disabled={loading || selected.length === 0}
            onClick={handleNext}
            className="btn-primary px-10 py-4 flex items-center gap-3 mx-auto disabled:opacity-40"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              "Next → Select Keywords"
            )}
          </button>
        </div>

      </motion.div>
    </div>
  );
}
