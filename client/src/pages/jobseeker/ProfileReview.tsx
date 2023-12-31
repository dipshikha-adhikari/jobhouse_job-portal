import { Link, useNavigate, useParams } from "react-router-dom";
import { useCurrentJob } from "../../hooks/useCurrentJob";
import Error from "../../components/shared/Error";
import { useJobseekerProfile } from "./hooks/useJobseekerProfile";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import moment from "moment";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import { IJobseekerProfile } from "../../types/postgres/types";
import Loader from "../../components/shared/Loader";
import { applyJob } from "./actions/applyJob";

type Profile = {
  profile: IJobseekerProfile;
  isLoading: boolean;
};

const ProfileReview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const jobId = params.jobId;
  const { job, isLoading: loading1 } = useCurrentJob();
  const { profile, isLoading: loading }: Profile = useJobseekerProfile();
  const { fullName, phoneNumber, email, role } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading1 || loading) return <Loader />;
  if (role !== "jobseeker") return <Error />;
  if (jobId !== undefined && job?.job_id === undefined) return <Error />;

  return (
    <div className="grid gap-md  p-md max-w-3xl mx-auto ">
      <div className="grid gap-xs">
        <p className="font-semibold">
          Review your profile before applying for this job!
        </p>
        <p>
          By keeping your profile up to date and relevant, you'll increase your
          chances of catching the attention to employers and get shortlisted.
        </p>
      </div>
      <main className="grid gap-sm">
        <header className="flex justify-between border-y-sm   py-sm ">
          <p className="font-bold flex-1 uppercase text-green-dark">
            Your Profile
          </p>
          <div className="w-1 border-sm h-full  grid bg-green-light"></div>
          <p className="font-bold hidden  uppercase text-green-dark float-right text-right sm:block flex-1">
            Job requirement
          </p>
        </header>
        <section className="flex justify-between gap-sm   py-sm ">
          <aside className="flex-1">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqZYAYrmuzw5vIhNRWG2f436EKH4LqTUAFhLDWd2yRNA&s"
                alt=""
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="grid ">
                <h2 className="font-semibold">
                  {profile?.basic_information?.fullname || fullName}
                </h2>
                <p>Address : {profile?.basic_information?.current_address}</p>
                <p>
                  Phone :{" "}
                  {profile?.basic_information?.phone_number || phoneNumber}
                </p>
                <p>Email : {email}</p>
                <p>
                  Date of Birth :{" "}
                  {moment(profile?.basic_information?.date_of_birth).format(
                    "YYYY-MM-DD",
                  ) || <span>Not available</span>}
                </p>
              </div>
            </div>
          </aside>
          <div className="w-1 border-sm h-full  grid bg-green-light"></div>

          <aside className=" hidden sm:block flex-1">
            <div className="grid gap-xs place-content-center ">
              <div className=" h-fit">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqZYAYrmuzw5vIhNRWG2f436EKH4LqTUAFhLDWd2yRNA&s"
                  alt=""
                  className="w-20 h-20 rounded-full object-cover"
                />
                <h2 className="font-semibold">{job?.industry_name}</h2>
              </div>
              <div className="grid h-fit">
                <p className="font-semibold">{job?.title}</p>
                <p className="flex gap-2 items-center">
                  <CiLocationOn /> {job?.location}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <CiCalendar /> Apply before :{" "}
                  {moment(job?.deadline).fromNow()}
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className="flex justify-between gap-sm items-start  py-sm ">
          <aside className="flex-1 grid gap-xs">
            <header className="font-semibold uppercase text-green-dark">
              Work Experience
            </header>
            {profile?.experience.length > 0 ? (
              <div className="grid gap-sm">
                {profile?.experience?.map((item) => {
                  return (
                    <div>
                      <p className="font-semibold">{item.job_title}</p>
                      <p>
                        <span className="font-semibold">
                          {item.organization_name}
                        </span>{" "}
                        ({item.organization_type})
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <span>Not available</span>
            )}
          </aside>
          <div className="w-1 border-sm h-full  grid bg-green-light"></div>

          <aside className=" hidden   gap-xs flex-1 place-content-center sm:grid  ">
            <header className="font-semibold uppercase text-green-dark">
              Required Experience
            </header>
            <p>{job?.experience_required}</p>
          </aside>
        </section>

        <section className="flex items-start gap-sm justify-between py-sm ">
          <aside className="flex-1 grid gap-xs">
            <header className="font-semibold uppercase text-green-dark ">
              Education
            </header>
            {profile?.education.length > 0 ? (
              <div className="grid gap-2">
                {profile?.education?.map((item) => {
                  return (
                    <div key={item.degree} className="grid ">
                      <p className="flex  items-center gap-2">
                        <span className="font-semibold">
                          {item.degree} ({item.course}){" "}
                        </span>
                        <span className="text-black-light ">
                          {moment(item.graduation_year).format("YYYY")}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <span>Not available</span>
            )}
          </aside>
          <div className="w-1 border-sm h-full  grid bg-green-light"></div>

          <aside className=" hidden flex-1 sm:grid gap-xs justify-center place-content-center">
            <header className="font-semibold  text-center  uppercase text-green-dark">
              Required Education
            </header>
            <p className="text-center">
              {job?.education_required || "Not available"}
            </p>
          </aside>
        </section>

        <section className="flex justify-between gap-sm  items-start">
          <aside className="grid gap-xs overflow-clip flex-1 h-fit">
            <header className="font-semibold uppercase text-green-dark">
              Skills
            </header>
            {profile?.job_preference?.skills.length > 0 ? (
              profile?.job_preference?.skills?.map((skill) => {
                return (
                  <li key={skill} className="break-all">
                    {skill}
                  </li>
                );
              })
            ) : (
              <span>Not available</span>
            )}
          </aside>
          <div className="w-1 border-sm h-full  grid bg-green-light"></div>

          <aside className="sm:grid gap-xs flex-1 text-center place-content-center hidden ">
            <header className="font-semibold uppercase text-green-dark ">
              Required skills
            </header>
            <div className="grid  gap-2">
              {job !== undefined && job?.skills?.length > 0 ? (
                job?.skills?.map((item) => {
                  return <p key={item}>{item}</p>;
                })
              ) : (
                <span>Not required</span>
              )}
            </div>
          </aside>
        </section>
      </main>

      <main className="flex justify-around">
        <section className="grid gap-sm">
          <p className="font-semibold">Expected Salary: (Equals) NRs 40000</p>
        </section>
        <div className="h-full sm:block hidden w-[1px] bg-gray-light"></div>

        <section className=" gap-xs hidden h-fit sm:grid">
          <p className="font-semibold">
            Offered Salary: (Equals) NRs {job?.salary}
          </p>
        </section>
      </main>
      <div className="flex justify-around">
        <div className="flex gap-xs">
          <Link
            to="/jobseeker/profile "
            className="text-blue-light font-medium"
          >
            View profile
          </Link>
          <span className="bg-blue-dark w-[1px]"></span>
          <Link
            to="/jobseeker/profile/basic-info"
            className="text-blue-light font-medium"
          >
            Update profile
          </Link>
        </div>
        <div className="flex gap-xs">
          <Link
            to={`/jobs/${job?.title}/${job?.job_id}`}
            className="text-blue-light font-medium"
          >
            View job
          </Link>
          <span className="bg-blue-dark w-[1px]"></span>
          <Link
            to="/jobseeker/overview"
            className="text-blue-light font-medium"
          >
            Save job
          </Link>
        </div>
      </div>
      <div className="p-sm grid gap-2">
        <button
          onClick={() =>
            applyJob(job?.job_id, job?.employer_id, setIsLoading, navigate)
          }
          className="bg-blue-dark text-white p-xs px-sm rounded-md w-fit disabled:opacity-60"
          disabled={
            (profile?.education.length === 0 &&
              profile?.experience.length === 0 &&
              profile?.job_preference?.skills === undefined) ||
            role !== "jobseeker" ||
            isLoading
          }
        >
          Apply
        </button>
        {role === "employer" && (
          <p className="text-xs">* You need a jobseeker account to apply</p>
        )}
        {profile?.education.length === 0 &&
          profile?.experience.length === 0 &&
          role === "jobseeker" && (
            <div className="text-gray-dark">
              Please update education or experience to apply{" "}
            </div>
          )}
      </div>
    </div>
  );
};

export default ProfileReview;
