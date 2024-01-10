import { useState } from "react";
import { Link } from "react-router-dom";
import { useIndustriesAndJobsCount } from "../../hooks/useIndustriesAndJobsCount";

const Industries = () => {
  const initialLimit = 8;
  const [limit, setLimit] = useState<number>(initialLimit);

  const { data, isLoading, isError } = useIndustriesAndJobsCount();

  const handleLimit = () => {
    if (limit <= initialLimit) {
      if (data?.length !== undefined) {
        setLimit(data?.length);
      }
    } else {
      setLimit(initialLimit);
    }
  };

  if (isLoading) return <div className="p-sm">Loading...</div>;
  if (isError && !data) return <div className="p-sm">Error!</div>;

  return (
    <div className="grid gap-xs p-sm">
      <div className="grid gap-1 md:flex md:flex-wrap md:gap-3  ">
        {data?.slice(0, limit).map((item) => {
          return (
            <Link
              to={`/jobs?industry=${item.industry_name}&&id=${item.industry_id}`}
              key={item.industry_name}
              className="font-normal flex gap-2 items-center border-b-sm w-fit border-default text-black-light hover:text-black-dark"
            >
              {item.industry_name}{" "}
              <span className="text-green-dark"> ({item.job_count})</span>
            </Link>
          );
        })}
      </div>
      <button
        className="   text-black-light px-sm  hover:text-black-dark  font-bold w-fit"
        onClick={handleLimit}
      >
        {limit <= initialLimit ? "View more" : "View less"}{" "}
      </button>
    </div>
  );
};

export default Industries;
