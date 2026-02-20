"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const demoOffers = [
  {
    title: "Flat 20% Off on LED TVs",
    shop: "Balaji Electronics",
    discount: "20% OFF",
    validTill: "30 June 2026",
    slug: "flat-20-off-led-tv",
  },
  {
    title: "Buy 1 Get 1 Free",
    shop: "City Fast Food",
    discount: "BOGO",
    validTill: "15 July 2026",
    slug: "buy-1-get-1-free",
  },
  {
    title: "Free Health Checkup Camp",
    shop: "Shree Medical Store",
    discount: "Free Service",
    validTill: "10 July 2026",
    slug: "free-health-checkup",
  },
];

export default function OffersPage() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black">
            Special <span className="text-orange-500">Offers</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Discover limited-time deals and exclusive promotions from local
            businesses in Korba.
          </p>
        </div>

        {/* Offers Grid */}
        {demoOffers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {demoOffers.map((offer) => (
              <motion.div
                key={offer.slug}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="card-premium relative overflow-hidden"
              >
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {offer.discount}
                </div>

                <h3 className="text-lg font-bold text-white mt-6">
                  {offer.title}
                </h3>

                <p className="text-orange-500 text-sm mt-2">
                  {offer.shop}
                </p>

                <div className="flex items-center gap-2 text-white/60 text-sm mt-6">
                  <Clock size={14} />
                  Valid till {offer.validTill}
                </div>

                <Link href={`/offers/${offer.slug}`}>
                  <button className="btn-primary w-full mt-6">
                    View Details
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white">
              No Active Offers Right Now
            </h2>
            <p className="text-white/60 mt-4">
              Are you a seller? Promote your business with exclusive offers.
            </p>

            <Link href="/dashboard/seller/offers">
              <button className="btn-primary mt-8">
                Create Offer
              </button>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
