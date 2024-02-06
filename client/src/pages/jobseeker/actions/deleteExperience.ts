import toast from "react-hot-toast";
import { privateRequest } from "../../../lib/axios";
import { queryClient } from "../../../App";

export const deleteExperience = async (
  setIsLoading: (props: boolean) => void,
  experienceId:string
) => {
  try {
    setIsLoading(true);
   
    toast.promise(privateRequest.delete(`/api/v1/jobseeker/profile/experience/${experienceId}`), {
      loading: "Loading",
      success: () => {
        setIsLoading(false);
        queryClient.invalidateQueries("jobseekerProfile");
        return "Success";
      },
      error: (err) => {
        console.log(err);
        setIsLoading(false);
        return "Failed";
      },
    });
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    return "Error";
  }
};
