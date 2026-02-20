"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import JobCard from "@/components/cards/JobCard";

const demoJobs = [
  {
    title: "Sales Executive",
    company: "Balaji Electronics",
    location: "Transport Nagar, Korba",
    type: "Full Time",
    slug: "sales-executive-balaji",
  },
  {
    title: "Pharmacist",
    company: "Shree Medical",
    location: "Power House Road, Korba",
    type: "Full Time",
    slug: "pharmacist-shree",
  },
  {
    title: "Maths Teacher",
    company: "Modern Coaching",
    location: "Niharika, Korba",
    type: "Part Time",
    slug: "maths-teacher-modern",
  },
  {
    title: "Delivery Partner",
    company: "City Fast Food",
    location: "Kosabadi, Korba",
    type: "Contract",
    slug: "delivery-partner-city",
  },
];

export default function JobsPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [search, setSearch] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState("All");

  const jobTypes = ["All", "Full Time", "Part Time", "Contract"];

  const filteredJobs = useMemo(() => {
    return demoJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All" || job.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black">
            Explore <span className="text-orange-500">Jobs</span> in Korba
          </h1>
          <p className="mt-4 text-white/60">
            Discover latest job opportunities from local businesses.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <input
            type="text"
            placeholder="Search job title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-premium flex-1"
          />

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input-premium md:w-64"
          >
            {jobTypes.map((type) => (
              <option key={type} value={type} className="bg-slate-900">
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.slug} {...job} />
            ))}
          </div>
        ) : (
          <div className="text-center text-white/50 py-20">
            No jobs found.
          </div>
        )}

      </div>
    </section>
  );
}
