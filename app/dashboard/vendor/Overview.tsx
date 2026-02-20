"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Overview({ vendor }: any) {
  const [stats, setStats] = useState({
    views: 0,
    contacts: 0,
    listings: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const listingsSnap = await getDocs(
        query(collection(db, "shops"), where("ownerId", "==", vendor.uid))
      );

      const contactsSnap = await getDocs(
        query(collection(db, "contacts"), where("ownerId", "==", vendor.uid))
      );

      let totalViews = 0;
      listingsSnap.forEach(doc => {
        totalViews += doc.data().views || 0;
      });

      setStats({
        listings: listingsSnap.size,
        contacts: contactsSnap.size,
        views: totalViews,
      });
    }

    fetchStats();
  }, [vendor.uid]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Welcome back, {vendor.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Listings" value={stats.listings} />
        <Card title="Profile Views" value={stats.views} />
        <Card title="Contacts Received" value={stats.contacts} />
      </div>
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
