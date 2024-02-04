import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import useJobInputs from "../../store/jobInputs";
import { IJob } from "../../types/postgres/types";
import { CreateJobStepOneSchema } from "../../utils/validationSchema";
import ResponsiveDayPicker from "../mui/DayPicker";
import SelectCategory from "../mui/SelectCategory";

export interface ICreateJobStepOneInputs {
  title: string 
  categoryId: string;
  location: string;
  experienceRequired: string;
  salary: string;
  deadline: Date;
}

type CreateJobStepOneProps = {
  setStep: (props: number) => void;
  step: number;
  job:IJob | undefined
};

const CreateJobStepOne = ({ setStep, step,job }: CreateJobStepOneProps) => {

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
    jobStore.setStepOneCompleted(true)
    setStep(step + 1);
  };

  
  useEffect(() => {
    window.scrollTo(0, 0);
    jobStore.setStepOneInputs({
      title: "",
      categoryId: "",
      location: "",
      experienceRequired: "",
      deadline: new Date(),
      salary: "",
    });
  }, []);

  

  useEffect(() => {
    setValue("categoryId",  jobStore.stepOne.categoryId || job?.category_id || "");
    setValue("title",  jobStore.stepOne.title || job?.title || "");
    setValue("salary",jobStore.stepOne.salary || job?.salary || "");
    setValue(
      "deadline",
    new Date(moment(job?.deadline).format("YYYY-MM-DD")) || jobStore.stepOne.deadline ,
    );
    setValue("location",  jobStore.stepOne.location ||job?.location || "");
    setValue(
      "experienceRequired",
      jobStore.stepOne.experienceRequired ||  job?.experience_required || "",
    );
  }, [job]);

  useEffect(() => {
   if(jobStore.isStepOneCompleted){
    setValue('deadline', jobStore.stepOne.deadline)
   }
      },[jobStore.isStepOneCompleted])

  return (
    <div className="bg-white">
      <form
        className="grid gap-xs px-md pb-md sm:px-xl "
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
                  <ResponsiveDayPicker
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
            className="bg-orange-light rounded-sm text-white hover:text-white px-sm p-xs w-20"
            type="submit"
          >
            Cancel
          </Link>
          <button
            className="bg-blue-light rounded-sm text-white px-sm p-xs w-20"
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
