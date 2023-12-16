import { UseQueryResult, useQuery } from "react-query"
import { privateRequest } from "../../../lib/axios"
import useAuthStore from "../../../store/auth"
import { IJobseekerProfile } from "../../../types/postgres/types"

export const useJobseekerProfile = () => {
const {isAunthenticated} = useAuthStore()

    const getProfile = async() => {
        if(!isAunthenticated) return;
        const result = await privateRequest('/api/v1/jobseeker/profile')
        return result.data
    }

    const {data:profile, isLoading, isError}:UseQueryResult<IJobseekerProfile> = useQuery('jobseekerProfile', getProfile)

    return {profile, isLoading, isError}
}