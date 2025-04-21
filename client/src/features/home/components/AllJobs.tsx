import { useEffect } from "react";
import { CiStar } from "react-icons/ci";
import { useQuery } from "react-query";
import JobCard from "../../../components/ui/JobCard";
import Pagination from "../../../components/ui/Pagination";
import { publicRequest } from "../../../lib/axios";
import useStore from "../../../store/components";
import { AppliedJobs, IJob } from "../../../types/postgres/types";

type Props = {
  height?: number;
  jobs: IJob[] | undefined;
  offset: number;
  appliedJobs: AppliedJobs[];
  limit: number;
  setOffset: (props: number) => void;
  isLoading: boolean;
  isError: boolean;
  jobsCount: number;
};

const AllJobs = ({
  height,
  isError,
  isLoading,
  jobs,
  offset,
  appliedJobs,
  limit,
  setOffset,
  jobsCount,
}: Props) => {
  const { setIsJobsFetched } = useStore();

  return (
    <div className=" border-sm   min-h-[300px]">
      <header className="  border-b-sm  flex font-bold items-center gap-2  p-sm  uppercase">
        <CiStar className="text-green-dark " /> Top jobs
      </header>
      {isLoading && <div className="p-sm ">Loading...</div>}
      {isError && !jobs && <div className="p-sm">Error!</div>}
      <div className="grid gap-xs place-items-center p-sm  sm:grid-cols-auto-sm md:grid-cols-auto-md">
        {jobs?.map((job) => {
          return (
            <JobCard appliedJobs={appliedJobs} job={job} key={job.job_id} />
          );
        })}
      </div>
      {jobsCount && (
        <Pagination
          offset={offset}
          setOffset={setOffset}
          totalLength={jobsCount}
          limit={limit}
        />
      )}
    </div>
  );
};

export default AllJobs;
