import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useJobseekerProfile } from "./hooks/useJobseekerProfile";
import useAuthStore from "../../store/auth";
import NoUser from "../../components/shared/NoUser";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import {SlGraduation} from 'react-icons/sl'
import {  MdOutlineMapsHomeWork } from "react-icons/md";
import {GiFlagObjective} from 'react-icons/gi'
import { CiCalendar, CiCircleCheck } from "react-icons/ci";
import {GrCertificate} from  'react-icons/gr'
import Error from "../../components/shared/Error";
import { IJobseekerEducation, IJobseekerProfile } from "../../types/postgres/types";
import moment from "moment";

type Profile = {
  profile:IJobseekerProfile
}

const Profile = () => {
const {profile}:Profile = useJobseekerProfile()
const{fullName, phoneNumber, email, role} = useCurrentUser()
const{isAunthenticated} = useAuthStore()

if(!isAunthenticated) return <NoUser/>
if(role !== 'jobseeker') return <Error/>

  return (
<div className="sm:px-xl max-w-5xl w-full mx-auto">

<div className="flex justify-end  ">
     
     <Link
       to="/jobseeker/profile/basic-info"
       className=" flex items-center gap-xs border-sm p-xs border-green-dark text-green-dark hover:text-green-light px-sm"
     >
     <FaRegEdit />  Edit
     </Link>
   </div>
     <div className="grid  gap-md md:flex  ">
 
 
     <aside className="grid gap-sm flex-1">
     <section>
     
       <img
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqZYAYrmuzw5vIhNRWG2f436EKH4LqTUAFhLDWd2yRNA&s"
           alt=""
           className="w-20 h-20 rounded-full object-cover"
         />
         <div className="grid gap-xs">
         <h2 className="font-semibold">{profile?.basic_information?.fullname || fullName}</h2>
 <p>Current Address : {profile.basic_information.current_address}</p>
 <p>Permanent Address : {profile.basic_information.permanent_address}</p>
           <p>Address : Kathmandu</p>
           <p>Phone : {profile?.basic_information?.phone_number || phoneNumber}</p>
           <p>Email : {email}</p>
           <p>Date of Birth : {profile?.basic_information?.date_of_birth || <span className="text-orange-dark">Not available</span>}</p>
         </div>
       </section>
 
       <section>
         <header className="font-semibold w-fit border-b-sm border-green-light text-green-dark uppercase text-xl flex gap-xs items-center"><GiFlagObjective /> Objective</header>
         <p className="py-md">
          {profile?.job_preference?.summary || <span className="text-orange-dark">Not available</span>}
         </p>
       </section>
       <section className="grid gap-xs">
         <header className="font-semibold flex items-center gap-xs"><MdOutlineMapsHomeWork /> Work Experience</header>
       {profile?.experience ?  <div className="grid gap-xs">
         {profile.experience.map(exp => {
           return <div className=" h-fit  " >
           <div>
             <p><span className="font-semibold">{exp.job_title}</span> ({exp.job_level})</p>
             <p>{exp.organization_name} ({exp.organization_type})</p>
             <p>{exp.job_location}</p>
             <p className="text-black-light italic">{moment(exp.start_date).format("MMM Do YYYY")} - {moment(exp.end_date).format("MMM Do YYYY")}</p>
           </div>
           <div className="py-sm ">
             <h2 className="font-semibold text-green-dark">Duties and responsibilities</h2>
             <div className="pl-2  prose prose-li:marker:text-black-default" dangerouslySetInnerHTML={{__html:exp.duties}}>
             </div>
           </div>
         </div>
         })}
       </div> : <span className="text-orange-dark ">Not available</span>}
       </section>
     </aside>
     <div className="min-h-full border-l-lg    bg-green-dark"></div>
     <aside className="grid gap-sm h-fit flex-1">
     <section className="grid gap-xs">
         <header className='font-semibold  border-b-sm border-green-light w-fit text-green-dark uppercase text-xl flex items-center gap-xs'><SlGraduation /> Education</header>
      {profile?.education ?    <div className="grid gap-xs">
           {profile.education.map((item:IJobseekerEducation) => {
             return <div key={item.degree} className="grid border-l-sm p-sm md:border-none border-gray-light gap-2">
               <p className="flex items-center gap-2"> <CiCalendar />{moment(item.graduation_year).format('YYYY-MM-DD')}</p>
               <p className="flex items-center font-semibold gap-2"><CiCircleCheck /> {item.degree}</p>
           <p className="flex items-center gap-2"><MdOutlineMapsHomeWork /> {item.institute_name}, {item.location}, {item.education_board}</p>
       <span className="flex items-center font-semibold gap-2"><GrCertificate /> Marks : {item.marks.value} {item.marks.type}</span>
           
             </div>
           })}
         </div> :<span className="text-orange-dark">Not available</span> }
       </section>
       <section className="grid gap-xs">
         <header className="font-semibold  border-b-sm border-green-light w-fit text-green-dark uppercase text-xl ">Job Preference</header>
        {profile?.job_preference ? 
     <div className="grid gap-2">
           <p>Looking for : {profile?.job_preference?.job_level  }</p>
         <div className="flex gap-2">Job Categories : <div className="flex flex-wrap gap-xs">{profile.job_preference?.category_names.map((cat:any) =>{ return <span key={cat}>{cat}</span>})} </div></div>
         <p>Available for : {profile.job_preference?.available_for}</p>
         <p>Expected Salary : (Equals) NRs {profile.job_preference?.expected_salary}</p>
         <p>Preferred Location : {profile.job_preference.job_location}</p> 
     </div>:  <span className="text-orange-dark">Not available</span>}
       </section>
       <section className="grid gap-xs">
         <header className="font-semibold  border-b-sm border-green-light w-fit text-green-dark uppercase text-xl ">Skills</header>
      <div className="grid gap-2">
      {profile?.job_preference?.skills.map((skill:any) => {
         return <li key={skill}>{skill}</li>
        })}
      </div>
       </section>
     </aside>
     </div>
</div>
  );
};

export default Profile;
