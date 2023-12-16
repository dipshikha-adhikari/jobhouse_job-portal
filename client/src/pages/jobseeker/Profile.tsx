import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useJobseekerProfile } from "./hooks/useJobseekerProfile";
import useAuthStore from "../../store/auth";
import NoUser from "../NoUser";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import {SlGraduation} from 'react-icons/sl'
import { MdMapsHomeWork, MdOutlineMapsHomeWork } from "react-icons/md";
import {GiFlagObjective} from 'react-icons/gi'
import { CiCalendar, CiCircleCheck } from "react-icons/ci";
import {GrCertificate} from  'react-icons/gr'
import Error from "../../components/ui/Error";

const Profile = () => {
const {profile} = useJobseekerProfile()
const{fullName, phoneNumber, email, role} = useCurrentUser()
const{isAunthenticated} = useAuthStore()

if(!isAunthenticated) return <NoUser/>
if(role !== 'jobseeker') return <Error/>

  return (
    <div className="grid gap-md  max-w-xl mx-auto">


      <section>
      <div className="flex justify-end ">
     
     <Link
       to="/jobseeker/profile/basic-info"
       className=" flex items-center gap-xs border-sm p-xs border-green-dark text-green-dark hover:text-green-light px-sm"
     >
     <FaRegEdit />  Edit
     </Link>
   </div>
      <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqZYAYrmuzw5vIhNRWG2f436EKH4LqTUAFhLDWd2yRNA&s"
          alt=""
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="grid gap-xs">
        <h2 className="font-semibold">{profile?.basic_information?.fullname || fullName}</h2>

          <p>Address : Kathmandu</p>
          <p>Phone : {profile?.basic_information?.phone_number || phoneNumber}</p>
          <p>Email : {email}</p>
          <p>Date of Birth : {profile?.basic_information?.date_of_birth || <span className="text-orange-dark">Not available</span>}</p>
        </div>
      </section>
      <section>
        <header className="font-semibold flex gap-xs items-center"><GiFlagObjective /> Objective</header>
        <p className="py-md">
         {profile?.job_preference?.summary || <span className="text-orange-dark">Not available</span>}
        </p>
      </section>
      <section className="grid gap-xs">
        <header className="font-semibold flex items-center gap-xs"><MdOutlineMapsHomeWork /> Work Experience</header>
      {profile?.experience ?  <div >
        <div>
          <p>React JS Developer</p>
          <p>ABC company</p>
          <p>Kathmandu</p>
        </div>
        <div className="py-md">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eius,
            a vel unde quos odio itaque. Consequatur amet optio ipsum veniam
            porro, deserunt, maxime excepturi libero obcaecati ab molestiae non.
          </p>
        </div>
      </div> : <span className="text-orange-dark ">Not available</span>}
      </section>
      <section className="grid gap-xs">
        <header className="font-semibold flex items-center gap-xs"><SlGraduation /> Education</header>
     {profile?.education ?    <div className="grid gap-xs">
          {profile.education.map(item => {
            return <div key={item.degree} className="grid gap-2">
              <p className="flex items-center gap-2"> <CiCalendar />{item.graduation_year}</p>
              <p className="flex items-center gap-2"><CiCircleCheck /> {item.degree}</p>
          <p className="flex items-center gap-2"><MdOutlineMapsHomeWork /> {item.institute_name}, {item.location}, {item.education_board}</p>
          {item?.marks?.gpa && <span><GrCertificate /> {item.marks.gpa} gpa</span>}
          {item?.marks?.percent && <span className="flex gap-2 items-center"><GrCertificate /> {item.marks.percent} percent</span>}
          
            </div>
          })}
        </div> :<span className="text-orange-dark">Not available</span> }
      </section>
      <section className="grid gap-xs">
        <header className="font-semibold ">Job Preference</header>
       {profile?.job_preference ? 
    <div className="grid gap-2">
          <p>Looking for : {profile?.job_preference?.job_level  }</p>
        <div className="flex gap-2">Job Categories : <div className="flex flex-wrap gap-xs">{profile.job_preference?.job_categories.map(cat =>{ return <span key={cat}>{cat}</span>})} </div></div>
        <p>Available for : {profile.job_preference?.available_for}</p>
        <p>Expected Salary : (Equals) NRs {profile.job_preference?.expected_salary}</p>
        <p>Job Preference Location : {profile.job_preference.job_location}</p> 
    </div>:  <span className="text-orange-dark">Not available</span>}
      </section>
      <section className="grid gap-xs">
        <header className="font-semibold ">Skills</header>
     <div className="grid gap-2">
     {profile?.job_preference?.skills.map(skill => {
        return <li key={skill}>{skill}</li>
       })}
     </div>
      </section>
    </div>
  );
};

export default Profile;
