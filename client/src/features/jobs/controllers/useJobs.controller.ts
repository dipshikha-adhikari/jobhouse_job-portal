import { useQuery, UseQueryResult } from "react-query";
import { getAllCategories, getAllIndustries } from "../api/jobs.api";

type CategoriesType = {
    category_name: string;
    category_id: string;
    job_count: string
};

export const useJobsController = () => {
    const {
        data: categories,
        isLoading: isCategoriesLoading,
        isError: isCategoriesError,
    }: UseQueryResult<CategoriesType[]> = useQuery(
        "categories",
        getAllCategories,
    );

    getAllIndustries()

    return { categories, isCategoriesError, isCategoriesLoading };
}