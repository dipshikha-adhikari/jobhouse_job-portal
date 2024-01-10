import { UseQueryResult, useQuery } from "react-query";
import { publicRequest } from "../lib/axios";

type IndustriesType = {
  industry_name: string;
  industry_id: string;
  job_count: string;
};

export const useIndustriesAndJobsCount = () => {
  const getData = async () => {
    const result = await publicRequest.get("/api/v1/jobs/industries/jobscount");
    return result.data;
  };

  const { data, isLoading, isError }: UseQueryResult<IndustriesType[]> =
    useQuery("industriesandjobscount", getData);

  return { data, isError, isLoading };
};
