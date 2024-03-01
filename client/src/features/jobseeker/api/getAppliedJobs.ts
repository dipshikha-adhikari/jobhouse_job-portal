import { useQuery } from "react-query";
import { useCurrentUser } from "../../auth/api/getUser";
import useAuthStore from "../../../store/auth";
import { privateRequest } from "../../../lib/axios";

export const useAppliedJobs = () => {
    const { isAunthenticated } = useAuthStore();
    const { role } = useCurrentUser();

    const getJobs = async () => {
        if (!isAunthenticated || role !== "jobseeker") return;
        const result = await privateRequest.get("/api/v1/jobseeker/jobs/applied");
        return result.data;
    };

    const {
        data: jobs,
        isLoading,
        isError,
    } = useQuery(["appliedJobs", isAunthenticated, role], getJobs);

    return { jobs, isError, isLoading };
};
