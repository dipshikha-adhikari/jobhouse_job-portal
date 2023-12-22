import { useQuery } from "react-query";
import { privateRequest } from "../../../lib/axios";
import useAuthStore from "../../../store/auth";

export const useAppliedJobs = () => {
const {isAunthenticated} = useAuthStore()
    const {
        data: jobs,
        isLoading,
        isError,
      } = useQuery(["appliedJobs", isAunthenticated], async () => {
        const result = await privateRequest.get("/api/v1/jobs/applied");
        return result.data;
      });
     
return {jobs,isError,isLoading}    
}