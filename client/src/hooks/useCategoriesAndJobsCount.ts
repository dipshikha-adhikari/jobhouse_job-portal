import { UseQueryResult, useQuery } from "react-query";
import { publicRequest } from "../lib/axios";

type CategoriesType = {
  category_name: string;
  category_id: string;
  job_count: string;
};
export const useCategoriesAndJobsCount = () => {
  const getData = async () => {
    const result = await publicRequest.get("/api/v1/jobs/categories/jobscount");
    return result.data;
  };

  const { data, isLoading, isError }: UseQueryResult<CategoriesType[]> =
    useQuery("categoriesandjjobscount", getData);

  return { data, isError, isLoading };
};
