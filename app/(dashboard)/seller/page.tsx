"use client"

import { useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { getSellerStats, getSellerListings } from "@/lib/dashboard"
import StatsCard from "@/components/dashboard/StatsCard"
import Link from "next/link"

export default function SellerDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/login"
        return
      }

      const sellerStats = await getSellerStats(user.uid)
      const sellerListings = await getSellerListings(user.uid)

      setStats(sellerStats)
      setListings(sellerListings)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading)
    return <div className="p-6 text-white/60">Loading dashboard...</div>

  return (
    <div className="space-y-8 pb-20">

      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black">
          Seller <span className="text-orange-500">Dashboard</span>
        </h1>
        <p className="text-white/50 mt-1 text-sm">
          Monitor your business performance
        </p>
      </div>

      {/* 🔥 STATS GRID (Mobile First) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard title="Views" value={stats.views} />
        <StatsCard title="Listings" value={stats.listings} />
        <StatsCard title="Contacts" value={stats.contacts} />
        <StatsCard title="Offers" value={stats.offers} />
      </div>

      {/* 🔥 QUICK ACTION BUTTONS (Mobile Friendly) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/seller/create-listing"
          className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 rounded-xl text-center transition"
        >
          + Create Listing
        </Link>

        <Link
          href="/seller/profile"
          className="bg-slate-800 hover:bg-slate-700 py-4 rounded-xl text-center transition"
        >
          Edit Profile
        </Link>

        <Link
          href="/shop"
          className="bg-slate-800 hover:bg-slate-700 py-4 rounded-xl text-center transition"
        >
          View Public Page
        </Link>
      </div>

      {/* 🔥 MOBILE-FIRST LISTINGS CARDS */}
      <div>
        <h2 className="text-lg font-bold mb-4">Your Listings</h2>

        {listings.length === 0 ? (
          <div className="text-white/50">No listings yet.</div>
        ) : (
          <div className="space-y-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-slate-900 border border-white/5 p-4 rounded-xl shadow hover:bg-slate-800 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {listing.title}
                    </h3>
                    <p className="text-xs text-white/50 mt-1">
                      ID: {listing.id}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      listing.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {listing.status}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-white/60 mt-3">
                  <span>👁 {listing.views}</span>
                  <span>📞 {listing.contacts}</span>
                </div>

                <div className="mt-4">
                  <Link
                    href={`/jobs/${listing.id}`}
                    className="text-orange-500 text-sm hover:underline"
                  >
                    View Listing →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}