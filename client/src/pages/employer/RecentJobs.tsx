import React from "react";
import { useRecentJobs } from "./hooks/useRecentJobs";
import JobCard from "./JobCard";

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
    <div className="grid gap-xs place-items-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
      {jobs?.map((job, ind) => {
        return <JobCard job={job} key={job.job_id} index={ind} />;
      })}
    </div>
  );
};

export default RecentJobs;
