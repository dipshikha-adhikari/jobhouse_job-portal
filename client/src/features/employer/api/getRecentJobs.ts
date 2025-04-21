import { useQuery, UseQueryResult } from "react-query";
import { publicRequest } from "../../../lib/axios";
import { IJob } from "../../../types/postgres/types";

export const useRecentJobs = (id: string | undefined) => {
    const getRecentJobs = async () => {
        if (!id) return
        const res = await publicRequest.get(`/jobs/employer/recent/${id}`);
        return res.data;
    };

    const {
        data: jobs,
        isLoading,
        isError,
    }: UseQueryResult<IJob[]> = useQuery(
        ["employerRecentJobs", id],
        getRecentJobs,
    );

    return { jobs, isLoading, isError };
};
