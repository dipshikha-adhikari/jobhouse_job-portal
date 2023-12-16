import { UseQueryResult, useQuery } from "react-query"
import { publicRequest } from "../lib/axios"

type IndustriesTypes = {
    industry_id :string 
    industry_name:string
}

export const useIndustries = () => {

    const getAllIndustries = async() => {
        const result = await publicRequest.get('/api/v1/jobs/industries')
        console.log('fuck')
        return result.data
    }

    const {data:industries, isLoading, isError}:UseQueryResult<IndustriesTypes[]> = useQuery('industries', getAllIndustries)

    return {industries, isError, isLoading}
}