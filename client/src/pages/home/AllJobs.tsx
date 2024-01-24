import { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { useQuery } from "react-query";
import JobCard from "../../components/shared/JobCard";
import Pagination from "../../components/shared/Pagination";
import { publicRequest } from "../../lib/axios";
import { AppliedJobs, IJob } from "../../types/postgres/types";
import { useAppliedJobs } from "../jobseeker/hooks/useAppliedJobs";

type AppliedJobsType = {
  jobs: AppliedJobs[];
  isLoading: boolean;
  isError: boolean;
};
type Props = {
  height?: number;
};

const AllJobs = ({ height }: Props) => {
  const { jobs: appliedJobs }: AppliedJobsType = useAppliedJobs();
  const [offset, setOffset] = useState(0);
  const limit = 6;

  useEffect(() => {
    if (height) {
      window.scrollTo(0, height);
    }
  }, [offset]);

  const { data: allJobsCount } = useQuery(
    ["allJobsCount", offset],
    async () => {
      const result = await publicRequest.get("/api/v1/jobs/count");
      return result.data;
    },
  );

  const getAllJobs = async () => {
    const res = await publicRequest.get(
      `/api/v1/jobs/?limit=${limit}&offset=${offset}`,
    );
    return res.data;
  };
  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery<IJob[]>(["allJobs", offset], getAllJobs);


  return (
    <div className=" border-sm ">
      <header className="  border-b-sm flex font-bold items-center gap-2  p-sm   text-green-dark">
        <CiStar className="text-green-dark " /> Top jobs
      </header>
      {isLoading && <div className="p-sm">Loading...</div>}
      {isError && <div className="p-sm">Error!</div>}
      <div className="grid gap-xs p-sm place-items-center  grid-cols-auto-sm md:grid-cols-auto-md">
        {jobs?.map((job) => {
          return (
            <JobCard appliedJobs={appliedJobs} job={job} key={job.job_id} />
          );
        })}
      </div>
      {allJobsCount?.count && (
        <Pagination
          offset={offset}
          setOffset={setOffset}
          totalLength={allJobsCount?.count}
          limit={limit}
        />
      )}
    </div>
  );
};

export default AllJobs;
