import { useEffect } from "react";
import { CiStar } from "react-icons/ci";
import { useQuery } from "react-query";
import JobCard from "../../components/shared/JobCard";
import Pagination from "../../components/shared/Pagination";
import { publicRequest } from "../../lib/axios";
import useStore from '../../store/store';
import { AppliedJobs, IJob } from '../../types/postgres/types';


type Props = {
  height?: number;
  jobs:IJob[] | undefined,
  offset:number,
  appliedJobs:AppliedJobs[],
  limit:number,
  setOffset:(props:number) => void ,
  isLoading:boolean,
  isError:boolean
};

const AllJobs = ({ height,isError,isLoading,jobs,offset,appliedJobs ,limit,setOffset}: Props) => {
  const {setIsJobsFetched} = useStore()
    const { data: allJobsCount } = useQuery(
    ["allJobsCount", offset],
    async () => {
      const result = await publicRequest.get("/api/v1/jobs/count");
      return result.data;
    },
  );

  useEffect(() => {
    if (height) {
      window.scrollTo(0, height);
    }
  }, [offset]);
  
  useEffect(() => {
if(jobs && jobs.length) setIsJobsFetched(true)
  },[jobs])

  return (
    <div className=" border-sm  min-h-[300px]">
      <header className="  border-b-sm flex font-bold items-center gap-2  p-sm  uppercase">
        <CiStar className="text-green-dark " /> Top jobs
      </header>
      {isLoading && <div className="p-sm ">Loading...</div>}
      {(isError && !jobs) && <div className="p-sm">Error!</div>}
      <div className="grid gap-xs p-sm place-items-center  sm:grid-cols-auto-sm md:grid-cols-auto-md">
        {jobs?.map((job) => {
          return (
            <JobCard appliedJobs={appliedJobs} job={job} key={job.job_id} />
          );
        })}
      </div>
      {(allJobsCount?.count && jobs) && (
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
