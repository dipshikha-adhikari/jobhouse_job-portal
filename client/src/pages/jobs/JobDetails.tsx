import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useCurrentJob } from "../../hooks/useCurrentJob";
import Error from "../../components/ui/Error";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth";
import Loader from "../../components/ui/Loader";
import { useEffect } from "react";

const Job = () => {
  const { role } = useCurrentUser();
  const { job, isLoading } = useCurrentJob();
  const { isAunthenticated } = useAuthStore();
  const navigate = useNavigate();
console.log(job)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // return <div>hell</div>
  if (isLoading) return <Loader />;
  if (job?.job_id === undefined) return <Error />;

  const handleJobApply = async () => {
    if (!isAunthenticated) {
      navigate("/user/login");
    } else {
      navigate(`/jobseeker/apply/process/${job.title}/${job.job_id}`);
    }
  };

  return (
    <div className="grid gap-sm max-w-5xl mx-auto">
      <section className=" ">
        <div className="relative">
          <img
            src={
              job?.employer_details?.cover_image
                ? job.employer_details?.cover_image
                : "https://merojob.com/media/header_img/no-img.jpg"
            }
            alt=""
            className="h-[200px] w-full object-cover "
          />
          <Link
            to={`/employer/${job?.employer_details?.organization_name}/${job?.employer_id}`}
            className="absolute border-sm bg-[rgba(0,0,0,0.3)] rounded-md border-green-dark m-2 p-sm bottom-0 left-2 flex gap-xs items-center"
          >
            <img
              src={
                job?.employer_details?.image
                  ? job.employer_details.image
                  : "https://merojob.com/media/uploads/job_logo/8fbfd5a5-94e8-48e7-b1b9-cd861cf189f5.jpg"
              }
              alt=""
              className=" w-16 h-16 object-contain"
            />
            <div>
              <p className="text-white">
                {job?.employer_details?.organization_name}
              </p>
              <p className="text-green-light">
                {job.industry_name}
              </p>
            </div>
          </Link>
        </div>
      </section>
      {/* job  */}

      <section className="grid gap-sm max-w-3xl w-full mx-auto">
        <header className="p-sm border-b-sm border-gray-300 ">
          <h2 className="text-xl py-sm text-green-dark font-semibold">
            {job?.title}
          </h2>
          <div>Apply Before : 1 week, 4 days from now</div>
        </header>
        <div className="p-sm  grid gap-xs">
          <p className="font-semibold border-b-sm border-gray-300">
            Basic Job Information
          </p>
          <p className="flex gap-md border-b-sm border-gray-300 py-xs">
            Job Category <span>:</span> {job?.category_name}
          </p>
          <p className="flex gap-md border-b-sm border-gray-300 py-xs">
            Job Level <span>:</span> {job?.level}
          </p>
          <p className="flex gap-md border-b-sm border-gray-300 py-xs">
            No of Vacancy/s <span>:</span>[ {job?.no_of_vacancy}]
          </p>
          <p className="flex gap-md border-b-sm border-gray-300 py-xs">
            Employment Type <span>:</span>
            {job?.type}
          </p>
          <p className="flex gap-md border-b-sm border-gray-300 py-xs">
            Job Location <span>:</span>
            {job?.location}
          </p>
          <p>
            Experience Required <span>:</span> {job?.experience_required}
          </p>
          <p className="flex gap-md border-b-sm border-gray-300 py-xs">
            Offered Salary <span>:</span>
            {job?.salary}
          </p>
        </div>
        <div className="grid px-sm gap-xs">
          <h2 className="font-semibold border-b-sm border-gray-300 py-xs">
            Job Description
          </h2>
          {job?.description && (
            <div
              className="prose  prose-li:marker:text-black-default"
              dangerouslySetInnerHTML={{ __html: job?.description }}
            />
          )}
        </div>
        <div className="p-sm grid gap-2">
          <button
            className="bg-blue-dark text-white p-xs px-sm rounded-md w-fit disabled:opacity-60"
            disabled={role === "employer"}
            onClick={handleJobApply}
          >
            Apply
          </button>
          {role === "employer" && (
            <p className="text-xs">* You need a jobseeker account to apply</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Job;
