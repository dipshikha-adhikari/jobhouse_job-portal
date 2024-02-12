import { UseQueryResult, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { publicRequest } from "../../../lib/axios";
import { IJob } from "../../../types/postgres/types";
import { useCurrentUser } from "../../auth/api/getUser";

export const useCurrentJob = () => {
    const params = useParams();
    const { id } = useCurrentUser()
    const jobId = params.jobId;

    const getJobDetails = async () => {
        const response: AxiosResponse = await publicRequest.get(
            `/api/v1/jobs/${jobId}`,
        );

        if (response.data.employer_id !== id) {
            throw new Error('Not allowed')

        } else {
            return response.data
        }

    };

    const {
        data: job,
        isError,
        isLoading,
    }: UseQueryResult<IJob> = useQuery(["privateJobDetails", [jobId, id]], getJobDetails, {
        enabled: !!jobId,
    });

    return { job, isError, isLoading };
};
