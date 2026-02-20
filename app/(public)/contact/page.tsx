"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Future: Connect to Firebase or API route
    setTimeout(() => {
      alert("Message sent successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black">
            Contact <span className="text-orange-500">Us</span>
          </h1>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
            Have questions, business inquiries, or partnership proposals?
            We’re here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="space-y-8">

            <div className="card-premium flex items-start gap-4">
              <Mail className="text-orange-500" />
              <div>
                <h3 className="font-semibold text-white">Email</h3>
                <p className="text-white/60 text-sm">
                  info@korbaone.com
                </p>
              </div>
            </div>

            <div className="card-premium flex items-start gap-4">
              <Phone className="text-orange-500" />
              <div>
                <h3 className="font-semibold text-white">Phone</h3>
                <p className="text-white/60 text-sm">
                  +91 79744 27353
                </p>
              </div>
            </div>

            <div className="card-premium flex items-start gap-4">
              <MapPin className="text-orange-500" />
              <div>
                <h3 className="font-semibold text-white">Location</h3>
                <p className="text-white/60 text-sm">
                  Korba, Chhattisgarh, India
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="card-premium space-y-6"
          >
            <div>
              <label className="text-sm text-white/60">Full Name</label>
              <input
                required
                type="text"
                className="input-premium mt-2"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="text-sm text-white/60">Email</label>
              <input
                required
                type="email"
                className="input-premium mt-2"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-sm text-white/60">Message</label>
              <textarea
                required
                rows={4}
                className="input-premium mt-2 resize-none"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
