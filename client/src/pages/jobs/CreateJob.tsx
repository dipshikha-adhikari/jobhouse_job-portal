import { useEffect, useState } from "react";
import CreateJobStepOne from "../../components/forms/CreateJobStepOne";
import CreateJobStepTwo from "../../components/forms/CreateJobStepTwo";
import ProgressBar from "../../components/ui/ProgressBar";
import { useCurrentJob } from "../../hooks/useCurrentJob";
import useAuthStore from "../../store/auth";
import NoUser from "../../components/shared/NoUser";
import Error from "../../components/shared/Error";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Loader from "../../components/shared/Loader";

const CreateJob = () => {
  const [step, setStep] = useState(1);
  const auth = useAuthStore();
  const params = useParams()
const{role} = useCurrentUser()
const loading = !role
  const jobId = params.jobId
  const { job , isLoading} = useCurrentJob();

useEffect(() => {
window.scrollTo(0,0)
},[])

if(isLoading || loading) return <Loader/>

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
