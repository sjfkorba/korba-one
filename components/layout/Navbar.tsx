"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shops", href: "/shops" },
    { name: "Offers", href: "/offers" },
    { name: "Jobs", href: "/jobs" },
    { name: "Buy/Sell", href: "/buy-sell" },
    { name: "Services", href: "/services" },
    { name: "Emergency", href: "/emergency" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setRole(userSnap.data().role);
        }
      } else {
        setUser(null);
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight">
            Korba<span className="text-orange-500">One</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-orange-500 transition"
            >
              {link.name}
            </Link>
          ))}

          {!loading && (
            <>
              {/* NOT LOGGED IN */}
              {!user && (
                <Link
                  href="/login"
                  className="btn-primary text-sm px-5 py-2"
                >
                  Login / Sign Up
                </Link>
              )}

              {/* SELLER */}
              {user && role === "seller" && (
                <>
                  <Link
                    href="/seller"
                    className="btn-primary text-sm px-5 py-2"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    Logout
                  </button>
                </>
              )}

              {/* BUYER */}
              {user && role === "buyer" && (
                <>
                  <Link
                    href="/buyer"
                    className="btn-primary text-sm px-5 py-2"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    Logout
                  </button>
                </>
              )}

              {/* ADMIN */}
              {user && role === "admin" && (
                <>
                  <Link
                    href="/admin"
                    className="hidden lg:block text-xs text-red-400 hover:text-red-500 transition"
                  >
                    Admin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10"
          >
            <div className="flex flex-col px-6 py-6 space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-white/80 hover:text-orange-500 transition text-base font-medium"
                >
                  {link.name}
                </Link>
              ))}

              {!loading && (
                <>
                  {!user && (
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="btn-primary text-center"
                    >
                      Login / Sign Up
                    </Link>
                  )}

                  {user && (
                    <>
                      {role === "seller" && (
                        <Link
                          href="/seller"
                          onClick={() => setOpen(false)}
                          className="btn-primary text-center"
                        >
                          Dashboard
                        </Link>
                      )}

                      {role === "buyer" && (
                        <Link
                          href="/buyer"
                          onClick={() => setOpen(false)}
                          className="btn-primary text-center"
                        >
                          My Account
                        </Link>
                      )}

                      {role === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setOpen(false)}
                          className="btn-primary text-center bg-red-600"
                        >
                          Admin Panel
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="text-center text-white/60 hover:text-white"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
