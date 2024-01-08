import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { IJob } from "../../types/postgres/types";
import { FaHandPointRight } from "react-icons/fa";

type JobCardProps = {
  job: IJob;
  index: number;
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const time = moment(job.deadline).format("LL");

  return (
    <div
     
      className="grid w-full  text-black-default  font-normal hover:text-black-default gap-xs p-md  rounded-sm shadow-sm  max-w-sm"
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
        className=" text-green-dark  w-fit font-bold flex items-center gap-2 hover:text-green-light rounded-sm"
      >
        {job.job_application_count} Applications <FaHandPointRight />
      </Link>

      <div className="flex  gap-xs">
        <Link
          to={`/jobs/update/${job.job_id}`}
          className="px-sm font-normal  bg-blue-light  text-white hover:text-white border-sm  rounded-sm p-xs"
        >
          Update
        </Link>
        <Link
          to={`/jobs/${job.title}/${job.job_id}`}
          className="px-sm font-normal  border-green-dark text-green-dark hover:text-green-dark border-sm  rounded-sm p-xs"
        >
         View
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
