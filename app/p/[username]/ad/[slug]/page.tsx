"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  doc,
  updateDoc,
  increment,
  DocumentData,
} from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  MapPin,
  AlertCircle,
  ShieldCheck,
  Calendar,
  Share2,
  Eye,
  ImageOff,
} from "lucide-react";

/* ================= TYPES ================= */

interface AdType extends DocumentData {
  id: string;
  title?: string;
  price?: number;
  category?: string;
  address?: string;
  phone?: string;
  imageUrl?: string;
  description?: string;
  desc?: string;
  createdAt?: any;
  views?: number;
  ownerUid?: string;
  ownerName?: string;      // ✅ NEW
  ownerUsername?: string;  // optional
}

/* ================= COMPONENT ================= */

export default function AdDetailPage() {
  const params = useParams();
  const router = useRouter();

  const slug = params?.slug as string;
  const username = params?.username as string;

  const [ad, setAd] = useState<AdType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ================= FETCH AD ================= */

  useEffect(() => {
    if (!slug) return;

    const fetchAdData = async () => {
      try {
        setLoading(true);

        const q = query(
          collection(db, "listings"),
          where("slug", "==", slug),
          limit(1)
        );

        const snap = await getDocs(q);

        if (snap.empty) {
          setError("Listing not found");
          return;
        }

        const adDoc = snap.docs[0];

        const adData: AdType = {
          id: adDoc.id,
          ...(adDoc.data() as DocumentData),
        };

        setAd(adData);

        await updateDoc(doc(db, "listings", adDoc.id), {
          views: increment(1),
        });

      } catch (err) {
        setError("Technical error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdData();
  }, [slug]);

  /* ================= SHARE ================= */

  const handleShare = async () => {
    try {
      const shareData = {
        title: ad?.title || "Listing",
        text: ad?.title || "",
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {}
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Recently";
    const date = timestamp.toDate ? timestamp.toDate() : timestamp;
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !ad) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p>Listing not found</p>
      </div>
    );
  }

  const isJob = ad?.category?.toLowerCase().includes("job");
  const buttonLabel = isJob ? "Apply for Job" : "Contact Seller";

  /* ================= UI ================= */

  return (
    <main className="min-h-screen bg-slate-50 font-['Inter'] pb-24">

      {/* TOP BAR */}
      <div className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => router.push(`/p/${username}`)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-600"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex items-center gap-4 text-slate-500">
            <div className="flex items-center gap-1 text-xs">
              <Eye size={14} />
              {ad.views || 0}
            </div>
            <button onClick={handleShare}>
              <Share2 size={18} className="hover:text-orange-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-12 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-8 space-y-6">

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="aspect-[4/3] relative">
              {ad.imageUrl ? (
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full h-full object-contain bg-white"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  <ImageOff size={40} />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900">
              {ad.price
                ? `₹${Number(ad.price).toLocaleString("en-IN")}`
                : "Contact for Price"}
            </h1>

            <h2 className="text-lg mt-2 text-slate-700 font-medium">
              {ad.title}
            </h2>

            <div className="flex flex-wrap gap-6 mt-4 text-sm text-slate-500 border-t pt-4">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                {ad.address}
              </div>

              <div className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDate(ad.createdAt)}
              </div>
            </div>
          </div>

          {/* DESCRIPTION FIXED */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Description</h3>
            <p className="text-slate-600 whitespace-pre-line leading-relaxed">
              {ad.description ?? ad.desc ?? "No description provided."}
            </p>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">

          <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24 space-y-6">

            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">
                Seller Info
              </p>

              <button
                onClick={() => router.push(`/p/${username}`)}
                className="font-semibold text-slate-900 hover:text-orange-600 transition mt-2"
              >
                {ad.ownerName || username}
              </button>

              <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                <ShieldCheck size={14} />
                Verified Seller
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={`tel:${ad.phone}`}
                className="w-full bg-slate-900 text-white py-3 rounded-lg text-center font-semibold hover:bg-orange-600 transition"
              >
                <Phone size={16} className="inline mr-2" />
                {buttonLabel}
              </a>

              <a
                href={`https://wa.me/91${ad.phone}`}
                className="w-full bg-emerald-500 text-white py-3 rounded-lg text-center font-semibold hover:bg-emerald-600 transition"
              >
                WhatsApp
              </a>
            </div>

            <div className="flex justify-between pt-4 border-t text-sm text-slate-500">
              <button className="hover:text-orange-600">Save</button>
              <button onClick={handleShare} className="hover:text-orange-600">
                Share
              </button>
              <button className="text-red-500">Report</button>
            </div>

          </div>

          <div className="bg-orange-50 border border-orange-200 p-5 rounded-xl text-sm text-orange-800">
            <p className="font-semibold mb-2">Safety Tips</p>
            <p>Never pay in advance. Meet seller in safe location.</p>
          </div>

        </div>
      </div>

    </main>
  );
}
