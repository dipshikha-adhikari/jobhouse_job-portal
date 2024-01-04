import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { IJob } from "../../types/postgres/types";

type JobCardProps = {
  job: IJob;
  index: number;
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const time = moment(job.deadline).format("LL");

  return (
    <Link
      to={`/jobs/${job.title}/${job.job_id}`}
      className="grid w-full text-black-default  font-normal hover:text-black-default gap-xs p-md  rounded-sm shadow-xl max-w-sm"
    >
      <div className="grid gap-1">
        <div>
          <span>Title</span> : {job.title}
        </div>
        <div>
          <span>Salary</span> : {job.salary}
        </div>
        <div>
          <span>Deadline</span> : {time}
        </div>
      </div>

      <Link
        to={`/employer/jobs/applications/${job.job_id}`}
        className=" text-green-dark border-sm border-green-dark px-sm p-xs w-fit font-normal hover:text-green-light rounded-sm"
      >
        {job.job_application_count} Applications
      </Link>

      <div className="flex  gap-xs">
        <Link
          to={`/jobs/update/${job.job_id}`}
          className="px-sm font-normal  bg-green-dark text-white hover:text-white border-sm  rounded-sm p-xs"
        >
          Update
        </Link>
      </div>
    </Link>
  );
};

export default JobCard;
