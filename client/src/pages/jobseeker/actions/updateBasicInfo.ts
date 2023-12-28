import toast from "react-hot-toast";
import { queryClient } from "../../../App";
import { privateRequest } from "../../../lib/axios";
import { IJobseekerBasicInformation } from "../../../types/postgres/types";
import { IJobseekerBasicInfoInputs } from "../../../types/react/types";

export const updateBasicInfo = async (
  data: IJobseekerBasicInfoInputs,
  setIsLoading: (props: boolean) => void,
  setIsEditorOpen: (props: boolean) => void,
  basicInfo: IJobseekerBasicInformation | undefined,
) => {
  try {
    setIsLoading(true);
    const dataToBeSent = {
      fullname: data.fullname,
      image: data.image,
      current_address: data.currentAddress,
      permanent_address: data.permanentAddress,
      phone_number: data.phoneNumber,
      gender: data.gender,
      date_of_birth: data.dateOfBirth,
    };

    const axiosConfig = {
      method: basicInfo?.id === undefined ? "post" : "put",
      url: "/api/v1/jobseeker/profile/basicInformation",
      data: dataToBeSent,
    };

    toast.promise(privateRequest(axiosConfig), {
      loading: "Loading",
      success: () => {
        setIsLoading(false);
        setIsEditorOpen(false);
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
