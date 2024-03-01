import { yupResolver } from "@hookform/resolvers/yup";
import { FormEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { IJobseekerJobPreference } from "../../../types/postgres/types";
import { JobseekerJobPreferenceSchema } from "../../../utils/validationSchema";
import { useCategories } from "../../jobs/api/getCategories";
import { useIndustries } from "../../jobs/api/getIndustries";
import { useLevels } from "../../jobs/api/getLevels";
import { useTypes } from "../../jobs/api/getTypes";
import { IJobseekerJobPreferenceInputs } from "../../../types/react/types";
import { updateJobPrefetence } from "../api/updateJobPreference";
import MultipleSelectChip from "../../../components/mui/MultipleSelect";
import TagsInputBox from "../../../components/elements/box/TagsInputBox";
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
    clearErrors,
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
  }, [job_preference, isEditorOpen]);

  function autoGrow(e: FormEvent<HTMLTextAreaElement>) {
    e.currentTarget.style.height = "100px";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  }

  const submitJobPreference: SubmitHandler<IJobseekerJobPreferenceInputs> = (
    data
  ) => {
    updateJobPrefetence(
      data,
      setIsLoading,
      setIsEditorOpen,
      industries,
      categories,
      job_preference
    );
  };

  return (
    <div className="grid gap-sm  ">
      <header className="text-green-dark flex justify-between  font-semibold">
        Job Preference
        {!isEditorOpen && (
          <span
            className="border-sm border-green-dark  px-sm py-1 flex items-center cursor-pointer gap-2 rounded-sm"
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
        <section className="grid gap-xs">
          <div>
            <div className="grid gap-2 sm:flex ">
              <span className="font-semibold">Objective</span>{" "}
              <div className="flex-1">
                {" "}
                <textarea
                  placeholder=" your objective"
                  disabled={!isEditorOpen}
                  {...register("objective")}
                  onInput={(e) => autoGrow(e)}
                  className={`border-sm w-full border-gray-light  outline-none p-sm resize-none `}
                ></textarea>
              </div>
            </div>
            <p className="text-orange-dark">{errors.objective?.message}</p>
          </div>
          <div>
            <div className="grid gap-2 w-fit sm:flex items-center">
              <span className="font-semibold">Preferred Job Title </span>
              <input
                type="text"
                disabled={!isEditorOpen}
                placeholder="Developer"
                {...register("jobTitle")}
                className="outline-none border-sm border-gray-light   px-sm p-xs  "
              />
            </div>
            <p className="text-orange-dark">{errors.jobTitle?.message}</p>
          </div>
          <div>
            <div className="grid gap-2 w-fit sm:flex items-center">
              <span className="font-semibold">Preferred Job Categories </span>
              <Controller
                name="jobCategories"
                control={control}
                disabled={!isEditorOpen}
                render={({ field: { onChange, value } }) => {
                  return (
                    <MultipleSelectChip
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
            <div className="grid gap-2 w-fit sm:flex items-center">
              <span className="font-semibold">Preferred Job Industries </span>
              <Controller
                name="jobIndustries"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <MultipleSelectChip
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
            <div className="grid gap-2  sm:flex ">
              <span className="font-semibold">Skills </span>
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
            <div className="grid gap-2 w-fit sm:flex items-center">
              <span className="font-semibold">Available for </span>
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
            <div className="grid gap-2 w-fit sm:flex items-center">
              <span className="font-semibold">Looking For </span>
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
            <div className="grid gap-2 w-fit sm:flex items-center">
              <span className="font-semibold">Preferred Job Location </span>
              <input
                type="text"
                disabled={!isEditorOpen}
                placeholder="Kathmandu"
                {...register("jobLocation")}
                className="outline-none border-sm border-gray-light  px-sm p-xs "
              />
            </div>
            <p className="text-orange-dark">{errors.jobLocation?.message}</p>
          </div>
          <div>
            <div className="grid gap-2 w-fit sm:flex items-center">
              <span className="font-semibold">Expected salary</span>
              <input
                type="text"
                disabled={!isEditorOpen}
                placeholder="40000"
                {...register("expectedSalary")}
                className="outline-none border-sm border-gray-light  px-sm p-xs "
              />
            </div>
            <p className="text-orange-dark">{errors.expectedSalary?.message}</p>
          </div>
          {isEditorOpen && (
            <div className="flex   gap-xs">
              <button
                className="bg-green-dark  text-white  rounded-sm p-xs px-sm disabled:opacity-50"
                disabled={isLoading}
              >
                Save
              </button>
              <button
                className=" bg-orange-dark  text-white p-xs px-sm rounded-sm"
                onClick={() => {
                  setIsEditorOpen(false);
                  clearErrors();
                }}
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
