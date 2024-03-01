import { useQuery, UseQueryResult } from "react-query";
import { privateRequest } from "../../../lib/axios";
import { IEmployerProfile } from "../../../types/postgres/types";
import useAuthStore from "../../../store/auth";

export const useProfile = () => {
    const { isAunthenticated } = useAuthStore();

    const getProfile = async () => {
        const res = await privateRequest.get(`/api/v1/employer/profile`);
        return res.data;
    };

    const {
        data: profile,
        isLoading,
        error,
    }: UseQueryResult<IEmployerProfile, Error> = useQuery(
        ["employerProfile", isAunthenticated],
        getProfile,
    );

    return { profile, isLoading, error };
};
