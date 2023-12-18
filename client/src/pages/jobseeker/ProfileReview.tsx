import { Link, useParams } from "react-router-dom";
import { useCurrentJob } from "../../hooks/useCurrentJob";
import Error from "../../components/shared/Error";
import { useJobseekerProfile } from "./hooks/useJobseekerProfile";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import moment from "moment";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { useEffect } from "react";

const ProfileReview = () => {
  const params = useParams();
  const jobId = params.jobId;
  const { job, isLoading } = useCurrentJob();
const {profile} = useJobseekerProfile()
const{fullName, phoneNumber, email} = useCurrentUser()

useEffect(() => {
window.scrollTo(0,0)
},[])

  if(isLoading) return <div>Loading...</div>
if(profile?.jobseeker_id === undefined) return <Error/>
  if (jobId !== undefined && job?.job_id === undefined) return <Error />;

  return (
    <div className="grid gap-md py-md max-w-3xl mx-auto">
        <div className="grid gap-xs">
          <p className="font-semibold">Review your profile before applying for this job!</p>
          <p>
            By keeping your profile up to date and relevant, you'll increase
            your chances of catching the attention to employers and get
            shortlisted.
          </p>
        </div>

<main className="flex justify-around">
    <section className="grid gap-sm">
        <p className="font-bold border-y-sm h-fit py-sm border-gray-light">Your Profile</p>
    <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqZYAYrmuzw5vIhNRWG2f436EKH4LqTUAFhLDWd2yRNA&s"
          alt=""
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="grid ">
        <h2 className="font-semibold">{profile?.basic_information?.fullname || fullName}</h2>
          <p>Address : Kathmandu</p>
          <p>Phone : {profile?.basic_information?.phone_number || phoneNumber}</p>
          <p>Email : {email}</p>
          <p>Date of Birth : {profile?.basic_information?.date_of_birth || <span className="text-orange-dark">Not available</span>}</p>
        </div>
      </div>
    
      <div>
        <header className="font-semibold">Work Experience</header>
        {profile?.experience ?  <div >
        <div>
          <p>React JS Developer</p>
          <p>ABC company</p>
          <p>Kathmandu</p>
        </div>
      </div> : <span className="text-orange-dark ">Not available</span>}
      </div>
      <div>
        <header className="font-semibold">Education</header>
        {profile?.education ?    <div className="grid gap-xs">
          {profile.education.map(item => {
            return <div key={item.degree} className="grid gap-2">
              <p className="flex items-center gap-2">{item.degree}</p>
            </div>
          })}
        </div> :<span className="text-orange-dark">Not available</span> }
      </div>
   
      <div>
        <header className="font-semibold ">Skills</header>
        {profile?.job_preference?.skills.map(skill => {
        return <li key={skill}>{skill}</li>
       })}
      </div>
      <p className="font-semibold">Expected Salary: (Equals) NRs 40000</p>
    </section>
    <div className="h-full sm:block hidden w-[1px] bg-gray-light"></div>
    
    <section className=" gap-xs hidden h-fit sm:grid">
        <p className="font-bold border-y-sm py-sm border-gray-light">Job requirement</p>
    <div className="flex gap-xs border-b-sm pb-sm border-default">
      <div className=" h-fit">
      <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqZYAYrmuzw5vIhNRWG2f436EKH4LqTUAFhLDWd2yRNA&s"
          alt=""
          className="w-20 h-20 rounded-full object-cover"
        />
        <h2 className="font-semibold">{job?.basic_information.organization_name}</h2>

      </div>
        <div className="grid h-fit">
          <p className="font-semibold">{job?.title}</p>
          <p className="flex gap-2 items-center"><CiLocationOn /> {job?.location}</p>
        <p className="flex items-center gap-2"> <CiCalendar /> Apply before : {moment(job?.deadline).fromNow()}</p>
        </div>
      </div>
    
      <div>
        <header className="font-semibold">Required Skills</header>
       
      </div>
      <div>
        <header className="font-semibold">Required Education</header>
        <div className="">
          <p>Jan 2020</p>
          <p>Bachelor of Arts</p>
          <p>RR campus, KTM</p>
        </div>
      </div>
   
     
      <p className="font-semibold">Offered Salary: (Equals) NRs {job?.salary}</p>
    </section>
   

</main>
    <div className="flex justify-around">
        <div className="flex gap-xs">
            <Link to='/jobseeker/profile ' className="text-blue-light font-medium">View profile</Link>
            <span className="bg-blue-dark w-[1px]"></span>
            <Link to='/jobseeker/profile/basic-info' className="text-blue-light font-medium">Update profile</Link>
        </div>
        <div className="flex gap-xs">
            <Link to='/jobseeker/profile' className="text-blue-light font-medium">View job</Link>
            <span className="bg-blue-dark w-[1px]"></span>
            <Link to='/jobseeker/profile/basic-info' className="text-blue-light font-medium">Save job</Link>
        </div>
    </div>
    <div className="p-sm grid gap-2">
      <button className="bg-blue-dark text-white p-xs px-sm rounded-md w-fit disabled:opacity-60" >Apply</button>
        {/* {role === 'employer' && <p className="text-xs">* You need a jobseeker account to apply</p>} */}
      </div>
    </div>
  );
};

export default ProfileReview
