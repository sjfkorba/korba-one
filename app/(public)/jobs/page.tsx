"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import JobCard from "@/components/cards/JobCard";
import { getLatestJobs, PublicJob } from "@/lib/dashboard";

export default function JobsPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [jobs, setJobs] = useState<PublicJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState("All");

  const jobTypes = ["All", "Full Time", "Part Time", "Contract"];

  // 🔥 Fetch Jobs from Firebase
  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await getLatestJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  // 🔎 Filtering Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All" || job.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [jobs, search, typeFilter]);

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
          <input
            type="text"
            placeholder="Search job title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-premium flex-1"
          />

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

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 text-white/60">
            Loading jobs...
          </div>
        ) : filteredJobs.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} {...job} />
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