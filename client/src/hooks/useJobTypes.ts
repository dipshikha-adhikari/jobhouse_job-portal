import { UseQueryResult, useQuery } from "react-query";
import { publicRequest } from "../lib/axios";

type JobTypes = {
  type_name: string;
  type_id: string;
};

export const useTypes = () => {
  const getAllTypes = async () => {
    const result = await publicRequest.get("/api/v1/jobs/types");
    return result.data;
  };

  const {
    data: types,
    isLoading,
    isError,
  }: UseQueryResult<JobTypes[]> = useQuery("types", getAllTypes);

  return { types, isError, isLoading };
};
