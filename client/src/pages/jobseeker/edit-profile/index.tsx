import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../components/shared/Loader";
import NoUser from "../../../components/shared/NoUser";
import PageNotFound from "../../../components/shared/PageNotFound";
import useAuthStore from "../../../store/auth";
import { IJobseekerProfile } from "../../../types/postgres/types";
import { useJobseekerProfile } from "../hooks/useJobseekerProfile";
import BasicInfo from "./BasicInfo";
import Education from "./Education";
import Experience from "./Experience";
import JobPreference from "./JobPreference";

type ProfileProps = {
  profile: IJobseekerProfile;
  isLoading: boolean;
  isError: boolean;
};

const EditProfile = () => {
  const params = useParams();
  const title = params.title;
  const { profile, isLoading, isError }: ProfileProps = useJobseekerProfile();
const[error, setError] = useState(false)
  const { isAunthenticated } = useAuthStore();

  const data = [
    {
      title: "Job Preference",
      link: "job-preference",
      component: <JobPreference job_preference={profile?.job_preference} />,
    },
    {
      title: "Basic Information",
      link: "basic-info",
      component: <BasicInfo basic_information={profile?.basic_information} />,
    },
    {
      title: "Education",
      link: "education",
      component: <Education education={profile?.education} />,
    },
    {
      title: "Work Experience",
      link: "experience",
      component: <Experience experience={profile?.experience} />,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  const isValidTitle =  data.find(item => item.link === title)
  if(!isValidTitle){
    setError(true)
  }
  }, []);

  if (isLoading) return <Loader />;
  if (!isAunthenticated) return <NoUser />;
  
  if (isError || profile.user_id === undefined || error) return <PageNotFound />;

  return (
    <div className="grid gap-sm max-w-5xl mx-auto md:flex w-full p-sm">
      <section className="w-full grid    gap-10 h-fit flex-[0.3]">
        <h2 className="font-semibold text-xl text-green-dark pt-md  ">
          EDIT PROFILE
        </h2>
        <ul className="grid gap-xs  ">
          {data.map((item) => {
            return (
              <Link
                to={`/jobseeker/profile/${item.link}`}
                key={item.title}
                className={`${
                  title === item.link && "text-green-dark"
                } text-black-default w-fit hover:text-green-dark`}
              >
                {item.title}
              </Link>
            );
          })}
        </ul>
      </section>
      <section className=" md:p-xl  flex-1 ">
        {data.map((item) => {
          return (
            <div key={item.link}>{title === item.link && item.component}</div>
          );
        })}
    
      </section>
    </div>
  );
};

export default EditProfile;
