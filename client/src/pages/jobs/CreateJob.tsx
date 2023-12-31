import { useState } from "react";
import { useParams } from "react-router-dom";
import CreateJobStepOne from "../../components/forms/CreateJobStepOne";
import CreateJobStepTwo from "../../components/forms/CreateJobStepTwo";
import Error from "../../components/shared/Error";
import Loader from "../../components/shared/Loader";
import NoUser from "../../components/shared/NoUser";
import ProgressBar from "../../components/ui/ProgressBar";
import { useCurrentJob } from "../../hooks/useCurrentJob";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useAuthStore from "../../store/auth";

const CreateJob = () => {
  const [step, setStep] = useState<number>(1);
  const auth = useAuthStore();
  const params = useParams();
  const { role } = useCurrentUser();
  const loading = !role;
  const jobId = params.jobId;
  const { job, isLoading } = useCurrentJob();

  if (isLoading || loading) return <Loader />;

  if (job?.job_id === undefined && jobId !== undefined) return <Error />;
  if (!auth.isAunthenticated) return <NoUser />;
  if (role !== "employer")
    return (
      <div className="text-center min-h-[80vh] flex justify-center items-center">
        {" "}
        You must be an employer to create or update job.
      </div>
    );

  return (
    <div className="relative ">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_6l-8XL1K2qZhn06CHR3I7B29B-Oel9O8SQ&usqp=CAU"
        className="absolute w-full h-full  object-cover left-0 top-0 -z-10"
        alt=""
      />
      <div className="absolute h-full w-full left-0 top-0 bg-[rgba(0,0,0,0.6)] -z-10"></div>
      <div className="w-full grid gap-sm max-w-2xl   mx-auto">
        <div className="grid p-sm gap-xs">
          <span className="flex justify-center text-white font-semibold ">
            Step {step} of 2
          </span>
          <ProgressBar step={step} />
        </div>
        {step === 1 && (
          <CreateJobStepOne step={step} job={job} setStep={setStep} />
        )}
        {step === 2 && (
          <CreateJobStepTwo step={step} job={job} setStep={setStep} />
        )}
      </div>
    </div>
  );
};

export default CreateJob;
