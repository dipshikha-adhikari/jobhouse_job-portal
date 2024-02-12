import { MdHomeWork } from "react-icons/md";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { publicRequest } from "../../../lib/axios";

type TopComapny = {
  user_id: string;
  organization_name: string;
  image_url: string;
  industry_name: string;
  job_count: string;
};

const TopCompanies = () => {
  const getTopCompanies = async () => {
    const result = await publicRequest.get("/api/v1/topEmployers");
    return result.data;
  };

  const {
    data: companies,
    isLoading: loadingComapnies,
    isError: errorComapnies,
  } = useQuery("topComapnies", getTopCompanies);

  return (
    <div className=" border-sm  grid g">
      <header className="border-b-sm  font-bold uppercase  p-sm  flex items-center gap-2">
        {" "}
        <MdHomeWork className="text-green-dark " />
        Top Companies
      </header>

      <div className="grid p-sm gap-xs sm:grid-cols-auto-sm place-items-center ">
        {loadingComapnies && (
          <div className=" text-start w-full ">Loading...</div>
        )}
        {errorComapnies && !companies && (
          <div className=" text-start w-full">Error</div>
        )}
        {companies?.map((item: TopComapny) => {
          return (
            <Link
              key={item.user_id}
              to={`/employers/${item.organization_name}/${item.user_id}`}
              className="grid gap-2 shadow-sm w-full text-black-default max-w-md hover:text-black-dark h-full  p-sm place-content-start"
            >
              <div className="flex items-start gap-xs">
                <img src={item.image_url} alt="image" className="w-20 h-20" />
                <p className="grid gap-2">
                  <span className="font-bold text-black-light">
                    {item.organization_name}{" "}
                  </span>
                  <span className=" font-normal"> ({item.industry_name})</span>
                </p>
              </div>
              <p className="text-green-dark font-semibold">
                {" "}
                {item.job_count} jobs
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopCompanies;
