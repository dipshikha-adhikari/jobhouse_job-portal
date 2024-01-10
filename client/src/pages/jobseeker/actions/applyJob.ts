import toast from "react-hot-toast";
import { privateRequest } from "../../../lib/axios";
import { NavigateFunction } from "react-router-dom";

export const applyJob = (
  jobId: number | undefined,
  employerid: string | undefined,
  setIsLoading: (props: boolean) => void,
  navigate: NavigateFunction
) => {
  try {
    setIsLoading(true);
    toast.promise(
      privateRequest.post("/api/v1/jobs/apply", {
        job_id: jobId,
        employer_id: employerid,
      }),
      {
        loading: "Loading",
        error: (er) => {
          console.log(er);
          setIsLoading(false);
          return "Failed";
        },
        success: () => {
          setIsLoading(false);
          navigate("/jobseeker/overview");
          return "Success";
        },
      }
    );
  } catch (err) {
    setIsLoading(false);
    console.log(err);
    return "Error";
  }
};
