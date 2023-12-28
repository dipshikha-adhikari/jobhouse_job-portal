import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { IJob } from "../../types/postgres/types";
import { useQuery } from "react-query";
import { privateRequest } from "../../lib/axios";

type JobCardProps = {
  job: IJob;
  index: number;
};

type Applicaitons = {
  data:
    | {
        id: string;
        job_id: string;
        employer_id: string;
        jobseeker_id: string;
      }[]
    | undefined;
  isLoading: boolean;
  isError: boolean;
};

const JobCard: React.FC<JobCardProps> = ({ job, index }) => {
  const time = moment(job.deadline).format("LL");

  const { data: applications }: Applicaitons = useQuery(
    ["applications", job.job_id],
    async () => {
      const result = await privateRequest.get(
        `api/v1/jobs/applications/${job.job_id}`,
      );
      return result.data;
    },
  );

  return (
    <div className="grid gap-sm p-md rounded-sm shadow-md max-w-xl">
      <div className="grid gap-xs">
        <p className="bg-green-dark w-10 h-10 p-xs rounded-sm grid place-items-center text-white ">
          {index + 1}
        </p>
        <p>
          <span className="font-semibold">Title</span> : {job.title}
        </p>
        <p>
          <span className="font-semibold">Level</span> : {job.level}
        </p>
        <p>
          <span className="font-semibold">Salary</span> : {job.salary}
        </p>
        <p>
          <span className="font-semibold">Deadline</span> : {time}
        </p>
      </div>
      <Link
        to={`/jobs/${job.title}/${job.job_id}`}
        className="text-green-dark hover:text-green-light w-fit font-bold text-xl "
      >
        Show more
      </Link>
      <Link
        to={`/employer/jobs/applicaitons/${job.job_id}`}
        className="bg-blue-dark text-white hover:text-white px-sm w-fit rounded-sm p-xs"
      >
        Applications {applications?.length}{" "}
      </Link>

      <div className="flex  gap-xs">
        <Link
          to={`/jobs/update/${job.job_id}`}
          className="text-green-dark hover:text-green-dark border-sm border-green-dark px-sm rounded-sm p-xs font-bold"
        >
          Update
        </Link>
        <button className="text-orange-dark font-bold border-sm border-orange-dark rounded-sm px-sm">
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
