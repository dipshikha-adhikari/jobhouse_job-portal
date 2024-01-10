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
    <div className="grid gap-2 overflow-auto max-w-5xl mx-auto ">
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
            className="absolute border-sm bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.7)] rounded-md border-green-dark  p-sm bottom-0 left-0 m-2 flex gap-xs sm:gap-md items-center"
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
        <aside className="border-xs flex-[1.8] w-full rounded-sm border-light">
          <section className="">
            <header className="grid border-b-sm p-sm py-md gap-xs ">
              <h2 className="text-2xl  text-green-dark ">{job?.title}</h2>
              <div>
                Apply before : {moment(job?.deadline).format("MMM Do YYYY")}
              </div>
              <p className="flex items-center gap-2">
                <FaCheckCircle className="text-green-dark" />{" "}
                {job.job_application_count} Applications
              </p>
            </header>
            <div className="    p-sm">
              <p className="font-bold  text-black-default ">Job Information</p>
              <p className="flex  gap-xs border-b-sm py-sm sm:gap-md">
                Job Category <span>:</span> {job?.category_name}
              </p>
              <p className="flex gap-xs border-b-sm py-sm  sm:gap-md">
                Job Level <span>:</span> {job?.level_name}
              </p>
              <p className="flex gap-xs border-b-sm py-sm  sm:gap-md">
                No of Vacancy/s <span>:</span>[ {job?.no_of_vacancy}]
              </p>
              <p className="flex gap-xs border-b-sm py-sm  sm:gap-md ">
                Employment Type <span>:</span>
                {job?.type_name}
              </p>
              <p className="flex gap-xs  border-b-sm py-sm sm:gap-md">
                Job Location <span>:</span>
                {job?.location}
              </p>

              <p className="flex gap-xs border-b-sm py-sm  sm:gap-md">
                Offered Salary <span>:</span>
                {job?.salary}
              </p>
            </div>
            <section>
              <div className="  p-sm border-default w-fit">
                <h2 className="font-bold  text-black-defaul">
                  Job Specification
                </h2>
                <p className="flex border-b-sm py-sm gap-xs sm:gap-md">
                  Experience Required <span>:</span> {job?.experience_required}
                </p>
                <p className="flex border-b-sm py-sm gap-xs sm:gap-md">
                  Education Required <span>:</span> {job?.education_required}
                </p>
                {job?.skills?.length > 0 && (
                  <div className="flex border-b-sm py-sm items-start gap-xs sm:gap-md">
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
            <div className="px-sm grid  gap-2 ">
              <h2 className="font-bold  text-black-default flex items-center gap-2">
                Other Specification{" "}
                <FaArrowAltCircleDown className="text-green-dark" />
              </h2>
              {job?.description && (
                <div
                  className="prose border-b-sm  prose-li:marker:text-black-default"
                  dangerouslySetInnerHTML={{ __html: job?.description }}
                />
              )}
            </div>
            <div className="p-sm  grid gap-2">
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
        <section className="flex-1  ">
          {jobs && jobs?.length > 1 && (
            <div className="border-sm w-full ">
              <h2 className="sm:text-xl p-sm flex items-center border-b-sm gap-2   text-green-dark  font-bold  ">
                <CiStar /> More jobs by {job.employer_details.organization_name}
              </h2>
              <div className="grid p-sm  gap-sm grid-cols-auto-sm w-full">
                {loadingRecentJobs && (
                  <div className="text-center">Loading...</div>
                )}
                {errorRecentJobs && <div className="text-center">Error!</div>}
                {jobs !== undefined && jobs.length > 1 ? (
                  jobs.slice(0, 2)?.map((item) => {
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
          )}
        </section>
      </main>
    </div>
  );
};

export default Job;
