import {GoDotFill} from 'react-icons/go'
import { Link } from 'react-router-dom'
import { IJob } from '../../types/postgres/types'
import moment from 'moment'
import { MdOutlineWorkOutline } from 'react-icons/md'
import { FaMoneyCheckAlt, FaRegCalendarCheck } from 'react-icons/fa'
import { CiCalendar, CiLocationOn } from "react-icons/ci"

interface IJobCard{
    job:IJob,
    appliedJobs:string[]
}

const JobCard = ({job, appliedJobs}:IJobCard) => {

  return (
    <Link to={`/jobs/${job.title}/${job.job_id}`} className='grid gap-xs shadow-sm font-normal p-xs rounded-md'>
    <div  className='flex gap-xs items-center text-black-dark hover:text-black-dark'>
   <img src={job?.employer_details?.image ? job.employer_details.image : "https://cdn-icons-png.flaticon.com/512/2399/2399888.png"} alt="" className="w-16 h-16 rounded-full object-cover" />
    <div>
   
      <p className='font-semibold'>{job.employer_details?.organization_name}</p>
      <p className='font-semibold flex items-center'><GoDotFill className='text-blue-dark' />  {job.title}</p>
    </div>
  </div>
<div className=' p-xs rounded-md'>
<p className='text-gray-dark flex items-center gap-xs'><FaMoneyCheckAlt fontSize='small' />  Salary : {job.salary}</p>
  <p className='text-gray-dark flex items-center gap-xs'> <MdOutlineWorkOutline fontSize='small' /> Experience : {job.experience_required}</p>
  <p className='text-gray-dark flex items-center gap-xs'>< CiCalendar fontSize='small'/> Deadline : {moment(job.deadline).fromNow()}</p>
  <p className='text-gray-dark flex items-center gap-xs'><CiLocationOn  fontSize='small'/> Location : {job.location}</p>
{appliedJobs.includes(job.job_id) && <span className='flex items-center gap-2 text-gray-dark text-right float-right'><FaRegCalendarCheck  className='text-green-dark'/> </span> }

</div>
  </Link>
  )
}

export default JobCard