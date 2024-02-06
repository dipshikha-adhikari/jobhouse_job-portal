import toast from "react-hot-toast";
import { privateRequest } from "../../../lib/axios";
import { queryClient } from "../../../App";

export const deleteEducation = async (
  setIsLoading: (props: boolean) => void,
  educationId:string
) => {
  try {
    setIsLoading(true);
   
    toast.promise(privateRequest.delete(`/api/v1/jobseeker/profile/education/${educationId}`), {
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
