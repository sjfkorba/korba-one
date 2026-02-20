"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Loader2, Crown, Eye, Phone, Edit, Rocket } from "lucide-react";
import Link from "next/link";

export default function VendorDashboard() {
  const [loading, setLoading] = useState(true);
  const [vendor, setVendor] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const snap = await getDoc(doc(db, "vendors", user.uid));
      setVendor(snap.data());
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-white" />
      </div>
    );

  if (!vendor)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        No vendor profile found.
      </div>
    );

  const isPremiumActive =
    vendor.isPremium &&
    vendor.premiumExpiry?.toDate?.() > new Date();

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">{vendor.businessName}</h1>
          <p className="text-gray-400 text-sm">{vendor.category}</p>
        </div>

        {isPremiumActive ? (
          <span className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold mt-4 md:mt-0">
            <Crown size={16} /> Premium Active
          </span>
        ) : (
          <Link
            href="/dashboard/upgrade"
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 px-4 py-2 rounded-full text-sm font-semibold mt-4 md:mt-0"
          >
            <Rocket size={16} /> Upgrade to Premium
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/5 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Eye size={18} />
            <span className="text-sm text-gray-400">Total Views</span>
          </div>
          <h2 className="text-2xl font-bold">{vendor.views || 0}</h2>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Phone size={18} />
            <span className="text-sm text-gray-400">Contact Clicks</span>
          </div>
          <h2 className="text-2xl font-bold">{vendor.clicks || 0}</h2>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Crown size={18} />
            <span className="text-sm text-gray-400">Plan Status</span>
          </div>
          <h2 className="text-2xl font-bold">
            {isPremiumActive ? "Premium" : "Free"}
          </h2>
        </div>
      </div>

      {/* Business Info */}
      <div className="bg-white/5 p-6 rounded-2xl mb-10">
        <h2 className="text-xl font-semibold mb-4">Business Details</h2>

        <div className="space-y-3 text-gray-300 text-sm">
          <p><strong>Owner:</strong> {vendor.ownerName}</p>
          <p><strong>Phone:</strong> {vendor.phone}</p>
          <p><strong>Description:</strong> {vendor.description || "No description added."}</p>
        </div>

        <Link
          href="/dashboard/edit"
          className="inline-flex items-center gap-2 mt-6 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200"
        >
          <Edit size={16} /> Edit Business
        </Link>
      </div>

      {/* Premium Locked Section */}
      {!isPremiumActive && (
        <div className="bg-gradient-to-r from-orange-600 to-yellow-500 p-6 rounded-2xl text-black">
          <h3 className="text-lg font-bold mb-2">
            Get More Visibility in Korba
          </h3>
          <p className="text-sm mb-4">
            Upgrade to Premium and appear at the top of the directory,
            add more images, and get priority exposure.
          </p>

          <Link
            href="/dashboard/upgrade"
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Upgrade Now
          </Link>
        </div>
      )}
    </div>
  );
}
