"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  categoryData,
  MainCategory,
  SubCategory,
} from "@/lib/categoryData";
import { Loader2 } from "lucide-react";

export default function SubCategorySelectPage() {
  const router = useRouter();

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selected, setSelected] = useState<SubCategory | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMainCategory = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const vendorSnap = await getDoc(doc(db, "vendors", user.uid));
      const data = vendorSnap.data();

      if (!data?.category?.length) return;

      const mainCategory = data.category[0] as MainCategory;

      if (mainCategory in categoryData) {
        // Spread removes readonly issue
        setSubCategories([...categoryData[mainCategory]]);
      }
    };

    fetchMainCategory();
  }, []);

  const handleNext = async () => {
    const user = auth.currentUser;
    if (!user || !selected) return;

    setLoading(true);

    try {
      await updateDoc(doc(db, "vendors", user.uid), {
        subCategory: {
          id: selected.id,
          label: selected.label,
        },
      });

      router.push("/onboarding/keyword-select");
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-xl bg-white/5 p-10 rounded-3xl border border-white/10">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Select Your Business Type
        </h1>

        <select
          value={selected?.id || ""}
          onChange={(e) => {
            const found = subCategories.find(
              (item) => item.id === e.target.value
            );
            setSelected(found || null);
          }}
          className="w-full bg-black border border-white/20 rounded-xl p-4 text-white"
        >
          <option value="">Select Sub Category</option>

          {subCategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleNext}
          disabled={!selected || loading}
          className="btn-primary w-full mt-8 flex justify-center gap-2 disabled:opacity-40"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Saving...
            </>
          ) : (
            "Next → SEO Keywords"
          )}
        </button>
      </div>

    </div>
  );
}
