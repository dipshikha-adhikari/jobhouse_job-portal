import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { convertMonthsToYearsAndMonths } from "../../../utils/dateConverter";

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
    <div className="shadow-sm grid gap-2 p-sm font-normal break-all mx-auto max-w-sm  h-fit w-full  ">
      <Link
        to={`/employer/jobs/applicant/${item.jobseeker_id}`}
        className="flex  items-center  gap-xs flex-wrap  text-black-light hover:text-black-dark"
      >
        <img
          src={
            item?.image?.url ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&usqp=CAU"
          }
          alt=""
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{item?.fullname}</p>
          <p>{item?.job_title}</p>
        </div>
      </Link>

      <div className="grid  gap-2">
        <p>{item?.summary}</p>
        <p>
          Experience : <span className="font-semibold">{totalExperience}</span>
        </p>
        <p>
          Expected salary :{" "}
          <span className="font-semibold">Rs {item?.expected_salary}</span>
        </p>
      </div>
    </div>
  );
};

export default ApplicationCard;
