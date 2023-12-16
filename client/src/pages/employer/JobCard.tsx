import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { IJob } from "../../types/postgres/types";

type JobCardProps = {
  job: IJob;
  index: number;
  params?:any
};

const JobCard: React.FC<JobCardProps> = ({ job, index, params }) => {
  let time = moment(job.deadline).format("LL");

  return (
    <div className="grid gap-sm p-md rounded-sm shadow-md max-w-xl">
      <div className="grid gap-xs">
        <p className="bg-green-dark w-10 h-10 p-xs rounded-md grid place-items-center text-white ">
          {index + 1}
        </p>
        <p>
          <span className="font-semibold">Title</span> : {job.title}
        </p>
        <p>
          <span className="font-semibold">Level</span> : {job.level}
        </p>
        <p>
          <span className="font-semibold">Salary</span> :  {job.salary}
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
     {params === undefined &&  <div className="flex  gap-xs">
        <Link
          to={`/jobs/update/${job.job_id}`}
          className="bg-blue-dark hover:text-white text-white p-xs px-sm rounded-md"
        >
          Update
        </Link>
        <button className="bg-orange-light text-white p-xs px-sm rounded-md">
          Delete
        </button>
      </div>}
    </div>
  );
};

export default JobCard;
