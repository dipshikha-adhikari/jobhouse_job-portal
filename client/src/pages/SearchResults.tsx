import React from "react";
import { useLocation } from "react-router-dom";
import SearchBox from "../components/ui/SearchBox";
import { useQuery } from "react-query";
import { publicRequest } from "../lib/axios";
import Loader from "../components/shared/Loader";
import Error from "../components/shared/Error";
import { IJob } from "../types/postgres/types";
import { useAppliedJobs } from "./jobseeker/hooks/useAppliedJobs";
import Categories from "../components/shared/Categories";
import Industries from "../components/shared/Industries";
import ResultBox from "../components/ui/ResultBox";

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
  }: Results = useQuery("results", async () => {
    const result = await publicRequest.get(
      `/api/v1/jobs/search/results?query=${query}`,
    );
    return result.data;
  });

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className="grid gap-sm ">
      <SearchBox />
      <main className="grid gap-sm h-fit md:flex justify-center ">
        <aside className="flex-1 grid gap-xl justify-center h-fit">
          <section className="grid gap-xs justify-center ">
            <h2 className="font-semibold text-xl">
              Below are the jobs that matches title {query}
            </h2>
            {jobs?.length === 0 && (
              <p className="text-center">No results found</p>
            )}
            {jobs !== undefined && jobs?.length > 0 && (
              <p className="font-bold text-green-dark">{jobs.length} results</p>
            )}
            {jobs !== undefined && jobs?.length > 0 && (
              <div className="grid gap-xs ">
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
