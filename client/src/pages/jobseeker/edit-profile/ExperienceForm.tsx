import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { JobseekerExperienceSchema } from '../../../utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { IJobseekerExperienceInputs } from '../../../types/react/types';
import { industryCategories } from '../../../constants/industryCategories';
import Editor from '../../../components/ui/Editor'
import { IJobseekerExperience } from '../../../types/postgres/types';

type ExperienceFormProps = {
    isEditorOpen:boolean,
    setIsEditorOpen:(props:any) => void 
    experience?:IJobseekerExperience
}

const ExperienceForm = ({isEditorOpen, setIsEditorOpen, experience}:ExperienceFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const {
      register,
      handleSubmit,
      setError,
      control,
      formState: { errors },
    } = useForm({ resolver: yupResolver(JobseekerExperienceSchema) });
  
    

    const onSubmit: SubmitHandler<IJobseekerExperienceInputs> = (data) => {
        console.log(data);
      };
    

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
     <section className='grid gap-sm' >
        <div>
        <div className='grid sm:flex gap-xs items-center'>
          <span>Organization Name </span> <input type="text" {...register('organizationName')} placeholder='ABC company' className='outline-none p-xs border-sm'/>
        </div>
        <p className="text-red-600 text-sm">{isEditorOpen && errors.organizationName?.message}</p>
        </div>
       <div>
       <div className='grid sm:flex gap-xs items-center'>
          <span>Nature of Organization </span> <select {...register('organizationType')} className='outline-none p-xs border-sm'>
            <option value="">Select</option>
            {industryCategories.map(cat => {
              return <option value={cat} key={cat}>{cat}</option>
            })}
          </select>
        </div>
        <p className="text-red-600 text-sm">{isEditorOpen && errors.organizationType?.message}</p>
       </div>
      <div>
      <div className='grid sm:flex gap-xs items-center'>
          <span>Job Location </span> <input type="text" {...register('jobLocation')}  placeholder='Kathmandu, Nepal' className='outline-none p-xs border-sm'/>
        </div>
        <p className="text-red-600 text-sm">{isEditorOpen && errors.jobLocation?.message}</p>
      </div>
      <div>
      <div className='grid sm:flex gap-xs items-center'>
          <span>Job Title </span> <input type="text" {...register('jobTitle')} placeholder='Developer' className='outline-none p-xs border-sm'/>
        </div>
        <p className="text-red-600 text-sm">{isEditorOpen && errors.jobTitle?.message}</p>
      </div>
      <div>
      <div className='grid sm:flex gap-xs items-center'>
          <span>Job Category </span> <select {...register('jobCategory')} className='outline-none p-xs border-sm'>
            <option value="">Information/Computer</option>
          </select>
        </div>
        <p className="text-red-600 text-sm">{isEditorOpen && errors.jobCategory?.message}</p>
      </div>
       <div>
       <div className='grid sm:flex gap-xs items-center'>
          <span>Job Level</span> <select {...register('jobLevel')}  className='outline-none p-xs border-sm'>
            <option value="entry">Entry Level</option>
            <option value="intermediate">Intermediate Level</option>
            <option value="senior"> Senior Level</option>
            <option value="top">Top Level</option>
          </select>
        </div>
        <p className="text-red-600 text-sm">{isEditorOpen && errors.jobLevel?.message}</p>
       </div>
       <div>
       <div className='grid sm:flex gap-xs items-center'>
          <span>Start Date</span> <input type="date" {...register('startDate')} className='outline-none p-xs border-sm'/>
        </div>
        <p className="text-red-600 text-sm">{isEditorOpen && errors.startDate?.message}</p>
       </div>
       <div>
       <div className='grid sm:flex gap-xs items-center'>
          <span>End Date</span> <input type="date" {...register('endDate')} className='outline-none p-xs border-sm'/>
        </div>
        <p className="text-red-600 text-sm">{isEditorOpen && errors.endDate?.message}</p>
       </div>
       <div>
       <div className='grid sm:flex gap-xs '>
          <span>Duties & Responsibilities</span>
          <Controller
          name='duties'
          control={control}
          render={({field:{onChange}}) => (
            <Editor onChange={onChange} initialValue={experience?.duties} />
          )}
          />
        </div>
        <p className="text-red-600 text-sm">{isEditorOpen && errors.duties?.message}</p>
       </div>
        {isEditorOpen &&  <div className='flex  gap-xs'>
     <button className='bg-green-dark h-full text-white p-sm rounded-sm'>Save</button>
     <button className='border-green-dark border-sm  text-green-dark p-sm rounded-sm' onClick={() => setIsEditorOpen(false)}>Cancel</button>
     </div>}
      </section>
     </form>
  )
}

export default ExperienceForm