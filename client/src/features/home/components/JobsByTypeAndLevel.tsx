import { FaIndustry } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getAllLevels, getAllTypes } from "../../jobs/api/jobs.api";

type Levels = {
  level_id: string;
  level_name: string;
  total_jobs: string;
};

type Types = {
  type_id: string;
  type_name: string;
  total_jobs: string;
};

const JobsByTypeAndLevel = () => {
  const {
    data: levels,
    isLoading: levelsLoading,
    isError: levelsError,
  } = useQuery<Levels[]>("levels", getAllLevels);

  const {
    data: types,
    isLoading: typesLoading,
    isError: typesError,
  } = useQuery<Types[]>("types", getAllTypes);

  return (
    <div className="flex flex-wrap gap-sm  ">
      <div className=" border-x-sm border-sm w-full max-w-sm ">
        <header className="flex border-b-sm p-sm items-center gap-2 uppercase  font-bold   ">
          <FaIndustry className="text-green-dark " /> Jobs By Level
        </header>

        <div className=" ">
          {levelsLoading && <div className="p-sm">Loading...</div>}
          {levelsError && !levels && <div className="p-sm">Error</div>}
          {levels?.map((level) => {
            return (
              <Link
                to={`/jobs/?level=${level.level_name}`}
                key={level.level_id}
                className="text-black-light border-b-sm  px-sm py-xs font-normal flex items-center gap-sm hover:text-black-dark "
              >
                {level.level_name}{" "}
                <span className="text-green-dark">({level.total_jobs})</span>
              </Link>
            );
          })}
        </div>
        <div className="py-sm">
          {!levelsLoading && !levelsError && (
            <img
              src="https://eslteacherrecruitment.com/wp-content/uploads/2017/04/free-job-posting.jpg"
              alt=""
              className="object-contain max-h-[300px]"
            />
          )}
        </div>
      </div>
      <div className="  border-sm w-full max-w-sm">
        <header className="flex items-center gap-2 uppercase  font-bold border-b-sm  p-sm  ">
          <FaIndustry className="text-green-dark " /> Jobs By Employment Type
        </header>

        <div className=" ">
          {typesLoading && <div className="p-sm">Loading...</div>}
          {typesError && !types && <div className="p-sm">Error</div>}
          {types?.map((type) => {
            return (
              <Link
                to={`/jobs/?type=${type.type_name}`}
                key={type.type_id}
                className="text-black-light  px-sm py-xs hover:text-black-dark border-b-sm rounded-sm  font-normal  flex items-center gap-sm"
              >
                {type.type_name}{" "}
                <span className="text-green-dark">({type.total_jobs})</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JobsByTypeAndLevel;
