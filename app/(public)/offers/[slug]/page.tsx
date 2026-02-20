"use client";

import { useParams } from "next/navigation";
import { MapPin, Phone, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";

export default function OfferDetailsPage() {
  const params = useParams();
  const slug = params.slug;

  // Temporary demo data (Later Firebase se load hoga)
  const offer = {
    title: "Flat 20% Off on LED TVs",
    shop: "Balaji Electronics",
    location: "Transport Nagar, Korba",
    phone: "+91 90000 00000",
    discount: "20% OFF",
    validTill: "30 June 2026",
    description:
      "Upgrade your home entertainment with premium LED TVs at a flat 20% discount. Limited time offer valid on selected models only.",
    terms: [
      "Offer valid till mentioned expiry date.",
      "Applicable on selected LED TV models only.",
      "Cannot be combined with other offers.",
      "Store terms and conditions apply.",
    ],
  };

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">

        {/* Hero Banner */}
        <div className="relative mb-16">
          <div className="h-64 md:h-80 rounded-3xl bg-gradient-to-br from-orange-600/20 to-black border border-white/10" />

          <div className="absolute bottom-6 left-6">
            <span className="bg-orange-600 text-white text-sm font-bold px-4 py-1 rounded-full">
              {offer.discount}
            </span>

            <h1 className="text-3xl md:text-4xl font-black mt-4">
              {offer.title}
            </h1>

            <p className="text-orange-500 text-sm mt-2">
              {offer.shop}
            </p>

            <div className="flex items-center gap-4 mt-3 text-white/60 text-sm">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                {offer.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                Valid till {offer.validTill}
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* Left Content */}
          <div className="md:col-span-2 space-y-10">

            {/* Description */}
            <div className="card-premium">
              <h2 className="text-xl font-bold text-orange-500 mb-4">
                Offer Details
              </h2>
              <p className="text-white/70 leading-relaxed">
                {offer.description}
              </p>
            </div>

            {/* Terms */}
            <div className="card-premium">
              <h2 className="text-xl font-bold text-orange-500 mb-4">
                Terms & Conditions
              </h2>

              <ul className="list-disc ml-6 space-y-2 text-white/70">
                {offer.terms.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Contact Card */}
            <div className="card-premium">
              <h3 className="font-bold text-white mb-4">
                Contact Store
              </h3>

              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Phone size={14} />
                {offer.phone}
              </div>

              <button className="btn-primary w-full mt-6">
                Contact Now
              </button>
            </div>

            {/* Urgency CTA */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card-premium text-center border border-orange-600/40"
            >
              <Tag className="mx-auto text-orange-500" />
              <h3 className="font-bold text-white mt-4">
                Limited Time Offer
              </h3>
              <p className="text-white/60 text-sm mt-2">
                Grab this deal before it expires.
              </p>

              <button className="btn-primary mt-4 w-full">
                Visit Shop
              </button>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
