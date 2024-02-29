import { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import AlmostLoaded from "../../../../components/elements/loader/AlmostLoaded";
import Error from "../../../../components/ui/Error";
import { privateRequest } from "../../../../lib/axios";
import ApplicationCard from "../components/ApplicationCard";

type Data = {
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

type Applications = {
  data: Data[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const Applications = () => {
  const params = useParams();
  const jobId = params.jobId;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: applications,
    isError,
    isLoading,
  }: Applications = useQuery(["applications", jobId], async () => {
    const result = await privateRequest.get(
      `api/v1/jobs/applications/${jobId}`
    );
    return result.data;
  });

  if (isLoading) return <AlmostLoaded />;
  if (isError) return <Error />;
  if (applications?.length === 0)
    return (
      <div className=" min-h-[80vh] flex items-center justify-center">
        No one applied for this job yet!
      </div>
    );

  return (
    <div className=" w-full grid gap-sm  ">
      <header className="text-center w-fit mx-auto bg-green-50 p-sm ">
        <h2 className="text-black-light">
          Below are the jobseekers that have applied for this job. You can view
          every jobseeker profile by clicking on the box
        </h2>
      </header>
      <section className="grid grid-cols-auto-sm min-h-[70vh] ">
        {applications?.map((item) => {
          return <ApplicationCard key={item.jobseeker_id} item={item} />;
        })}
      </section>
    </div>
  );
};

export default Applications;
