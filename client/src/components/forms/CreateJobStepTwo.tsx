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

type StepTwoInputs = {
  noOfVacancy: number;
  description: string;
  level: string;
  type: string;
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
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const { jobId } = params;
  const { profile } = useProfile();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CreateJobStepTwoSchema) });

  const jobStore = useJobInputs();

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
    jobStore.setStepOneInputs("");
    setIsEditorOpen(false);
  };

  useEffect(() => {
    if (job) {
      setType(job.type);
      setLevel(job.level);
    }
    setValue(
      "educationRequired",
      job?.education_required
        ? job.education_required
        : jobStore.stepTwo.educationRequired,
    );
    setValue("skills", job?.skills);
    setValue(
      "noOfVacancy",
      job?.no_of_vacancy ? job.no_of_vacancy : jobStore.stepTwo.noOfVacancy,
    );
    setValue(
      "level",
      job?.level !== undefined ? job.level : jobStore.stepTwo.level,
    );
    setValue(
      "type",
      job?.type !== undefined ? job.type : jobStore.stepTwo.type,
    );
    setValue(
      "description",
      job?.description !== undefined
        ? job.description
        : jobStore.stepTwo.description,
    );
  }, [job]);

  return (
    <form className="grid   gap-sm  " onSubmit={handleSubmit(onSubmit)}>
      <section className="grid gap-xs ">
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
              className="border-sm p-xs outline-none border-gray-300"
              placeholder="4"
              {...register("noOfVacancy")}
            />
          </div>
          <p className="text-red-600 text-sm">{errors.noOfVacancy?.message}</p>
        </div>
        <div>
          <div className=" grid gap-2 items-center">
            <span className="font-semibold">Job Level</span>
            <Controller
              name="level"
              control={control}
              render={({ field: { onChange } }) => (
                <SelectJob
                  onChange={onChange}
                  values={["Entry", "Mid", "Senior", "Top"]}
                  value={level}
                  setLevel={setLevel}
                />
              )}
            />
          </div>
          <p className="text-red-600 text-sm">{errors.level?.message}</p>
        </div>

        <div>
          <div className=" grid gap-2 items-center">
            <span className="font-semibold">Job Type</span>
            <Controller
              name="type"
              control={control}
              render={({ field: { onChange } }) => (
                <SelectJob
                  onChange={onChange}
                  values={["Full Time", "Part time", "Intern"]}
                  value={type}
                  setType={setType}
                />
              )}
            />
          </div>
          <p className="text-red-600 text-sm">{errors.type?.message}</p>
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
          <p className="text-red-600 text-sm">{errors.description?.message}</p>
        </div>
      </section>

      <div className="flex justify-around">
        <button
          className="border-blue-dark  rounded-md border-sm text-blue-dark px-sm p-xs disabled:opacity-50"
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
  );
};

export default CreateJobStepTwo;
