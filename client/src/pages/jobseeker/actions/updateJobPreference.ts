import toast from "react-hot-toast";
import { IJobseekerJobPreferenceInputs } from "../../../types/react/types";
import { privateRequest } from "../../../lib/axios";
import { IJobseekerJobPreference } from "../../../types/postgres/types";

type Category = {
  category_name: string;
  category_id: string;
};

type Industry = {
  industry_name: string;
  industry_id: string;
};

export const updateJobPrefetence = (
  data: IJobseekerJobPreferenceInputs,
  setIsLoading: (props: boolean) => void,
  setIsEditorOpen: (props: boolean) => void,
  industries: Industry[] | undefined,
  categories: Category[] | undefined,
  profile: IJobseekerJobPreference | undefined,
) => {
  const getIndustryId = (industryName: string) => {
    const industry = industries?.find(
      (ind) => ind.industry_name === industryName,
    );
    return industry ? industry.industry_id : null;
  };
  const getCategoryId = (category: string) => {
    const cat = categories?.find((cat) => cat.category_name === category);
    return cat ? cat.category_id : null;
  };
  const preferredIndustries = data.jobIndustries.map((item) =>
    getIndustryId(item),
  );
  const preferredCategories = data.jobCategories.map((item) =>
    getCategoryId(item),
  );

  try {
    const dataToBeSent = {
      job_type_id: data.jobTypeId,
      expected_salary: data.expectedSalary,
      job_categories: preferredCategories,
      job_industries: preferredIndustries,
      job_level_id: data.jobLevelId,
      job_location: data.jobLocation,
      job_title: data.jobTitle,
      summary: data.objective,
      skills: data.skills,
    };
    setIsLoading(true);

    const axiosConfig = {
      method: profile?.id === undefined ? "post" : "put",
      url: "/api/v1/jobseeker/profile/jobPreference",
      data: dataToBeSent,
    };
    toast.promise(privateRequest(axiosConfig), {
      loading: "Loading",
      success: () => {
        setIsLoading(false);
        setIsEditorOpen(false);
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
