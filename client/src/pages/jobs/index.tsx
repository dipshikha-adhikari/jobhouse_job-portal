import { useEffect } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Categories from "../../components/shared/Categories";
import Error from "../../components/shared/Error";
import Industries from "../../components/shared/Industries";
import JobCard from "../../components/shared/JobCard";
import Loader from "../../components/shared/Loader";
import Layout from "../../components/ui/Layout";
import { publicRequest } from "../../lib/axios";
import { AppliedJobs, IJob } from "../../types/postgres/types";
import { useAppliedJobs } from "../jobseeker/hooks/useAppliedJobs";

type AppliedJobsType = {
  jobs: AppliedJobs[];
  isLoading: boolean;
  isError: boolean;
};

const Jobs = () => {
  const location = useLocation().search;
  const category = new URLSearchParams(location).get("category");
  const industry = new URLSearchParams(location).get("industry");
  const id = new URLSearchParams(location).get("id");
  const { jobs: appliedJobs }: AppliedJobsType = useAppliedJobs();
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getJobs = async () => {
    if (category) {
      const result = await publicRequest.get(`/api/v1/jobs/categories/${id}`);
      return result.data;
    }
    if (industry) {
      const result = await publicRequest.get(`/api/v1/jobs/industries/${id}`);
      return result.data;
    }
  };
  const {
    data: jobs,
    isLoading,
    isError,
  }: UseQueryResult<IJob[]> = useQuery(["jobs", id], getJobs);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;
  console.log(jobs);

  return (
    <Layout>
      <div className="min-h-[80vh] grid gap-sm">
        <div className="grid gap-xs bg-green-50 p-sm">
          <h2 className="text-2xl font-bold text-black-light">
            {" "}
            {industry || category}
          </h2>
          <p>
            This list show the latest job vacancy in {industry || category} Jobs
            in Nepal. The brief job detail has job title, name of the
            organization, job location, required experiences, key skills and the
            deadline to apply. Most recent job are shown on first. Click on the
            job that interests you, read the job detail and if it is suitable
            for you, Click on the apply now button to send your job application.
          </p>
        </div>
        <main className="grid gap-sm">
          <section className="grid gap-sm   grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {jobs !== undefined && jobs?.length > 0 ? (
              jobs?.map((job) => {
                return (
                  <JobCard
                    appliedJobs={appliedJobs}
                    job={job}
                    key={job.job_id}
                  />
                );
              })
            ) : (
              <div className="h-[200px] grid place-items-center bg-green-50">
                <p className="text-black-light font-bold">No jobs found</p>
                <img
                  src="https://static.merojob.com/images/search/industry/jobs_by_industry.svg"
                  alt=""
                />
              </div>
            )}
          </section>
          <div className="grid gap-xs flex-[0.3] ">
            <header className="font-semibold border-y-sm uppercase border-default w-fit p-sm text-xl text-green-dark">
              Jobs By Category
            </header>
            <Categories />
          </div>
        </main>
        <div className="grid gap-xs flex-[0.3] ">
          <header className="font-semibold border-y-sm uppercase border-default w-fit p-sm text-xl text-green-dark">
            Jobs By Industry
          </header>
          <Industries />
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
