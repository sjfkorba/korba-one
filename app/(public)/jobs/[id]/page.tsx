"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getJobById } from "@/lib/dashboard";
import {
  MapPin,
  Clock,
  IndianRupee,
  MessageCircle,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { incrementJobView, incrementJobContact } from "@/lib/dashboard";

export default function JobDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!id) return;

  const fetchJob = async () => {
    const data = await getJobById(id);
    setJob(data);
    setLoading(false);

    if (id) {
      incrementJobView(id);
    }
  };

  fetchJob();
}, [id]);

  const handleWhatsAppApply = async () => {
  if (!job?.whatsapp) {
    alert("Recruiter WhatsApp number not available.");
    return;
  }

  await incrementJobContact(id);

  const message = `Hello 👋

I am interested in the job "${job.title}" posted on KorbaOne.

Please share further details.

Thank you.`;

  const encodedMessage = encodeURIComponent(message);

  window.open(
    `https://wa.me/${job.whatsapp}?text=${encodedMessage}`,
    "_blank"
  );
};

  if (loading) {
    return (
      <div className="section-padding text-white text-center">
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="section-padding text-white text-center">
        Job not found.
      </div>
    );
  }

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">

        {/* HERO SECTION */}
        <div className="relative mb-16">

          <div className="h-72 md:h-96 rounded-3xl bg-gradient-to-br from-orange-600/30 via-black to-slate-900 border border-white/10" />

          <div className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/10">

            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="bg-orange-600/20 text-orange-500 px-4 py-1 rounded-full text-xs">
                {job.type}
              </span>

              {job.status === "active" && (
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                  Hiring Now
                </span>
              )}
            </div>


            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
              {job.title}
            </h1>

            <p className="text-orange-500 text-sm mt-2">
              {job.company}
            </p>

            <div className="flex flex-wrap gap-6 mt-4 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                {job.location}
              </div>

              {job.salary && (
                <div className="flex items-center gap-2 text-green-400">
                  <IndianRupee size={14} />
                  {job.salary}
                </div>
              )}

              <div className="flex items-center gap-2">
                <Clock size={14} />
                Posted {job.postedOn}
              </div>
              
            </div>

          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* LEFT CONTENT */}
          <div className="md:col-span-2 space-y-10">

            {/* Description */}
            <div className="card-premium">
              <h2 className="text-xl font-bold text-orange-500 mb-4 flex items-center gap-2">
                <Briefcase size={18} />
                Job Description
              </h2>
              <p className="text-white/70 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            {job.responsibilities?.length > 0 && (
              <div className="card-premium">
                <h2 className="text-xl font-bold text-orange-500 mb-4">
                  Responsibilities
                </h2>
                <ul className="list-disc ml-6 space-y-2 text-white/70">
                  {job.responsibilities.map(
                    (item: string, index: number) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {job.requirements?.length > 0 && (
              <div className="card-premium">
                <h2 className="text-xl font-bold text-orange-500 mb-4">
                  Requirements
                </h2>
                <ul className="list-disc ml-6 space-y-2 text-white/70">
                  {job.requirements.map(
                    (item: string, index: number) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>
            )}

          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">

            {/* Apply Card */}
            <div className="card-premium">
              <h3 className="font-bold text-white mb-4">
                Apply for this Job
              </h3>

              <button
                onClick={handleWhatsAppApply}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition rounded-xl py-3 font-semibold"
              >
                <MessageCircle size={18} />
                Apply via WhatsApp
              </button>

              <p className="text-xs text-white/50 mt-4 text-center">
                Recruiter usually responds within few hours.
              </p>
            </div>

            {/* Urgency Block */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card-premium border border-orange-600/40 text-center"
            >
              <Clock className="mx-auto text-orange-500" />
              <h3 className="font-bold text-white mt-4">
                Limited Positions Available
              </h3>
              <p className="text-white/60 text-sm mt-2">
                Apply early to secure your opportunity.
              </p>
            </motion.div>

          </div>
          <div className="mt-3 text-sm text-white/60">
  Posted By{" "}
  <Link
    href={`/shops/${job.companySlug}`}
    className="text-orange-400 font-semibold hover:underline transition"
  >
    {job.company}
  </Link>
</div>
          

        </div>
      </div>
    </section>
  );
}
