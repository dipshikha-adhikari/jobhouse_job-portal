import { UseQueryResult, useQuery } from "react-query";
import { publicRequest } from "../../../lib/axios";

type CategoriesType = {
    category_name: string;
    category_id: string;
    job_count: string
};

const getAllCategories = async () => {
    const result = await publicRequest.get("/api/v1/jobs/categories");
    return result.data;
};

const getAllCategoriesWithJobsCount = async () => {
    const result = await publicRequest.get("/api/v1/jobs/categories/jobscount");
    return result.data;
};

export const useCategories = () => {
    const {
        data: categories,
        isLoading,
        isError,
    }: UseQueryResult<CategoriesType[]> = useQuery(
        "categories",
        getAllCategories,
    );
    return { categories, isError, isLoading };
};


export const useCategoriesAndJobsCount = () => {
    const { data, isLoading, isError }: UseQueryResult<CategoriesType[]> =
        useQuery("categoriesandjjobscount", getAllCategoriesWithJobsCount);

    return { data, isError, isLoading };
};