import { useQuery } from "react-query";
import { publicRequest } from "../lib/axios";
import { JOBS_CATEGORIES, JOBS_INDUSTRIES, JOBS_LEVELS, JOBS_TYPES } from "../data/enums/apiRoutes";

export const useJobs = () => {
    const { data: categories } = useQuery("categories", async () => {
        const res = await publicRequest.get(JOBS_CATEGORIES);
        return res.data;
    });

    const { data: industries } = useQuery("industries", async () => {
        const res = await publicRequest.get(JOBS_INDUSTRIES);
        return res.data;
    });

    const { data: levels } = useQuery("levels", async () => {
        const res = await publicRequest.get(JOBS_LEVELS);
        return res.data;
    });
    const { data: types } = useQuery("types", async () => {
        const res = await publicRequest.get(JOBS_TYPES);
        return res.data;
    });

    return {
        categories,
        industries,
        levels,
        types
    };

}