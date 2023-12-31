import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Categories from "../components/shared/Categories";
import Industries from "../components/shared/Industries";
import ResultBox from "../components/ui/ResultBox";
import SearchBox from "../components/ui/SearchBox";
import { publicRequest } from "../lib/axios";
import { IJob } from "../types/postgres/types";
import { useAppliedJobs } from "./jobseeker/hooks/useAppliedJobs";

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
    <div className="grid gap-xl">
      <section className="grid gap-xs ">
        <SearchBox />
        <h2 className="text-center">
          {isLoading && "Loading..."}
          {isError && "Error..."}
          {!isError && !isLoading && (
            <span className=" text-xl">
              Below are the jobs that matches title{" "}
              <span className="font-semibold text-green-dark"> {query}</span>
            </span>
          )}
        </h2>
        {jobs?.length === 0 && !isLoading && (
          <p className="text-center">Oops! No results found</p>
        )}
        {jobs !== undefined && jobs?.length > 0 && (
          <p className="font-semibold text-center ">( {jobs.length} results)</p>
        )}
        {jobs !== undefined && jobs?.length > 0 && (
          <div className="grid pt-md grid-cols-auto-sm lg:flex lg:flex-wrap lg:justify-center gap-sm ">
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
      </section>
      <main className="grid gap-xl h-fit md:flex justify-center ">
        <aside className="flex-1 grid gap-xl justify-center h-fit">
          <section className="grid  gap-sm h-fit">
            <h2 className="text-xl font-semibold  text-green-dark border-y-sm border-green-light w-fit py-sm">
              {" "}
              Jobs By Industry
            </h2>
            <Industries />
          </section>
        </aside>
        <section className="grid gap-sm h-fit flex-[.4]">
          <h2 className="text-xl font-semibold  text-green-dark border-y-sm border-green-light w-fit py-sm">
            {" "}
            Jobs By Category
          </h2>
          <Categories />
        </section>
      </main>
    </div>
  );
};

export default SearchResults;
