import { useQuery, UseQueryResult } from "react-query";
import { publicRequest } from "../../../lib/axios";
import { IJob } from "../../../types/postgres/types";



export const useRecentJobs = (id:string | undefined) => {
    const getRecentJobs = async () => {
        const res = await publicRequest.get(`/api/v1/jobs/employer/recent/${id}`);
        return res.data;
    };

    const {
        data: jobs,
        isLoading,
        error,
       
    }: UseQueryResult<IJob[]> = useQuery(
       [ "employerRecentJobs",id],
        getRecentJobs
    );

    return {jobs, isLoading, error };
};
