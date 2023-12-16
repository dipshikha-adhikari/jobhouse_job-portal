import { Link, useParams } from "react-router-dom";
import JobPreference from "./JobPreference";
import BasicInfo from "./BasicInfo";
import Education from "./Education";
import Skills from "./Skills";
import Experience from "./Experience";
import Others from "./Others";
import { useJobseekerProfile } from "../hooks/useJobseekerProfile";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import Error from "../../../components/ui/Error";

const EditProfile = () => {
  const params = useParams();
  const title = params.title;
  const {profile} = useJobseekerProfile()
const {role} = useCurrentUser()
  
let data = [
  {
    title: "Job Preference",
    link: "job-preference",
    component: <JobPreference profile={profile}/>,
  },
  {
    title: "Basic Information",
    link: "basic-info",
    component: <BasicInfo profile={profile} />,
  },
  {
    title: "Education",
    link: "education",
    component: <Education profile={profile} />,
  },
  {
    title: "Work Experience",
    link: "experience",
    component: <Experience profile={profile} />,
  },
 
];

if(role !== 'jobseeker') return <Error/>
  return (
    <div className="grid gap-10 max-w-5xl mx-auto md:flex w-full sm:p-10 lg:p-sm">
      <section className="w-full grid    gap-10 h-fit flex-[0.5]">
        <h2 className="font-semibold text-xl text-green-dark pt-md  ">EDIT PROFILE</h2>
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
      <section className="border-sm p-md md:p-xl  flex-1   border-blue-darktmd:border-none">
        {data.map((item) => {
          return <div key={item.link}>{title === item.link && item.component}</div>;
        })}
      </section>
    </div>
  );
};

export default EditProfile;
