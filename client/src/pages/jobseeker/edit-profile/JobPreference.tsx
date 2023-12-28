import { yupResolver } from "@hookform/resolvers/yup";
import { FormEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import MultipleSelectCheckmarks from "../../../components/mui/MultipleSelect";
import TagsInputBox from "../../../components/ui/TagsInputBox";
import { useCategories } from "../../../hooks/useCategories";
import { useIndustries } from "../../../hooks/useIndustries";
import { IJobseekerJobPreference } from "../../../types/postgres/types";
import { IJobseekerJobPreferenceInputs } from "../../../types/react/types";
import { JobseekerJobPreferenceSchema } from "../../../utils/validationSchema";
import { updateJobPrefetence } from "../actions/updateJobPreference";
import { useJobseekerProfile } from "../hooks/useJobseekerProfile";

type JobPreference = {
  profile: IJobseekerJobPreference;
  isLoading: boolean;
  isError: boolean;
};

const JobPreference = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({ resolver: yupResolver(JobseekerJobPreferenceSchema) });
  const { profile }: JobPreference = useJobseekerProfile("jobPreference");
  const { categories } = useCategories();
  const { industries } = useIndustries();

  useEffect(() => {
    if (profile?.id !== undefined) {
      setValue("jobCategories", profile?.category_names);

      setValue("jobIndustries", profile?.industry_names);
      setValue("availableFor", profile.available_for);
      setValue("jobLevel", profile.job_level);
      setValue("expectedSalary", profile.expected_salary);
      setValue("jobLocation", profile.job_location);
      setValue("jobTitle", profile.job_title);
      setValue("objective", profile.summary);
      setValue("skills", profile.skills);
    }
  }, [profile]);

  function autoGrow(e: FormEvent<HTMLTextAreaElement>) {
    e.currentTarget.style.height = "100px";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  }

  const submitJobPreference: SubmitHandler<IJobseekerJobPreferenceInputs> = (
    data,
  ) => {
    updateJobPrefetence(
      data,
      setIsLoading,
      setIsEditorOpen,
      industries,
      categories,
      profile,
    );
  };

  return (
    <div className="grid gap-sm ">
      <header className="text-green-dark flex justify-between  font-semibold">
        Job Preference
        {!isEditorOpen && (
          <span
            className="border-sm  px-sm flex items-center cursor-pointer gap-xs rounded-sm"
            onClick={() => setIsEditorOpen(true)}
          >
            <FaEdit /> Edit
          </span>
        )}
      </header>
      <form
        className="grid gap-sm "
        onSubmit={handleSubmit(submitJobPreference)}
      >
        <section className="grid gap-sm">
          <div>
            <div className="grid gap-xs sm:flex ">
              <span>Objective</span>{" "}
              <div className="flex-1">
                {" "}
                <textarea
                  placeholder=" your objective"
                  disabled={!isEditorOpen}
                  {...register("objective")}
                  onInput={(e) => autoGrow(e)}
                  className={`border-sm w-full  outline-none p-sm resize-none `}
                ></textarea>
              </div>
            </div>
            <p className="text-orange-dark">{errors.objective?.message}</p>
          </div>
          <div>
            <div className="grid gap-xs w-fit sm:flex items-center">
              <span>Preferred Job Title </span>
              <input
                type="text"
                disabled={!isEditorOpen}
                placeholder="Developer"
                {...register("jobTitle")}
                className="outline-none border-sm  px-sm p-xs  "
              />
            </div>
            <p className="text-orange-dark">{errors.jobTitle?.message}</p>
          </div>
          <div>
            <div className="grid gap-xs w-fit sm:flex items-center">
              <span>Preferred Job Categories </span>
              <Controller
                name="jobCategories"
                control={control}
                disabled={!isEditorOpen}
                render={({ field: { onChange, value } }) => {
                  return (
                    <MultipleSelectCheckmarks
                      value={value}
                      onChange={onChange}
                      isEditorOpen={isEditorOpen}
                      type="category"
                      values={categories}
                    />
                  );
                }}
              />
            </div>
            <p className="text-orange-dark">{errors.jobCategories?.message}</p>
          </div>
          <div>
            <div className="grid gap-xs w-fit sm:flex items-center">
              <span>Preferred Job Industries </span>
              <Controller
                name="jobIndustries"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <MultipleSelectCheckmarks
                      value={value}
                      onChange={onChange}
                      type="industry"
                      isEditorOpen={isEditorOpen}
                      values={industries}
                    />
                  );
                }}
              />
            </div>
            <p className="text-orange-dark">{errors.jobIndustries?.message}</p>
          </div>
          <div>
            <div className="grid gap-xs  sm:flex ">
              <span>Skills </span>
              <Controller
                name="skills"
                control={control}
                render={({ field: { onChange } }) => {
                  return (
                    <TagsInputBox
                      isEditorOpen={isEditorOpen}
                      values={profile?.skills}
                      onChange={onChange}
                    />
                  );
                }}
              />
            </div>
            <p className="text-orange-dark">{errors.skills?.message}</p>
          </div>

          <div>
            <div className="grid gap-xs w-fit sm:flex items-center">
              <span>Available for </span>
              <input
                type="text"
                disabled={!isEditorOpen}
                placeholder="Full Time"
                {...register("availableFor")}
                className="outline-none border-sm px-sm p-xs "
              />
            </div>
            <p className="text-orange-dark">{errors.availableFor?.message}</p>
          </div>
          <div>
            <div className="grid gap-xs w-fit sm:flex items-center">
              <span>Looking For </span>
              <input
                type="text"
                disabled={!isEditorOpen}
                placeholder="Mid"
                {...register("jobLevel")}
                className="outline-none border-sm px-sm p-xs "
              />
            </div>
            <p className="text-orange-dark">{errors.jobLevel?.message}</p>
          </div>
          <div>
            <div className="grid gap-xs w-fit sm:flex items-center">
              <span>Preferred Job Location </span>
              <input
                type="text"
                disabled={!isEditorOpen}
                placeholder="Kathmandu"
                {...register("jobLocation")}
                className="outline-none border-sm px-sm p-xs "
              />
            </div>
            <p className="text-orange-dark">{errors.jobLocation?.message}</p>
          </div>
          <div>
            <div className="grid gap-xs w-fit sm:flex items-center">
              <span>Expected salary</span>
              <input
                type="text"
                disabled={!isEditorOpen}
                placeholder="40000"
                {...register("expectedSalary")}
                className="outline-none border-sm px-sm p-xs "
              />
            </div>
            <p className="text-orange-dark">{errors.expectedSalary?.message}</p>
          </div>
          {isEditorOpen && (
            <div className="flex  gap-xs">
              <button
                className="bg-green-dark h-full text-white p-sm rounded-sm disabled:opacity-50"
                disabled={isLoading}
              >
                Save
              </button>
              <button
                className=" border-sm  text-green-dark p-sm rounded-sm"
                onClick={() => setIsEditorOpen(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </section>
      </form>
    </div>
  );
};

export default JobPreference;
