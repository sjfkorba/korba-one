"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { name: "Overview", path: "/seller" },
  { name: "Listings", path: "/seller/listings" },
  { name: "Jobs", path: "/seller/jobs" },
  { name: "Offers", path: "/seller/offers" },
  { name: "Analytics", path: "/seller/analytics" },
  { name: "Settings", path: "/seller/settings" },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="h-screen w-64 px-6 py-10 bg-white/5 backdrop-blur-xl border-r border-white/10">
      
      <h2 className="text-lg font-semibold text-white mb-8 tracking-wide">
        Seller Panel
      </h2>

      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const isActive = pathname === link.path

          return (
            <Link
              key={link.path}
              href={link.path}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
