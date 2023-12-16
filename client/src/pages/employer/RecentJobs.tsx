import React from 'react'
import { useRecentJobs } from './hooks/useRecentJobs'
import JobCard from './JobCard';

type RecentJobsProps = {
  employerId: string | undefined;
  params?:any
}

const RecentJobs:React.FC<RecentJobsProps> = ({employerId, params}) => {
  const{jobs} = useRecentJobs(employerId)

  if(jobs?.length === 0 || jobs === undefined){
    return <div>No recent jobs available!</div>
  }

  return (
    <div className='grid gap-md grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'>{
      jobs?.map((job, ind) => {
        return <JobCard job={job} key={job.job_id} index={ind} params={params}/>
      })
      }</div>
  )
}

export default RecentJobs


