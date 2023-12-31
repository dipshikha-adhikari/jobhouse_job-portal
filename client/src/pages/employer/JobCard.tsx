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

const JobCard: React.FC<JobCardProps> = ({ job }) => {
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
    <Link
      to={`/jobs/${job.title}/${job.job_id}`}
      className="grid w-full text-black-default mx-auto font-normal hover:text-black-default gap-xs p-md rounded-sm shadow-sm max-w-md"
    >
      <div className="grid gap-2">
        <p>
          <span>Title</span> : {job.title}
        </p>
        <p>
          <span>Salary</span> : {job.salary}
        </p>
        <p>
          <span>Deadline</span> : {time}
        </p>
      </div>

      <Link
        to={`/employer/jobs/applicaitons/${job.job_id}`}
        className=" text-green-dark font-bold hover:text-green-light rounded-sm"
      >
        {applications?.length} Applications
      </Link>

      <div className="flex  gap-xs">
        <Link
          to={`/jobs/update/${job.job_id}`}
          className="px-sm font-normal bg-green-dark text-white hover:text-white rounded-sm p-xs"
        >
          Update
        </Link>
        <button className="rounded-sm bg-orange-dark text-white px-sm">
          Delete
        </button>
      </div>
    </Link>
  );
};

export default JobCard;
