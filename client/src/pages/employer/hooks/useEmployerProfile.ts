import { useQuery, UseQueryResult } from "react-query";
import {  privateRequest } from "../../../lib/axios";
import { IEmployerProfile } from "../../../types/postgres/types";

export const useProfile = () => {

    const getProfile = async () => {
        const res = await privateRequest.get(`/api/v1/employer/profile`);
        return res.data;
    };

    const {
        data: profile,
        isLoading,
        error,
    }: UseQueryResult<IEmployerProfile, Error> = useQuery(
       [ "employerProfile"],
        getProfile
    );

    return { profile, isLoading, error };
};
