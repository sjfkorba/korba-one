"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, Briefcase, ShoppingBag, Wrench, Phone } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shops", href: "/shops", icon: Store },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Buy", href: "/buy-sell", icon: ShoppingBag },
  { name: "Services", href: "/services", icon: Wrench },
  { name: "Emergency", href: "/emergency", icon: Phone },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/10">
      <div className="flex justify-around items-center py-2 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center text-xs"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`p-2 rounded-xl ${
                  isActive
                    ? "bg-orange-600/20 text-orange-500"
                    : "text-white/60"
                }`}
              >
                <Icon size={20} />
              </motion.div>

              <span
                className={`mt-1 ${
                  isActive ? "text-orange-500" : "text-white/50"
                }`}
              >
                {item.name}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 w-5 h-1 bg-orange-500 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
