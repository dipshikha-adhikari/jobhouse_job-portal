import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Editor from "../shared/Editor";
import useJobInputs from "../../store/jobInputs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createJob } from "../../pages/employer/actions/createJob";
import { CreateJobStepTwoSchema } from "../../utils/validationSchema";
import SelectJob from "../mui/SelectJob";
import { useProfile } from "../../pages/employer/hooks/useEmployerProfile";
import TagsInputBox from "../ui/TagsInputBox";
import { IJob } from "../../types/postgres/types";
import { Maybe } from "yup";
import { useLevels } from "../../hooks/useJobLevels";
import { useTypes } from "../../hooks/useJobTypes";

type StepTwoInputs = {
  noOfVacancy: number;
  description: string;
  levelId: string;
  typeId: string;
  educationRequired: string;
  skills?: Maybe<(string | undefined)[] | undefined>;
};

type CreateJobStepTwoProps = {
  setStep: (props: number) => void;
  job: IJob | undefined;
  step: number;
};

const CreateJobStepTwo = ({ setStep, job, step }: CreateJobStepTwoProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const { jobId } = params;
  const { profile } = useProfile();
  const { levels } = useLevels();
  const { types } = useTypes();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CreateJobStepTwoSchema) });

  const jobStore = useJobInputs();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit: SubmitHandler<StepTwoInputs> = (data) => {
    const stepOneData = jobStore.stepOne;
    if (stepOneData.deadline === undefined || stepOneData.title === undefined) {
      setStep(step - 1);
    }
    const dataToBeSent = {
      ...stepOneData,
      ...data,
      industryId: profile?.basic_information.industry_id,
    };
    createJob(dataToBeSent, setIsLoading, navigate, jobId);
    setIsEditorOpen(false);
  };

  useEffect(() => {
    setValue(
      "educationRequired",
      job?.education_required || jobStore.stepTwo.educationRequired,
    );
    setValue("skills", job?.skills);
    setValue("noOfVacancy", job?.no_of_vacancy || jobStore.stepTwo.noOfVacancy);
    setValue("levelId", job?.level_id || jobStore.stepTwo.levelId);
    setValue("typeId", job?.type_id || jobStore.stepTwo.typeId);
    setValue("description", job?.description || jobStore.stepTwo.description);
  }, [job]);

  return (
    <div className="bg-white p-sm">
      <form className="grid  gap-sm p-sm " onSubmit={handleSubmit(onSubmit)}>
        <section className="grid gap-xs p-sm ">
          <div>
            <div className="grid gap-xs  sm:flex ">
              <span className="font-semibold">Skills </span>
              <Controller
                name="skills"
                control={control}
                render={({ field: { onChange } }) => {
                  return (
                    <TagsInputBox
                      isEditorOpen={isEditorOpen}
                      values={job?.skills}
                      onChange={onChange}
                    />
                  );
                }}
              />
            </div>
            <p className="text-red-600 text-sm">{errors.skills?.message}</p>
          </div>

          <div>
            <div className=" grid gap-2 items-center">
              <span className="font-semibold">Education Required</span>
              <input
                className="border-sm p-xs outline-none border-gray-300"
                placeholder="Bachelor degree or equivalent"
                {...register("educationRequired")}
              />
            </div>
            <p className="text-red-600 text-sm">
              {errors.educationRequired?.message}
            </p>
          </div>

          <div>
            <div className=" grid gap-2 items-center">
              <span className="font-semibold">No of Vacancy</span>
              <input
                className="border-sm p-sm  outline-none border-gray-300"
                placeholder="4"
                {...register("noOfVacancy")}
              />
            </div>
            <p className="text-red-600 text-sm">
              {errors.noOfVacancy?.message}
            </p>
          </div>
          <div>
            <div className=" grid gap-2 items-center">
              <span className="font-semibold">Job Level</span>
              <Controller
                name="levelId"
                control={control}
                render={({ field }) => (
                  <SelectJob type="level" field={field} values={levels} />
                )}
              />
            </div>
            <p className="text-red-600 text-sm">{errors.levelId?.message}</p>
          </div>

          <div>
            <div className=" grid gap-2 items-center">
              <span className="font-semibold">Job Type</span>
              <Controller
                name="typeId"
                control={control}
                render={({ field }) => (
                  <SelectJob field={field} type="type" values={types} />
                )}
              />
            </div>
            <p className="text-red-600 text-sm">{errors.typeId?.message}</p>
          </div>

          <div>
            <div className=" grid gap-2 ">
              <div>
                <span className="font-semibold">Job Description</span>
                <p className="text-xs text-gray-dark">
                  Enter job requirement and description
                </p>
              </div>
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange } }) => (
                  <Editor onChange={onChange} initialValue={job?.description} />
                )}
              />
            </div>
            <p className="text-red-600 text-sm">
              {errors.description?.message}
            </p>
          </div>
        </section>

        <div className="flex justify-around">
          <button
            className="border-blue-light w-20  rounded-sm border-sm text-blue-dark px-sm p-xs disabled:opacity-50"
            onClick={() => setStep(step - 1)}
            type="button"
          >
            Prev
          </button>
          <button
            className="bg-blue-dark disabled:opacity-50 text-white px-sm p-xs w-20 rounded-md"
            disabled={isLoading}
          >
            {jobId !== undefined ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobStepTwo;
