import toast from "react-hot-toast";
import { privateRequest } from "../../../lib/axios";
import { IJobseekerExperienceInputs } from "../../../types/react/types";
import { IJobseekerExperience } from "../../../types/postgres/types";
import { queryClient } from "../../../App";

export const updateExperience = async (
  data: IJobseekerExperienceInputs,
  profile: IJobseekerExperience | undefined,
  setIsLoading: (props: boolean) => void,
  setIsEditorOpen: (props: boolean) => void,
) => {
  try {
    setIsLoading(true);
    const dataToBeSent = {
      organization_name: data.organizationName,
      organization_type: data.organizationType,
      job_location: data.jobLocation,
      job_title: data.jobTitle,
      job_category: data.jobCategory,
      job_level: data.jobLevel,
      start_date: data.startDate,
      end_date: data.endDate,
      duties: data.duties,
    };
    const axiosConfig = {
      method: profile?.id === undefined ? "post" : "put",
      url:
        profile?.id === undefined
          ? "/api/v1/jobseeker/profile/experience"
          : `/api/v1/jobseeker/profile/experience/${profile.id}`,
      data: dataToBeSent,
    };
    toast.promise(privateRequest(axiosConfig), {
      loading: "Loading",
      success: () => {
        setIsLoading(false);
        setIsEditorOpen(false);
        queryClient.invalidateQueries("jobseekerProfile");
        window.scrollTo({
          top: 0,
          left: 0,
        });
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
  }
};
