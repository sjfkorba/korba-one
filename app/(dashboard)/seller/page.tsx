"use client"

import { useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import StatsCard from "@/components/dashboard/StatsCard"
import { getSellerStats } from "@/lib/dashboard"

export default function SellerDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/login"
        return
      }

      const sellerStats = await getSellerStats(user.uid)
      setStats(sellerStats)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Seller Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Profile Views" value={stats.views} />
        <StatsCard title="Total Listings" value={stats.listings} />
        <StatsCard title="Total Contacts" value={stats.contacts} />
        <StatsCard title="Active Offers" value={stats.offers} />
      </div>
    </div>
  )
}
