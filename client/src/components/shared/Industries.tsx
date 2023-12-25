import { useState } from "react";
import { Link } from "react-router-dom";
import { MdReadMore } from "react-icons/md";
import { useIndustriesAndJobsCount } from "../../hooks/useIndustriesAndJobsCount";




const Industries = () => {
    const initialLimit = 8;
    const [limit, setLimit] = useState<number>(initialLimit);

const{data, isLoading, isError} = useIndustriesAndJobsCount()

const handleLimit = () => {
    if (limit <= initialLimit) {
    if(data?.length !== undefined){
      setLimit(data?.length);
    }
    } else {
      setLimit(initialLimit);
    }
  };

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error!</div>

  return (
    <div className="grid gap-sm">
        <div className="grid gap-3 sm:flex flex-wrap ">
              {data?.slice(0, limit).map((item) => {
                return (
                  <Link
                    to={`/jobs?industry=${item.industry_name}&&id=${item.industry_id}`}
                    key={item.industry_name}
                    className="font-normal flex mx-4 gap-2 items-center border-b-sm w-fit border-default text-black-light hover:text-black-dark"
                  >
                    {item.industry_name} <span className="text-green-dark"> ({item.job_count})</span>
                  </Link>
                );
              })}
            </div>
            <button
              className="w-fit text-black-light flex items-center gap-1 hover:text-black-dark  font-bold uppercase"
              onClick={handleLimit}
            >
              {limit <= initialLimit ? "View more" : "View less"} <MdReadMore fontSize={30} className='text-green-dark' />
            </button>
    </div>
  )
}

export default Industries