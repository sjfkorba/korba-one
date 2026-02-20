"use client";

import { useState, useMemo } from "react";
import {
  Phone,
  Shield,
  Ambulance,
  Flame,
  User,
  AlertTriangle,
  Heart,
} from "lucide-react";

const emergencyContacts = [
  // Universal Emergency
  { category: "Universal Emergency", label: "National Emergency", number: "112" },

  // Core Emergency
  { category: "Police", label: "Police Control Room", number: "100" },
  { category: "Fire", label: "Fire Brigade", number: "101" },
  { category: "Medical", label: "Ambulance", number: "108" },

  // Women & Child Safety
  { category: "Women Safety", label: "Women Helpline", number: "181" },
  { category: "Women Safety", label: "Women Police Helpline", number: "1091" },
  { category: "Child Protection", label: "Child Helpline", number: "1098" },

  // Cyber & Financial Safety
  { category: "Cyber Crime", label: "Cyber Crime Financial Fraud", number: "1930" },

  // State Specific
  { category: "Chhattisgarh Govt", label: "CM Helpline Chhattisgarh", number: "1100" },
];

export default function EmergencyPage() {
  const [search, setSearch] = useState("");

  const filteredContacts = useMemo(() => {
    return emergencyContacts.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.number.includes(search)
    );
  }, [search]);

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black">
            Emergency <span className="text-red-500">Helplines</span>
          </h1>
          <p className="mt-4 text-white/60">
            Quick access to verified national and Chhattisgarh emergency contacts.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search by service, category or number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-premium w-full"
          />
        </div>

        {/* Emergency Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact, index) => {
              const isWomen =
                contact.category === "Women Safety" ||
                contact.category === "Child Protection";

              return (
                <div
                  key={index}
                  className={`card-premium flex items-center justify-between ${
                    isWomen
                      ? "border border-pink-500/40 bg-pink-500/5"
                      : ""
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-white">
                      {contact.label}
                    </h3>
                    <p className="text-white/60 text-xs mt-1">
                      {contact.category}
                    </p>
                    <p className="text-white/70 text-sm mt-2">
                      {contact.number}
                    </p>
                  </div>

                  <a
                    href={`tel:${contact.number}`}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold transition ${
                      isWomen
                        ? "bg-pink-600 hover:bg-pink-500 text-white"
                        : "bg-red-600 hover:bg-red-500 text-white"
                    }`}
                  >
                    <Phone size={14} />
                    Call
                  </a>
                </div>
              );
            })
          ) : (
            <div className="text-center text-white/50 py-20 col-span-2">
              No matching emergency service found.
            </div>
          )}

        </div>

        {/* Info Section */}
        <div className="mt-16 text-center text-white/50 text-sm">
          In case of immediate danger, dial 112 without delay.
        </div>

      </div>
    </section>
  );
}
