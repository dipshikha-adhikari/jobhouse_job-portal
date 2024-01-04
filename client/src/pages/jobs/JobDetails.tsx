import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useCurrentJob } from "../../hooks/useCurrentJob";
import Error from "../../components/shared/Error";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth";
import Loader from "../../components/shared/Loader";
import { useEffect, useState } from "react";
import { useAppliedJobs } from "../jobseeker/hooks/useAppliedJobs";
import { AppliedJobs } from "../../types/postgres/types";
import moment from "moment";
import { FaArrowAltCircleDown, FaCheckCircle } from "react-icons/fa";
import { useRecentJobs } from "../employer/hooks/useRecentJobs";
import JobCard from "../../components/shared/JobCard";
import { CiStar } from "react-icons/ci";

type AppliedJobsType = {
  jobs: AppliedJobs[];
  isError: boolean;
  isLoading: boolean;
};

const Job = () => {
  const { role } = useCurrentUser();
  const { job, isLoading, isError } = useCurrentJob();
  const { isAunthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { jobs: appliedJobs }: AppliedJobsType = useAppliedJobs();
  const [isApplied, setIsApplied] = useState(false);
  const {
    jobs,
    isLoading: loadingRecentJobs,
    isError: errorRecentJobs,
  } = useRecentJobs(job?.employer_id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [job]);

  useEffect(() => {
    appliedJobs?.length > 0 &&
      appliedJobs?.map((item) => {
        if (item.job_id === job?.job_id) {
          setIsApplied(true);
        }
      });
  }, [job, appliedJobs]);

  if (isLoading) return <Loader />;
  if (job?.job_id === undefined || isError) return <Error />;

  const handleJobApply = async () => {
    if (!isAunthenticated) {
      navigate("/user/login");
    } else {
      navigate(`/jobseeker/apply/process/${job?.title}/${job?.job_id}`);
    }
  };

  return (
    <div className="grid gap-sm max-w-5xl mx-auto ">
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
            className="absolute border-sm bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.7)] rounded-md border-green-dark m-2 p-sm bottom-0 left-2 flex gap-xs sm:gap-mditems-center"
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
              <p className="text-white">{job?.industry_name}</p>
            </div>
          </Link>
        </div>
      </section>
      {/* job  */}
      <main className="lg:flex grid  gap-sm lg:justify-between items-start">
        <aside className="sm:border-xs sm:p-xl w-full rounded-sm border-light">
          <section className="grid gap-sm">
            <header className="grid gap-xs ">
              <h2 className="text-xl  text-green-dark font-bold">
                {job?.title}
              </h2>
              <div>Apply : {moment(job?.deadline).fromNow()}</div>
              <p className="flex items-center gap-2">
                <FaCheckCircle className="text-green-dark" />{" "}
                {job.job_application_count} Applications
              </p>
            </header>
            <div className="  grid gap-xs">
              <p className="font-semibold  text-xl">Job Information</p>
              <p className="flex  gap-xs sm:gap-md">
                Job Category <span>:</span> {job?.category_name}
              </p>
              <p className="flex gap-xs sm:gap-md">
                Job Level <span>:</span> {job?.level_name}
              </p>
              <p className="flex gap-xs sm:gap-md">
                No of Vacancy/s <span>:</span>[ {job?.no_of_vacancy}]
              </p>
              <p className="flex gap-xs sm:gap-md ">
                Employment Type <span>:</span>
                {job?.type_name}
              </p>
              <p className="flex gap-xs sm:gap-md">
                Job Location <span>:</span>
                {job?.location}
              </p>

              <p className="flex gap-xs sm:gap-md">
                Offered Salary <span>:</span>
                {job?.salary}
              </p>
            </div>
            <section>
              <div className="grid gap-xs  border-y-sm py-lg border-default w-fit">
                <h2 className="text-xl font-semibold">Job Specification</h2>
                <p className="flex gap-xs sm:gap-md">
                  Experience Required <span>:</span> {job?.experience_required}
                </p>
                <p className="flex gap-xs sm:gap-md">
                  Education Required <span>:</span> {job?.education_required}
                </p>
                {job?.skills?.length > 0 && (
                  <div className="flex items-start gap-xs sm:gap-md">
                    <h2 className=" flex"> Key Skills </h2>
                    <span>:</span>
                    <div className="flex flex-wrap  gap-xs">
                      {job?.skills?.length > 0
                        ? job?.skills?.map((skill) => {
                            return (
                              <span
                                key={skill}
                                className="bg-black-light text-white px-sm rounded-md"
                              >
                                {skill}
                              </span>
                            );
                          })
                        : "Not available"}
                    </div>
                  </div>
                )}
              </div>
            </section>
            <div className="grid  gap-xs">
              <h2 className="font-semibold text-xl flex items-center gap-2">
                Other Specification{" "}
                <FaArrowAltCircleDown className="text-green-dark" />
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
                disabled={role === "employer" || isApplied}
                onClick={handleJobApply}
              >
                Apply
              </button>
              {role === "employer" && (
                <p className="text-xs">
                  * You need a jobseeker account to apply
                </p>
              )}
              {isApplied && (
                <p className="text-gray-dark">
                  You have already applied for this job
                </p>
              )}
            </div>
          </section>
        </aside>
        {jobs && jobs?.length > 1 && (
          <aside className=" ">
            <div className="grid gap-md place-items-end">
              <h2 className="text-xl flex items-center gap-2 border-y-sm w-fit mx-auto uppercase text-green-dark py-sm font-bold text-center  ">
                <CiStar /> More jobs by {job.employer_details.organization_name}
              </h2>
              <div className="grid   gap-sm grid-cols-auto-sm w-full mx-auto">
                {loadingRecentJobs && (
                  <div className="text-center">Loading...</div>
                )}
                {errorRecentJobs && <div className="text-center">Error!</div>}
                {jobs !== undefined && jobs.length > 1 ? (
                  jobs?.map((item) => {
                    if (item.job_id !== job.job_id) {
                      return (
                        <JobCard
                          key={item.job_id}
                          job={item}
                          appliedJobs={appliedJobs}
                        />
                      );
                    }
                  })
                ) : (
                  <div className="text-center py-sm">
                    {" "}
                    No other jobs available
                  </div>
                )}
              </div>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
};

export default Job;
