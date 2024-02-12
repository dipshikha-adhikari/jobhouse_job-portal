import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { IJobseekerExperience } from "../../../../types/postgres/types";
import { useCategories } from "../../../jobs/api/getCategories";
import { useIndustries } from "../../../jobs/api/getIndustries";
import { useLevels } from "../../../jobs/api/getLevels";
import { IJobseekerExperienceInputs } from "../../../../types/react/types";
import { updateExperience } from "../api/updateExperience";
import { JobseekerExperienceSchema } from "../../../../utils/validationSchema";
import SelectJob from "../../../../components/mui/SelectJob";
import ResponsiveDatePicker from "../../../../components/mui/DatePicker";
import EditorComponent from "../../../../components/ui/Editor";

type ExperienceFormProps = {
  profile?: IJobseekerExperience | undefined;
  isEditorOpen: boolean;
  setIsEditorOpen: (props: boolean) => void;
  isError: boolean;
};

const ExperienceForm = ({
  isEditorOpen,
  setIsEditorOpen,
  profile,
}: ExperienceFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { categories } = useCategories();
  const { industries } = useIndustries();
  const { levels } = useLevels();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(JobseekerExperienceSchema) });

  useEffect(() => {
    if (profile) {
      setValue("organizationName", profile.organization_name);
      setValue("organizationType", profile.organization_type);
      setValue("jobTitle", profile.job_title);
      setValue("jobCategory", profile.job_category);
      setValue("jobLocation", profile.job_location);
      setValue("duties", profile.duties);
      setValue("jobLevelId", profile.job_level_id);
      setValue("startDate", moment(profile?.start_date).toString());
      setValue("endDate", moment(profile?.end_date).toString());
    }
  }, [profile, isEditorOpen]);

  const onSubmit: SubmitHandler<IJobseekerExperienceInputs> = (data) => {
    updateExperience(data, profile, setIsLoading, setIsEditorOpen);
  };

  const handleCancel = () => {
    if (ref.current) {
      window.scrollTo({
        top: 0,
        left: 0,
      });
    }
    setIsEditorOpen(false);
    clearErrors();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" p-sm md:p-md shadow-sm">
      <section className="grid gap-xs" ref={ref}>
        <div className="">
          <div className="grid sm:flex  sm:gap-sm gap-2 items-center">
            <span className="font-semibold">Organization Name </span>{" "}
            <input
              type="text"
              {...register("organizationName")}
              placeholder="ABC company"
              className="outline-none p-xs border-sm border-gray-light"
            />
          </div>
          <p className="text-red-600 text-sm">
            {errors.organizationName?.message}
          </p>
        </div>
        <div>
          <div className="grid sm:flex sm:gap-sm gap-2 items-center">
            <span className="font-semibold">Nature of Organization </span>{" "}
            <select
              {...register("organizationType")}
              className="outline-none w-40  p-xs border-sm border-gray-light"
            >
              <option value="">Select</option>
              {industries?.map((item) => {
                return (
                  <option key={item.industry_id} value={item.industry_name}>
                    {item.industry_name}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="text-red-600 text-sm">
            {errors.organizationType?.message}
          </p>
        </div>
        <div>
          <div className="grid sm:flex sm:gap-sm gap-2 items-center">
            <span className="font-semibold">Job Location </span>{" "}
            <input
              type="text"
              {...register("jobLocation")}
              placeholder="Kathmandu, Nepal"
              className="outline-none p-xs border-sm border-gray-light"
            />
          </div>
          <p className="text-red-600 text-sm">{errors.jobLocation?.message}</p>
        </div>
        <div>
          <div className="grid sm:flex sm:gap-sm gap-2 items-center">
            <span className="font-semibold">Job Title </span>{" "}
            <input
              type="text"
              {...register("jobTitle")}
              placeholder="Developer"
              className="outline-none p-xs border-sm border-gray-light"
            />
          </div>
          <p className="text-red-600 text-sm">{errors.jobTitle?.message}</p>
        </div>
        <div>
          <div className="grid sm:flex sm:gap-sm gap-2  items-center">
            <span className="font-semibold">Job Category </span>{" "}
            <select
              {...register("jobCategory")}
              className="outline-none w-40 border-gray-light p-xs border-sm"
            >
              <option value="">Select</option>
              {categories?.map((cat) => {
                return (
                  <option value={cat.category_name} key={cat.category_id}>
                    {cat.category_name}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="text-red-600 text-sm">{errors.jobCategory?.message}</p>
        </div>
        <div>
          <div className="grid sm:flex sm:gap-sm gap-2 items-center">
            <span className="font-semibold">Job Level</span>{" "}
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
          <p className="text-red-600 text-sm">{errors.jobLevelId?.message}</p>
        </div>
        <div>
          <div className="grid sm:flex sm:gap-sm gap-2 items-center">
            <span className="font-semibold">Start Date</span>{" "}
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => {
                return (
                  <ResponsiveDatePicker
                    isEditorOpen={isEditorOpen}
                    field={field}
                  />
                );
              }}
            />
          </div>
          <p className="text-red-600 text-sm">{errors.startDate?.message}</p>
        </div>
        <div>
          <div className="grid sm:flex sm:gap-sm gap-2 items-center">
            <span className="font-semibold">End Date</span>{" "}
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => {
                return (
                  <ResponsiveDatePicker
                    isEditorOpen={isEditorOpen}
                    field={field}
                  />
                );
              }}
            />
          </div>
          <p className="text-red-600 text-sm">{errors.endDate?.message}</p>
        </div>
        <div>
          <div className="grid sm:flex sm:gap-sm gap-2 h-fit ">
            <span className="font-semibold">Duties & Responsibilities</span>
            <Controller
              name="duties"
              control={control}
              render={({ field: { onChange } }) => (
                <EditorComponent
                  onChange={onChange}
                  initialValue={profile?.duties}
                />
              )}
            />
          </div>
          <p className="text-red-600 text-sm">{errors.duties?.message}</p>
        </div>
        {isEditorOpen && (
          <div className="flex  gap-xs">
            <button
              className="bg-green-dark h-full  px-sm p-xs text-white rounded-sm"
              disabled={isLoading}
            >
              Save
            </button>
            <button
              className="bg-orange-dark text-white px-sm p-xs rounded-sm"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </section>
    </form>
  );
};

export default ExperienceForm;
