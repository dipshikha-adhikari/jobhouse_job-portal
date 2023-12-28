import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useJobInputs from "../../store/jobInputs";
import { useEffect } from "react";
import moment from "moment";
import { CreateJobStepOneSchema } from "../../utils/validationSchema";
import { IJob } from "../../types/postgres/types";
import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

export interface ICreateJobStepOneInputs {
  title: string;
  categoryId: string 
  location: string;
  experienceRequired: string;
  salary: string;
  deadline: Date 
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
  } = useForm({ resolver: yupResolver(CreateJobStepOneSchema) });
  const jobStore = useJobInputs();
  const { categories } = useCategories();

  const onSubmit: SubmitHandler<ICreateJobStepOneInputs> = (data) => {
    jobStore.setStepOneInputs(data);
    setStep(step + 1);
  };

  useEffect(() => {
    const dateFromDBString: string = moment(job?.deadline).format("YYYY-MM-DD");
    const dateFromDB: Date = new Date(dateFromDBString);
    setValue(
      "categoryId",
      job?.category_id !== undefined
        ? job.category_id
        : jobStore.stepOne.categoryId,
    );
    setValue(
      "title",
      job?.title !== undefined ? job?.title : jobStore.stepOne.title,
    );
    setValue(
      "salary",
      job?.salary !== undefined ? job?.salary : jobStore.stepOne.salary,
    );
    setValue("deadline", dateFromDB || jobStore.stepOne.deadline);
    setValue(
      "location",
      job?.location !== undefined ? job?.location : jobStore.stepOne.location,
    );
    setValue(
      "experienceRequired",
      job?.experience_required !== undefined
        ? job?.experience_required
        : jobStore.stepOne.experienceRequired,
    );
  }, [job]);

  return (
    <div>
      <form className="grid gap-xs" onSubmit={handleSubmit(onSubmit)}>
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
            <select
              {...register("categoryId")}
              placeholder="IT & Telecommunication"
              className="border-sm p-xs outline-none border-gray-300"
            >
              <option value="" className="">
                Select a category
              </option>
              {categories?.map((cat) => {
                return (
                  <option key={cat.category_id} value={cat.category_id}>
                    {cat.category_name}
                  </option>
                );
              })}
            </select>
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
            <input
              type="date"
              className="border-sm p-xs outline-none border-gray-300"
              {...register("deadline")}
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
