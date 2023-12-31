import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import useJobInputs from "../../store/jobInputs";
import { IJob } from "../../types/postgres/types";
import { CreateJobStepOneSchema } from "../../utils/validationSchema";
import ResponsiveDatePicker from "../mui/DatePicker";
import SelectCategory from "../mui/SelectCategory";

export interface ICreateJobStepOneInputs {
  title: string;
  categoryId: string;
  location: string;
  experienceRequired: string;
  salary: string;
  deadline: Date;
}

type CreateJobStepOneProps = {
  setStep: (props: number) => void;
  step: number;
  job: IJob | undefined;
};

const CreateJobStepOne = ({ setStep, step, job }: CreateJobStepOneProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({ resolver: yupResolver(CreateJobStepOneSchema) });
  const jobStore = useJobInputs();
  const { categories } = useCategories();
  const isEditorOpen = true;

  const onSubmit: SubmitHandler<ICreateJobStepOneInputs> = (data) => {
    jobStore.setStepOneInputs(data);
    setStep(step + 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setValue("categoryId", job?.category_id || jobStore.stepOne.categoryId);
    setValue("title", job?.title || jobStore.stepOne.title);
    setValue("salary", job?.salary || jobStore.stepOne.salary);
    setValue(
      "deadline",
      new Date(moment(job?.deadline).format("YYYY-MM-DD")) ||
        jobStore.stepOne.deadline,
    );
    setValue("location", job?.location || jobStore.stepOne.location);
    setValue(
      "experienceRequired",
      job?.experience_required || jobStore.stepOne.experienceRequired,
    );
  }, [job]);

  return (
    <div className="bg-white py-sm">
      <form
        className="grid gap-xs p-sm sm:p-xl "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className=" grid gap-2 items-center">
            <span className="font-semibold">Job Title</span>
            <input
              className="border-sm p-xs outline-none border-gray-300"
              placeholder="Marketing manager"
              {...register("title")}
            />
          </div>
          <p className="text-red-600 text-sm">{errors.title?.message}</p>
        </div>
        <div>
          <div className=" grid gap-2 items-center">
            <span className="font-semibold">Job Category</span>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <SelectCategory
                  values={categories}
                  field={field}
                  type="categories"
                />
              )}
            />
          </div>
          <p className="text-red-600 text-sm">{errors.categoryId?.message}</p>
        </div>
        <div>
          <div className=" grid gap-2 items-center">
            <span className="font-semibold">Job Location</span>
            <input
              className="border-sm p-xs outline-none border-gray-300"
              placeholder="Baneshwor, Kathmandu"
              {...register("location")}
            />
          </div>
          <p className="text-red-600 text-sm">{errors.location?.message}</p>
        </div>
        <div>
          <div className=" grid gap-2 items-center">
            <span className="font-semibold">Experience Required</span>
            <input
              className="border-sm p-xs outline-none border-gray-300"
              placeholder="2 years"
              {...register("experienceRequired")}
            />
          </div>
          <p className="text-red-600 text-sm">
            {errors.experienceRequired?.message}
          </p>
        </div>
        <div>
          <div className=" grid gap-2 items-center">
            <span className="font-semibold">Salary</span>
            <input
              className="border-sm p-xs outline-none border-gray-300"
              placeholder="Negotiable"
              {...register("salary")}
            />
          </div>
          <p className="text-red-600 text-sm">{errors.salary?.message}</p>
        </div>

        <div>
          <div className=" grid gap-xs items-center">
            <span className="font-semibold">Deadline</span>
            <Controller
              control={control}
              name="deadline"
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
          <p className="text-red-600 text-sm">{errors.deadline?.message}</p>
        </div>
        <div className="flex pt-sm gap-sm">
          <Link
            to={"/employer/overview"}
            className="bg-orange-light rounded-md text-white hover:text-white px-sm p-xs w-20"
            type="submit"
          >
            Cancel
          </Link>
          <button
            className="bg-blue-dark rounded-md text-white px-sm p-xs w-20"
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobStepOne;
