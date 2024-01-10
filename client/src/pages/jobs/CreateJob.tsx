import { useEffect, useState } from "react";
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
  const jobId = params.jobId;
  const { job, isLoading } = useCurrentJob();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <Loader />;

  if (job?.job_id === undefined && jobId !== undefined) return <Error />;
  if (!role && !isLoading && !auth.isAunthenticated) return <NoUser />;

  if (role === "jobseeker")
    return (
      <div className="text-center min-h-[80vh] flex justify-center items-center">
        {" "}
        You must be an employer to create or update job.
      </div>
    );

  return (
    <div className="w-full grid gap-sm max-w-2xl shadow-xl  mx-auto">
      <div className="grid p-sm gap-xs">
        <span className="flex justify-center  font-semibold ">
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
  );
};

export default CreateJob;
