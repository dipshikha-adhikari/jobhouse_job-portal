import { useState } from "react";
import CreateJobStepOne from "../../components/forms/CreateJobStepOne";
import CreateJobStepTwo from "../../components/forms/CreateJobStepTwo";
import ProgressBar from "../../components/ui/ProgressBar";
import { useCurrentJob } from "../../hooks/useCurrentJob";
import useAuthStore from "../../store/auth";
import NoUser from "../../components/shared/NoUser";
import Error from "../../components/shared/Error";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const CreateJob = () => {
  const [step, setStep] = useState(1);
  const auth = useAuthStore();
  const { job } = useCurrentJob();
  const params = useParams()
const{role} = useCurrentUser()
  const jobId = params.jobId

  if (job?.job_id === undefined && jobId !== undefined) return <Error />;
  if (!auth.isAunthenticated) return <NoUser />;
 if(role !== 'employer') return <Error/>

return (
    <div className="w-full grid gap-sm max-w-2xl mx-auto">
      <div className="grid gap-xs">
        <span className="flex justify-center font-semibold ">
          Step {step} of 2
        </span>
        <ProgressBar step={step} />
      </div>
      {step === 1 && <CreateJobStepOne job={job} setStep={setStep} />}
      {step === 2 && <CreateJobStepTwo job={job} setStep={setStep} />}
    </div>
  );
};

export default CreateJob;
