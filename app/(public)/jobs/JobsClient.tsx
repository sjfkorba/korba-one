"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import JobCard from "@/components/cards/JobCard";
import { getLatestJobs, PublicJob } from "@/lib/dashboard";

export default function JobsClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [jobs, setJobs] = useState<PublicJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    async function fetchJobs() {
      const data = await getLatestJobs();
      setJobs(data);
      setLoading(false);
    }
    fetchJobs();
  }, []);

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
    <div>
      {loading ? "Loading..." :
        filteredJobs.map(job => (
          <JobCard key={job.id} {...job} />
        ))
      }
    </div>
  );
}