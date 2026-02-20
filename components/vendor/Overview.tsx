"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function Overview({ vendor }: any) {
  const [stats, setStats] = useState({
    viewsToday: 0,
    leadsToday: 0,
    activeListings: 0,
    expiringSoon: 0,
  });

  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(db, "listings"),
        where("ownerId", "==", vendor.uid)
      );

      const snap = await getDocs(q);

      const now = new Date();
      let active = 0;
      let expiring = 0;

      const data: any[] = [];

      snap.forEach((doc) => {
        const d = doc.data();
        const expires = d.expiresAt?.toDate();

        if (expires > now) active++;

        if (expires && expires.getTime() - now.getTime() < 5 * 86400000)
          expiring++;

        data.push({
          id: doc.id,
          title: d.title,
          type: d.type,
          views: d.views || 0,
          leads: d.leads || 0,
          expiresAt: expires,
        });
      });

      setStats({
        viewsToday: 124, // replace with real daily stats later
        leadsToday: 6,
        activeListings: active,
        expiringSoon: expiring,
      });

      setListings(data);
    }

    fetchData();
  }, [vendor.uid]);

  return (
    <div className="space-y-10">

      {/* 🔥 Live Snapshot */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Views Today" value={stats.viewsToday} />
        <Stat label="Leads Today" value={stats.leadsToday} />
        <Stat label="Active Listings" value={stats.activeListings} />
        <Stat label="Expiring Soon" value={stats.expiringSoon} danger />
      </div>

      {/* 🚀 Listing Performance */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h2 className="text-lg font-semibold mb-6">
          Listing Performance
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-white/10">
              <tr>
                <th className="text-left pb-3">Listing</th>
                <th>Type</th>
                <th>Views</th>
                <th>Leads</th>
                <th>Status</th>
                <th>Expires</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr
                  key={l.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="py-3">{l.title}</td>
                  <td className="text-center">{l.type}</td>
                  <td className="text-center">{l.views}</td>
                  <td className="text-center">{l.leads}</td>
                  <td className="text-center">
                    {l.expiresAt > new Date()
                      ? "Active"
                      : "Expired"}
                  </td>
                  <td className="text-center">
                    {l.expiresAt?.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ⚡ Boost Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl">
        <h3 className="text-lg font-semibold">
          Boost Your Listing 🚀
        </h3>
        <p className="text-sm opacity-80 mt-2">
          Get 3x more visibility and priority placement.
        </p>
        <button className="mt-4 bg-black px-6 py-2 rounded-lg">
          Promote Now
        </button>
      </div>

    </div>
  );
}

function Stat({
  label,
  value,
  danger,
}: {
  label: string;
  value: number;
  danger?: boolean;
}) {
  return (
    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
      <p className="text-gray-400 text-xs">{label}</p>
      <p
        className={`text-xl font-bold mt-1 ${
          danger ? "text-red-400" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
