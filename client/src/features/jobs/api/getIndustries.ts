import { UseQueryResult, useQuery } from "react-query";
import { publicRequest } from "../../../lib/axios";

type IndustriesTypes = {
    industry_id: string;
    industry_name: string;
    job_count: string;

};

const getAllIndustries = async () => {
    const result = await publicRequest.get("/api/v1/jobs/industries");
    return result.data;
};

const getAllIndustriesWithJobsCount = async () => {
    const result = await publicRequest.get("/api/v1/jobs/industries/jobscount");
    return result.data;
};

export const useIndustriesAndJobsCount = () => {
    const { data, isLoading, isError }: UseQueryResult<IndustriesTypes[]> =
        useQuery("industriesandjobscount", getAllIndustriesWithJobsCount);
    return { data, isError, isLoading };
};


export const useIndustries = () => {
    const {
        data: industries,
        isLoading,
        isError,
    }: UseQueryResult<IndustriesTypes[]> = useQuery(
        "industries",
        getAllIndustries,
    );

    return { industries, isError, isLoading };
};
