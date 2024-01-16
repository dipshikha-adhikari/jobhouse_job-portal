import React from "react";
import JobCard from "./JobCard";
import { UseQueryResult, useQuery } from "react-query";
import { IJob } from "../../types/postgres/types";
import { privateRequest } from "../../lib/axios";
import Error from "../../components/shared/Error";

type AllJobsProps = {
  employerId: string | undefined;
};

const AllJobs: React.FC<AllJobsProps> = ({ employerId }) => {
  const {
    data: jobs,
    error,
    isLoading,
  }: UseQueryResult<IJob[]> = useQuery(["AllJobs", employerId], async () => {
    const res = await privateRequest.get(
      `/api/v1/jobs/employer/all/${employerId}`,
    );
    return res.data;
  });

  if (isLoading) return <div className="text-center">Loading....</div>;
  if (error) return <Error />;

  if (jobs?.length === 0) {
    return <div>You have not posted any job yet!</div>;
  }

  return (
    <div className="grid place-items-center gap-sm grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {jobs?.map((job) => {
        return <JobCard job={job} key={job.job_id} />;
      })}
    </div>
  );
};

export default AllJobs;
