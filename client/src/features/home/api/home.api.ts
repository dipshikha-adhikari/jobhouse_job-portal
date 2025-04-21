import { JOBS, TOP_EMPLOYERS } from "../../../data/enums/apiRoutes";
import { publicRequest } from "../../../lib/axios";

export const getAllJobs = async (limit, offset) => {
    const res = await publicRequest.get(`${JOBS}?limit=${limit}&offset=${offset}`);
    return res.data;
};

export const getTopCompanies = async () => {
    const result = await publicRequest.get(`${TOP_EMPLOYERS}?limit=5`);
    return result.data;
};

export const getAllJobsCount = async () => {
    const result = await publicRequest.get(`${JOBS}/count`);
    return result.data;
}