import { Suspense } from "react";
import JobsClient from "./JobsClient";

export const dynamic = "force-dynamic";

export default function JobsPage() {
  return (
    <Suspense fallback={<div>Loading jobs...</div>}>
      <JobsClient />
    </Suspense>
  );
}