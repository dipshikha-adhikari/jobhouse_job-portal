import { UseQueryResult, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { publicRequest } from "../../../lib/axios";
import { IJob } from "../../../types/postgres/types";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

export const useCurrentJob = () => {
  const params = useParams();
  const {id} = useCurrentUser()
  const jobId = params.jobId;

  const getJobDetails = async () => {
    const response: AxiosResponse = await publicRequest.get(
      `/api/v1/jobs/${jobId}`,
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch job details");
    }
    if( response.data.employer_id !== id)      return  null;

  };
  
  const {
    data: job,
    isError,
    isLoading,
  }: UseQueryResult<IJob> = useQuery(["jobDetails", jobId], getJobDetails, {
    enabled: !!jobId,
  });
console.log(job)
  return { job, isError, isLoading };
};
