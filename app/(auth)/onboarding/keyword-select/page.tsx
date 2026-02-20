"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { generateSeoKeywords } from "@/lib/seoKeywords";
import { Loader2 } from "lucide-react";

export default function KeywordSelectPage() {
  const router = useRouter();

  const [keywords, setKeywords] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubCategory = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const vendorSnap = await getDoc(doc(db, "vendors", user.uid));
      const data = vendorSnap.data();

      if (!data?.subCategory?.label) return;

      const dynamicKeywords = generateSeoKeywords(
        data.subCategory.label
      );

      setKeywords(dynamicKeywords);
    };

    fetchSubCategory();
  }, []);

  const toggleKeyword = (keyword: string) => {
    setSelected((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleFinish = async () => {
    const user = auth.currentUser;
    if (!user || selected.length === 0) return;

    setLoading(true);

    try {
      await updateDoc(doc(db, "vendors", user.uid), {
        seoKeywords: selected,
        status: "active",
      });

      router.push("/dashboard/vendor");

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-5xl bg-white/5 p-10 rounded-3xl border border-white/10">
        <h1 className="text-3xl font-bold text-white text-center mb-4">
          Select SEO Keywords
        </h1>

        <p className="text-white/60 text-center mb-10">
          Choose keywords customers search in Korba
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {keywords.map((keyword) => {
            const active = selected.includes(keyword);

            return (
              <button
                key={keyword}
                onClick={() => toggleKeyword(keyword)}
                className={`px-5 py-3 rounded-full border text-sm transition-all ${
                  active
                    ? "bg-orange-600 text-white border-orange-600"
                    : "border-white/20 text-white/70 hover:border-orange-500"
                }`}
              >
                {keyword}
              </button>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            disabled={loading || selected.length === 0}
            onClick={handleFinish}
            className="btn-primary px-10 py-4 flex items-center gap-3 mx-auto disabled:opacity-40"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Finalizing...
              </>
            ) : (
              "Finish Setup → Go to Dashboard"
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
