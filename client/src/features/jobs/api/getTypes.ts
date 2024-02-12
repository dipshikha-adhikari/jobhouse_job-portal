import { UseQueryResult, useQuery } from "react-query";
import { publicRequest } from "../../../lib/axios";

type JobTypes = {
    type_name: string;
    type_id: string;
};

const getAllTypes = async () => {
    const result = await publicRequest.get("/api/v1/jobs/types");
    return result.data;
};

export const useTypes = () => {
    const {
        data: types,
        isLoading,
        isError,
    }: UseQueryResult<JobTypes[]> = useQuery("types", getAllTypes);

    return { types, isError, isLoading };
};
