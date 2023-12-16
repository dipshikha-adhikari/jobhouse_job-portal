import {GoDotFill} from 'react-icons/go'
import { Link } from 'react-router-dom'
import { IJob } from '../../types/postgres/types'
import moment from 'moment'
import { MdOutlineWorkOutline } from 'react-icons/md'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import { CiCalendar, CiLocationOn } from "react-icons/ci"

interface IJobCard{
    job:IJob
}

const JobCard = ({job}:IJobCard) => {
  return (
    <div className='grid gap-xs border-sm p-xs rounded-md'>
    <Link to={`/jobs/${job.title}/${job.job_id}`} key={job.job_id} className='flex gap-xs items-center text-black-dark hover:text-black-dark'>
   <img src={job?.employer_details?.image ? job.employer_details.image : "https://cdn-icons-png.flaticon.com/512/2399/2399888.png"} alt="" className="w-16 h-16 rounded-full object-cover" />
    <div>
   
      <p className='font-semibold'>{job.employer_details?.organization_name}</p>
      <p className='font-semibold flex items-center'><GoDotFill className='text-blue-dark' />  {job.title}</p>
    </div>
  </Link>
<div className='border-t-sm  border-default p-xs rounded-md'>
<p className='text-gray-dark flex items-center gap-xs'><FaMoneyCheckAlt fontSize='small' />  Salary : {job.salary}</p>
  <p className='text-gray-dark flex items-center gap-xs'> <MdOutlineWorkOutline fontSize='small' /> Experience : {job.experience_required}</p>
  <p className='text-gray-dark flex items-center gap-xs'>< CiCalendar fontSize='small'/> Deadline : {moment(job.deadline).fromNow()}</p>
  <p className='text-gray-dark flex items-center gap-xs'><CiLocationOn  fontSize='small'/> Location : {job.location}</p>
</div>
  </div>
  )
}

export default JobCard