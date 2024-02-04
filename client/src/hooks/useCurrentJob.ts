import { UseQueryResult, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { publicRequest } from "../lib/axios";
import { AxiosResponse } from "axios";
import { IJob } from "../types/postgres/types";

export const useCurrentJob = () => {
  const params = useParams();
  const jobId = params.jobId;

  const getJobDetails = async () => {
    const response: AxiosResponse = await publicRequest.get(
      `/api/v1/jobs/${jobId}`,
    );
    return response.data;
  };
  
  const {
    data: job,
    isError,
    isLoading,
  }: UseQueryResult<IJob> = useQuery(["jobDetails", jobId], getJobDetails, {
    enabled: !!jobId,
  });

  return { job, isError, isLoading };
};
