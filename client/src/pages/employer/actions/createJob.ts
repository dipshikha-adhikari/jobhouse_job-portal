import toast from "react-hot-toast";
import { ICreateJobInputs } from "../../../types/react/types";
import { privateRequest } from "../../../lib/axios";

export const createJob = (
  data: ICreateJobInputs,
  setIsLoading: (props: boolean) => void,
  navigate: (props: string) => void,
  jobId: string | undefined,
) => {
  try {
    const axiosConfig = {
      method: jobId !== undefined ? "put" : "post",
      url:
        jobId !== undefined
          ? `/api/v1/jobs/update/${jobId}`
          : "/api/v1/jobs/create",
      data,
    };
    setIsLoading(true);

    toast.promise(privateRequest(axiosConfig), {
      loading: "Loading",
      success: () => {
        setIsLoading(false);
        navigate("/employer/overview");
        return "Success";
      },
      error: (err) => {
        console.log(err);
        setIsLoading(false);
        return err?.response?.data?.message || "Failed";
      },
    });
  } catch (err) {
    setIsLoading(false);
    console.log(err);
    toast.error("Error");
  }
};
