import { UseQueryResult, useQuery } from "react-query";
import { publicRequest } from "../lib/axios";

type LevelsType = {
  level_name: string;
  level_id: string;
};

export const useLevels = () => {
  const getAllLevels = async () => {
    const result = await publicRequest.get("/api/v1/jobs/levels");
    return result.data;
  };

  const {
    data: levels,
    isLoading,
    isError,
  }: UseQueryResult<LevelsType[]> = useQuery("levels", getAllLevels);

  return { levels, isError, isLoading };
};
