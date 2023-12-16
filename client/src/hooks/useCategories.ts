import { UseQueryResult, useQuery } from "react-query"
import { publicRequest } from "../lib/axios"

type CategoriesType = {
    category_name:string 
    category_id :string 
}
export const useCategories = () => {

    const getAllCategories = async() => {
        const result = await publicRequest.get('/api/v1/jobs/categories')
        return result.data
    }

    const {data:categories, isLoading, isError}:UseQueryResult<CategoriesType[]> = useQuery('categories', getAllCategories)

    return {categories, isError, isLoading}
}