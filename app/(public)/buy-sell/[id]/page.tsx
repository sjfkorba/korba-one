"use client";

import { useParams } from "next/navigation";
import { MapPin, IndianRupee, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug;

  // Demo Data (Later Firebase se load hoga)
  const product = {
    title: "iPhone 13 (128GB)",
    price: "₹38,000",
    condition: "Used",
    location: "Niharika, Korba",
    seller: "Rahul Verma",
    phone: "+91 90000 00000",
    description:
      "Well-maintained iPhone 13 (128GB). No scratches, battery health 92%. Original box and charger included. Serious buyers only.",
    postedOn: "25 June 2026",
  };

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">

        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">

          {/* Image Gallery */}
          <div>
            <div className="h-80 bg-slate-800 rounded-3xl border border-white/10 mb-4" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((img) => (
                <div
                  key={img}
                  className="h-24 bg-slate-800 rounded-xl border border-white/10"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">

            <span className="bg-orange-600/20 text-orange-500 px-4 py-1 rounded-full text-sm">
              {product.condition}
            </span>

            <h1 className="text-3xl md:text-4xl font-black">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 text-orange-500 text-2xl font-bold">
              <IndianRupee size={20} />
              {product.price}
            </div>

            <div className="flex items-center gap-2 text-white/60 text-sm">
              <MapPin size={14} />
              {product.location}
            </div>

            <button className="btn-primary w-full mt-6">
              Contact Seller
            </button>

            <p className="text-xs text-white/50">
              Posted on {product.postedOn}
            </p>

          </div>
        </div>

        {/* Description + Seller Section */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* Description */}
          <div className="md:col-span-2 space-y-8">

            <div className="card-premium">
              <h2 className="text-xl font-bold text-orange-500 mb-4">
                Product Description
              </h2>
              <p className="text-white/70 leading-relaxed">
                {product.description}
              </p>
            </div>

          </div>

          {/* Seller Card */}
          <div className="space-y-6">

            <div className="card-premium">
              <h3 className="font-bold text-white mb-4">
                Seller Information
              </h3>

              <p className="text-white/70 text-sm">
                {product.seller}
              </p>

              <div className="flex items-center gap-2 text-white/60 text-sm mt-4">
                <Phone size={14} />
                {product.phone}
              </div>

              <button className="btn-primary w-full mt-6">
                Call Now
              </button>
            </div>

            {/* Urgency Block */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card-premium border border-orange-600/40 text-center"
            >
              <Clock className="mx-auto text-orange-500" />
              <h3 className="font-bold text-white mt-4">
                Limited Availability
              </h3>
              <p className="text-white/60 text-sm mt-2">
                This product may sell quickly. Contact now.
              </p>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
