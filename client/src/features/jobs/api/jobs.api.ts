import { AxiosResponse } from "axios";
import { JOBS, JOBS_CATEGORIES, JOBS_CATEGORIES_WITH_COUNT, JOBS_INDUSTRIES, JOBS_INDUSTRIES_WITH_COUNT, JOBS_LEVELS_WITH_COUNT, JOBS_TYPES_WITH_COUNT } from "../../../data/enums/apiRoutes";
import { publicRequest } from "../../../lib/axios";

export const getAllCategories = async () => {
    const result = await publicRequest.get(JOBS_CATEGORIES);
    return result.data;
};

export const getAllCategoriesWithJobsCount = async () => {
    const result = await publicRequest.get(JOBS_CATEGORIES_WITH_COUNT);
    return result.data;
};

export const getJobDetails = async (jobId: string, id: string) => {
    const response: AxiosResponse = await publicRequest.get(
        `${JOBS}/${jobId}`,
    );

    if (response.data.employer_id !== id) {
        throw new Error('Not allowed')

    } else {
        return response.data
    }

};

export const getAllIndustries = async () => {
    const result = await publicRequest.get(JOBS_INDUSTRIES);
    return result.data;
};

export const getAllIndustriesWithJobsCount = async () => {
    const result = await publicRequest.get(JOBS_INDUSTRIES_WITH_COUNT);
    return result.data;
};

export const getAllLevels = async () => {
    const result = await publicRequest.get(JOBS_LEVELS_WITH_COUNT);
    return result.data;
};

export const getAllTypes = async () => {
    const result = await publicRequest.get(JOBS_TYPES_WITH_COUNT);
    return result.data;
};

