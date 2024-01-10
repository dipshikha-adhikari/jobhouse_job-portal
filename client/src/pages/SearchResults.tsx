import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Categories from "../components/shared/Categories";
import Industries from "../components/shared/Industries";
import ResultBox from "../components/ui/ResultBox";
import SearchBox from "../components/ui/SearchBox";
import { publicRequest } from "../lib/axios";
import { IJob } from "../types/postgres/types";
import { useAppliedJobs } from "./jobseeker/hooks/useAppliedJobs";
import { FaIndustry } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

type Results = {
  isLoading: boolean;
  isError: boolean;
  data: IJob[] | undefined;
};

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q");
  const { jobs: appliedJobs } = useAppliedJobs();
  const {
    data: jobs,
    isLoading,
    isError,
  }: Results = useQuery(["results", query], async () => {
    const result = await publicRequest.get(
      `/api/v1/jobs/search/results?query=${query}`,
    );
    return result.data;
  });

  return (
    <div className="grid gap-sm w-full ">
      <section className="grid gap-xs ">
        <SearchBox />
        <div className=" ">
          <header className="p-sm py-md">
            <h2 className="text-center">
              {isLoading && "Loading..."}
              {isError && "Error..."}
              {!isError &&
                !isLoading &&
                jobs?.length !== undefined &&
                jobs?.length > 0 && (
                  <span className=" ">
                    Below are the jobs that matches title{" "}
                    <span className="font-semibold text-green-dark">
                      {" "}
                      {query}
                    </span>
                  </span>
                )}
            </h2>
            {jobs?.length === 0 && !isLoading && (
              <p className="text-center">Oops! No results found</p>
            )}
            {jobs !== undefined && jobs?.length > 0 && (
              <p className="font-semibold text-center ">
                ( {jobs.length} results)
              </p>
            )}
          </header>
          {jobs !== undefined && jobs?.length > 0 && (
            <div className="grid p-sm grid-cols-auto-sm lg:flex lg:flex-wrap lg:justify-center gap-sm ">
              {jobs.map((item) => {
                return (
                  <ResultBox
                    job={item}
                    key={item.job_id}
                    appliedJobs={appliedJobs}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
      <main className="grid gap-sm h-fit md:flex   ">
        <aside className="w-full grid gap-xl   h-fit">
          <div className=" border-sm ">
            <header className="flex items-center gap-2 border-b-sm  font-bold   p-sm  text-green-dark ">
              <FaIndustry /> Jobs By Industry
            </header>
            <Industries />
          </div>
        </aside>
        <section className="grid gap-sm h-fit f w-full">
          <div className="border-sm   ">
            <header className="flex items-center gap-2 font-bold border-b-sm p-sm    text-green-dark">
              <BiCategory /> Jobs By Category
            </header>
            <Categories />
          </div>
        </section>
      </main>
    </div>
  );
};

export default SearchResults;
