import { FaCalendar, FaHome, FaMoneyBill } from "react-icons/fa";
import { BiCategoryAlt, BiLocationPlus } from "react-icons/bi";
import MatchingJobsTable from "../../components/ui/MatchingJobsTable";
import { useEffect, useState } from "react";
import AppliedJobsTable from "../../components/ui/AppliedJobsTable";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useJobseekerProfile } from "./hooks/useJobseekerProfile";
import { Link } from "react-router-dom";
import Layout from "../../components/ui/Layout";
import NoUser from "../../components/shared/NoUser";
import useAuthStore from "../../store/auth";
import Error from "../../components/shared/Error";
import Categories from "../../components/shared/Categories";
import moment from "moment";
import { IJobseekerProfile } from "../../types/postgres/types";

type Profile = {
  profile : IJobseekerProfile
}

const Overview = () => {
  const [selected, setSelected] = useState("matchingJobs");
  const[progress, setProgress] = useState(0)
  const {fullName, role} = useCurrentUser()
const {profile}:Profile = useJobseekerProfile()
const{isAunthenticated} = useAuthStore()

useEffect(() => {
calculateProgress()
window.scrollTo(0,0)
},[profile])

function calculateProgress(){
  let val = 100/4
  let progress = 0
 if(profile?.basic_information){
  progress += val
 }
 if(profile?.education){
  progress += val
 }
 if(profile?.experience){
  progress += val
 }
 if(profile?.job_preference){
  progress += val
 }
 setProgress(progress)
}

if(!isAunthenticated) return <NoUser/>
if(role !== 'jobseeker') return <Error/>

  return (
    <Layout>
    <div className=" w-full grid gap-sm p-sm ">

    <div className="grid md:flex p-sm gap-sm ">
      <section className="grid w-full   gap-4   h-fit ">
        <div className="flex justify-between w-fit gap-xs">
          <img
            src={`${profile?.basic_information?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&usqp=CAU"}`}
            alt=""
            className="w-16 h-16 object-cover rounded-full"
          />
          <div>
            <h2 className="font-semibold">{profile?.basic_information?.fullname || fullName}</h2>
            <span>Profile Completeness : {progress}%</span>
            <span className="w-[150px] my-2 h-1 grid relative bg-gray-light">
              <span className={`absolute left-0 rounded-full h-full w-[${progress}%] bg-green-dark`}></span>
            </span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <FaHome />{" "}
          <div className="grid">
            Current Address <span className="font-semibold">{profile?.basic_information?.current_address || 'Not available'}</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <FaCalendar />{" "}
          <div className="grid">
            Age <span className="font-semibold">{moment(profile?.basic_information?.date_of_birth).format('MMM Do YYYY') || 'Not available'}</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <FaMoneyBill />{" "}
          <div className="grid">
            Expected Salary <span className="font-semibold">{profile?.job_preference?.expected_salary || 'Not available'} </span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <BiCategoryAlt />{" "}
          <div className="grid">
            Prefered Job Category <span className="font-semibold">{profile?.job_preference.category_names || 'Not available'} </span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <BiLocationPlus />{" "}
          <div className="grid">
            Prefered Job Location <span className="font-semibold">{profile?.job_preference?.job_location || 'Not available'}</span>
          </div>
        </div>
        <Link to='/jobseeker/profile/basic-info' className="rounded-sm text-green-dark border-sm border-green-dark hover:text-green-dark p-xs px-sm rousm  w-fit">Update profile</Link>
      </section>

      <section className="grid gap-10  w-full place-content-start  ">
        <div className="flex gap-4 w-full">
          <button
            className={` ${
              selected === "matchingJobs" && "text-green-dark border-green-dark "
            }  p-xs font-semibold  `}
            onClick={() => setSelected("matchingJobs")}
          >
            Matching Jobs
          </button>
          <button
            className={` ${
              selected === "appliedJobs" && "text-green-dark border-b-sm border-green-dark"
            } p-xs font-semibold  `}
            onClick={() => setSelected("appliedJobs")}
          >
            Applied Jobs
          </button>
        </div>
      
      <div className=" ">
      {selected === "matchingJobs" && <MatchingJobsTable profile={profile}  />}
        {selected === "appliedJobs" && <AppliedJobsTable />}
       
      </div>
      </section>
    </div>

    <div className="grid gap-xs max-w-sm sm:max-w-full ">
            <header className="font-semibold border-y-md w-fit border-gray-light  py-xs text-xl">
              Jobs By Category
            </header>
            <Categories/>
          </div>

         
    </div>
    </Layout>
  );
};

export default Overview;
