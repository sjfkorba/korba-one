"use client"

import { useEffect, useState } from "react"
import JobCard from "@/components/cards/JobCard"
import Link from "next/link"
import { getLatestJobs } from "@/lib/dashboard"

export default function JobsGrid() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getLatestJobs()
      setJobs(data)
      setLoading(false)
    }

    fetchJobs()
  }, [])

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-black">
            Latest <span className="text-orange-500">Jobs</span>
          </h2>

          <Link
            href="/jobs"
            className="text-sm text-orange-500 hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-white/60">Loading jobs...</div>
        )}

        {/* Empty */}
        {!loading && jobs.length === 0 && (
          <div className="text-white/60">
            No jobs available right now.
          </div>
        )}

        {/* Grid */}
        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                type={job.type}
                salary={job.salary}
                postedAt={job.postedAt}
                featured={job.featured}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
