import { useQuery } from "react-query";
import { privateRequest } from "../../../lib/axios";
import useAuthStore from "../../../store/auth";

export const useJobseekerProfile = (query?: string) => {
    const { isAunthenticated } = useAuthStore();

    const getProfile = async () => {
        if (!isAunthenticated) return;
        const result = await privateRequest(
            `/jobseeker/profile?query=${query}`,
        );
        return result.data;
    };

    const {
        data: profile,
        isLoading,
        isError,
    } = useQuery(["jobseekerProfile", query, isAunthenticated], getProfile);

    return { profile, isLoading, isError };
};
