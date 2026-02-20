"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden section-padding">

      {/* Background Glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-600/20 blur-[140px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-6 px-4 py-2 text-xs rounded-full bg-white/5 border border-white/10 text-white/70"
        >
          🚀 Korba’s Digital Super App
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-black leading-tight"
        >
          Everything in{" "}
          <span className="text-orange-500">Korba</span>, <br />
          Now in One Powerful Platform.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-6 text-white/60 max-w-2xl mx-auto text-lg"
        >
          Discover shops, services, jobs, buy & sell listings and emergency
          contacts — built exclusively for Korba.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-5"
        >
          <Link href="/shops" className="btn-primary text-center">
            Explore Now
          </Link>

          <Link
            href="/signup"
            className="px-6 py-3 rounded-full border border-white/20 hover:border-orange-500 hover:text-orange-500 transition"
          >
            List Your Business
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
