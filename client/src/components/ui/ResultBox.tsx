import moment from 'moment'
import { CiCalendar, CiLocationOn } from "react-icons/ci"
import { FaRegCalendarCheck } from 'react-icons/fa'
import { GiSkills } from 'react-icons/gi'
import { GoDotFill } from 'react-icons/go'
import { MdCastForEducation } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { IJob } from '../../types/postgres/types'

interface IResultBox{
    job:IJob,
    appliedJobs:string[]
}

const ResultBox = ({job, appliedJobs}:IResultBox) => {

  return (
    <Link to={`/jobs/${job.title}/${job.job_id}`} className='grid  max-w-md border-xs border-light font-normal  '>
    <div  className='flex p-sm gap-xs items-center text-black-dark hover:text-black-dark'>
   <img src={job?.employer_details?.image ? job.employer_details.image : "https://cdn-icons-png.flaticon.com/512/2399/2399888.png"} alt="" className="w-16 h-16 rounded-full object-cover" />
    <div>
   
      <p className='font-semibold'>{job.employer_details?.organization_name}</p>
      <p className='font-semibold flex items-center'><GoDotFill className='text-blue-dark' />  {job.title}</p>
  <p className='text-gray-dark flex items-center gap-xs'><CiLocationOn  fontSize='small'/> {job.location}</p>
<div className='py-sm'>
<p className='flex text-gray-dark items-center gap-2'><MdCastForEducation /> Education : {job.education_required} </p>
<p className='flex text-gray-dark items-center gap-2'><GiSkills  /> Experience : {job.experience_required} </p>
</div>
    </div>
  </div>
<div className=' border-sm p-sm'>
  <p className='text-gray-dark flex items-center gap-xs'>< CiCalendar fontSize='small'/> Expires in : {moment(job.deadline, 'YYYYMMDD').fromNow()}</p>
{ appliedJobs?.length > 0 && appliedJobs.includes(job.job_id) && <span className='flex items-center gap-2 text-gray-dark text-right float-right'><FaRegCalendarCheck  className='text-green-dark'/> </span> }

</div>
  </Link>
  )
}

export default ResultBox