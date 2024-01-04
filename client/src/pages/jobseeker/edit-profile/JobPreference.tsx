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
import { useLevels } from "../../../hooks/useJobLevels";
import { useTypes } from "../../../hooks/useJobTypes";
import SelectJob from "../../../components/mui/SelectJob";

type JobPreference = {
  job_preference: IJobseekerJobPreference;
};

const JobPreference = ({ job_preference }: JobPreference) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({ resolver: yupResolver(JobseekerJobPreferenceSchema) });
  const { categories } = useCategories();
  const { industries } = useIndustries();
  const { levels } = useLevels();
  const { types } = useTypes();

  useEffect(() => {
    if (job_preference?.id !== undefined) {
      setValue("jobCategories", job_preference?.category_names);

      setValue("jobIndustries", job_preference?.industry_names);
      setValue("jobTypeId", job_preference?.job_type_id);
      setValue("jobLevelId", job_preference?.job_level_id);
      setValue("expectedSalary", job_preference.expected_salary);
      setValue("jobLocation", job_preference.job_location);
      setValue("jobTitle", job_preference.job_title);
      setValue("objective", job_preference.summary);
      setValue("skills", job_preference.skills);
    }
  }, [job_preference]);

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
      job_preference,
    );
  };

  return (
    <div className="grid gap-sm  ">
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
                      values={job_preference?.skills}
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
              <Controller
                name="jobTypeId"
                control={control}
                render={({ field }) => (
                  <SelectJob
                    type="type"
                    isEditorOpen={isEditorOpen}
                    field={field}
                    values={types}
                  />
                )}
              />
            </div>
            <p className="text-orange-dark">{errors.jobTypeId?.message}</p>
          </div>
          <div>
            <div className="grid gap-xs w-fit sm:flex items-center">
              <span>Looking For </span>
              <Controller
                name="jobLevelId"
                control={control}
                render={({ field }) => (
                  <SelectJob
                    type="level"
                    isEditorOpen={isEditorOpen}
                    field={field}
                    values={levels}
                  />
                )}
              />
            </div>
            <p className="text-orange-dark">{errors.jobTypeId?.message}</p>
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
            <div className="flex   gap-xs">
              <button
                className="bg-green-dark  text-white p-sm rounded-sm disabled:opacity-50"
                disabled={isLoading}
              >
                Save
              </button>
              <button
                className=" border-sm  text-green-dark border-green-dark p-sm rounded-sm"
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
