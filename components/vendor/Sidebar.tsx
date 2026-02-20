"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#111827] border-r border-white/10 p-6">
      <h2 className="text-xl font-bold mb-10">KorbaOne</h2>

      <nav className="space-y-4 text-sm">
        <Link href="/vendor/dashboard">Overview</Link>
        <Link href="/vendor/listings">Listings</Link>
        <Link href="/vendor/offers">Offers</Link>
        <Link href="/vendor/analytics">Analytics</Link>
        <Link href="/vendor/profile">Profile</Link>

        {isDesktop && (
          <Link href="/admin" className="text-yellow-400">
            Admin Panel
          </Link>
        )}
      </nav>
    </aside>
  );
}
