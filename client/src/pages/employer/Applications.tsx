import { useQuery } from "react-query";
import { privateRequest } from "../../lib/axios";
import ApplicationCard from "./ApplicationCard";

type Applicaitons = {
  data:
    | {
        id: string;
        job_id: string;
        employer_id: string;
        jobseeker_id: string;
      }[]
    | undefined;
  isLoading: boolean;
  isError: boolean;
};

const Applications = () => {
  const {
    data: applications,
    isError,
    isLoading,
  }: Applicaitons = useQuery("applications", async () => {
    const result = await privateRequest.get("api/v1/jobs/applications");
    return result.data;
  });
  if (isLoading) return <div className="text-center">Loading..</div>;
  if (isError) return <div>Failed to fetch!</div>;
  return (
    <div>
      {applications?.map((item) => {
        return <ApplicationCard key={item.id} />;
      })}
    </div>
  );
};

export default Applications;
