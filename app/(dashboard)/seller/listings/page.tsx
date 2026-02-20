"use client"

import { useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import {
  getSellerListings,
  checkMonthlyListingLimit,
} from "@/lib/dashboard"
import { Timestamp } from "firebase/firestore"
import Link from "next/link"

export default function ListingsPage() {
  const [listings, setListings] = useState<any[]>([])
  const [limitInfo, setLimitInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/login"
        return
      }

      const data = await getSellerListings(user.uid)
      const limit = await checkMonthlyListingLimit(user.uid)

      setListings(data || [])
      setLimitInfo(limit)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading || !limitInfo) {
    return <div className="text-white/60">Loading listings...</div>
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          My Listings
        </h1>

        <Link
          href="/seller/listings/create"
          className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
            limitInfo.limitReached
              ? "bg-gray-600 pointer-events-none opacity-60"
              : "bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30"
          }`}
        >
          + Create Listing
        </Link>
      </div>

      <div className="text-sm text-white/60">
        Used: {limitInfo.used}/15 | Remaining: {limitInfo.remaining}
      </div>

      {/* EMPTY STATE */}
      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">

          <div className="w-24 h-24 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 text-3xl">
            📦
          </div>

          <h2 className="text-2xl font-bold text-white">
            No Listings Yet
          </h2>

          <p className="text-white/60 max-w-md">
            You haven’t listed anything yet. Start showcasing your products or services.
          </p>

          <Link
            href="/seller/listings/create"
            className={`px-6 py-3 rounded-xl font-medium transition ${
              limitInfo.limitReached
                ? "bg-gray-600 pointer-events-none opacity-60"
                : "bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30"
            }`}
          >
            Add Your First Listing
          </Link>

          {limitInfo.limitReached && (
            <p className="text-sm text-red-400">
              Monthly limit reached (15 listings).
            </p>
          )}
        </div>
      ) : (

        /* TABLE */
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-white/70 text-sm">
              <tr>
                <th className="p-4">Title</th>
                <th>Views</th>
                <th>Contacts</th>
                <th>Status</th>
                <th>Expiry</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {listings.map((item) => {
                const expiry =
                  item.expiryDate instanceof Timestamp
                    ? item.expiryDate.toDate()
                    : null

                const isExpired =
                  expiry && expiry < new Date()

                return (
                  <tr
                    key={item.id}
                    className="border-t border-white/10 text-sm text-white/80"
                  >
                    <td className="p-4">{item.title}</td>
                    <td>{item.views}</td>
                    <td>{item.contacts}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          isExpired
                            ? "bg-red-500/20 text-red-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {isExpired ? "Expired" : "Active"}
                      </span>
                    </td>

                    <td>
                      {expiry
                        ? expiry.toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="space-x-3">
                      <button className="text-red-400 hover:text-red-500">
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      )}

    </div>
  )
}
