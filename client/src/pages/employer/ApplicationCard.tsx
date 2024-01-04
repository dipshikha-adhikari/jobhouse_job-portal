import { useEffect, useState } from "react";
import { convertMonthsToYearsAndMonths } from "./utils/convertMonthsToYearsAndMonths";
import { Link } from "react-router-dom";

type Data = {
  item: {
    id: string;
    job_id: string;
    employer_id: string;
    jobseeker_id: string;
    summary: "";
    image: { url: string };
    experience: { start_date: string; end_date: string }[];
    expected_salary: string;
    fullname: string;
    job_title: string;
  };
};

type Experience = {
  start_date: string;
  end_date: string;
};

const ApplicationCard = ({ item }: Data) => {
  const [totalExperience, setTotalExperience] = useState("");

  useEffect(() => {
    let totalExperience = 0;

    item?.experience.map((exp: Experience) => {
      const date =
        (new Date(exp.end_date).getFullYear() -
          new Date(exp.start_date).getFullYear()) *
          12 +
        (new Date(exp.end_date).getMonth() -
          new Date(exp.start_date).getMonth());
      totalExperience += date;
    });
    const result = convertMonthsToYearsAndMonths(totalExperience);
    setTotalExperience(result);
  }, [item]);

  return (
    <Link
      to={`/applicant/profile/${item.jobseeker_id}`}
      key={item?.jobseeker_id}
      className="shadow-xxl text-black-default hover:text-black-default font-normal break-all mx-auto  h-fit w-full p-sm max-w-sm"
    >
      <div className="flex items-center gap-sm flex-wrap">
        <img
          src={item?.image?.url}
          alt=""
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{item?.fullname}</p>
          <p>{item?.job_title}</p>
        </div>
        <div className="grid gap-2">
          <p>{item?.summary}</p>
          <p>
            Experience :{" "}
            <span className="font-semibold">{totalExperience}</span>
          </p>
          <p>
            Expected salary :{" "}
            <span className="font-semibold">Rs {item?.expected_salary}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ApplicationCard;
