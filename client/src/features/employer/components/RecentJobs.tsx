import React from "react";
import JobCard from "./JobCard";
import { useRecentJobs } from "../api/getRecentJobs";

type RecentJobsProps = {
  employerId: string | undefined;
};

const RecentJobs: React.FC<RecentJobsProps> = ({ employerId }) => {
  const { jobs, isLoading, isError } = useRecentJobs(employerId);

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (jobs?.length === 0) {
    return <div className="">No recent jobs available!</div>;
  }

  if (isError) return <div className="text-center">Error</div>;

  return (
    <div className="grid gap-xs place-items-center sm:grid-cols-auto-sm">
      {jobs?.map((job) => {
        return <JobCard job={job} key={job.job_id} />;
      })}
    </div>
  );
};

export default RecentJobs;
