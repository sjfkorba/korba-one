"use client";

import { useParams } from "next/navigation";
import { MapPin, Phone, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug;

  // Demo Data (Later Firebase se dynamic load hoga)
  const service = {
    name: "Raj Electrical Services",
    category: "Electrician",
    location: "Niharika, Korba",
    phone: "+91 90000 00000",
    experience: "8+ Years Experience",
    description:
      "Professional electrical repair and installation services in Korba. We handle residential, commercial and emergency electrical work with safety and precision.",
    offerings: [
      "Home Wiring",
      "Switch & Socket Repair",
      "Fan & Light Installation",
      "Inverter Installation",
      "Emergency Electrical Support",
    ],
  };

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">

        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="h-64 md:h-80 rounded-3xl bg-gradient-to-br from-orange-600/20 to-black border border-white/10" />

          <div className="absolute bottom-6 left-6">
            <span className="bg-orange-600/20 text-orange-500 px-4 py-1 rounded-full text-sm">
              {service.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-black mt-4">
              {service.name}
            </h1>

            <div className="flex items-center gap-4 mt-4 text-white/60 text-sm">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                {service.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {service.experience}
              </div>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* Left Content */}
          <div className="md:col-span-2 space-y-10">

            {/* About */}
            <div className="card-premium">
              <h2 className="text-xl font-bold text-orange-500 mb-4">
                About This Service
              </h2>
              <p className="text-white/70 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Services Offered */}
            <div className="card-premium">
              <h2 className="text-xl font-bold text-orange-500 mb-6">
                Services Offered
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {service.offerings.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/70"
                  >
                    <CheckCircle size={16} className="text-orange-500" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Contact Card */}
            <div className="card-premium">
              <h3 className="font-bold text-white mb-4">
                Contact Service Provider
              </h3>

              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Phone size={14} />
                {service.phone}
              </div>

              <button className="btn-primary w-full mt-6">
                Call Now
              </button>

              <button className="w-full mt-3 border border-orange-600 text-orange-500 py-3 rounded-xl font-semibold hover:bg-orange-600/10 transition">
                WhatsApp Now
              </button>
            </div>

            {/* Trust Block */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card-premium border border-orange-600/40 text-center"
            >
              <h3 className="font-bold text-white">
                Verified Local Professional
              </h3>
              <p className="text-white/60 text-sm mt-2">
                Trusted by local customers in Korba.
              </p>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
