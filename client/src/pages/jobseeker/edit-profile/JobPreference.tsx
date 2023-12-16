import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import { JobseekerJobPreferenceSchema } from '../../../utils/validationSchema'
import MultipleSelectCheckmarks from '../../../components/mui/MultipleSelect'
import { jobsCategory } from '../../../constants/jobsCategory'
import { industryCategories } from '../../../constants/industryCategories'
import TagsInputBox from '../../../components/ui/TagsInputBox'
import { IJobseekerJobPreferenceInputs } from '../../../types/react/types'
import { updateJobPrefetence } from '../actions/updateJobPreference'



const JobPreference = ({profile}:any) => {
  const[isEditorOpen, setIsEditorOpen] = useState(false)
const textRef = useRef<HTMLTextAreaElement>(null)
const[jobCategories, setJobCategories] = useState<string[]>([])
const[jobIndustries, setJobIndustries] = useState<string[]>([])
const[summary, setSummary] = useState('')
const[isLoading, setIsLoading] = useState(false)
const{register,handleSubmit, formState:{errors}, setValue, control} = useForm({resolver:yupResolver(JobseekerJobPreferenceSchema)})


useEffect(() => {
if(profile?.job_preference){
  setJobCategories(profile.job_preference.job_categories)
  setJobIndustries(profile.job_preference.job_industries)
  setSummary( profile.job_preference.summary)
  setValue('jobCategories', profile.job_preference.job_categories)
  setValue('jobIndustries', profile.job_preference.job_industries)
  setValue('availableFor',profile.job_preference.available_for)
  setValue('jobLevel', profile.job_preference.job_level)
  setValue('expectedSalary', profile.job_preference.expected_salary)
  setValue('jobLocation', profile.job_preference.job_location)
  setValue('jobTitle', profile.job_preference.job_title)
  setValue('objective', profile.job_preference.summary )
  setValue('skills', profile.job_preference.skills)
}
},[profile])
 
function autoGrow(){
    if(textRef.current){
      setSummary(textRef.current.value)
      textRef.current.style.height = '100px'
      textRef.current.style.height = (textRef.current.scrollHeight ) + 'px'
    }
  }

const submitJobPreference:SubmitHandler<IJobseekerJobPreferenceInputs> = (data) => {
data['objective'] = summary
updateJobPrefetence(data, setIsLoading, setIsEditorOpen)
}

  return (
    <div className='grid gap-sm '>
      <header className='text-green-dark flex justify-between  font-semibold'>
        Basic Information 
      {!isEditorOpen &&   <span className='border-sm  px-sm flex items-center cursor-pointer gap-xs rounded-sm' onClick={() => setIsEditorOpen(true)}><FaEdit/> Edit</span>}
      </header>
    <form className='grid gap-sm ' onSubmit={handleSubmit(submitJobPreference)}>
    <section className='grid gap-sm'>
        <div>
        <div className='grid gap-xs sm:flex '>
          <span >Objective</span> <div className='flex-1'> <textarea placeholder=' your objective' disabled={!isEditorOpen} {...register('objective')}  value={summary}    ref={textRef}  onInput={autoGrow}  className={`border-sm w-full  outline-none p-sm resize-none `}></textarea></div>
        </div>
        <p className='text-orange-dark'>{errors.objective?.message}</p>
        </div>
       <div>
       <div className='grid gap-xs w-fit sm:flex items-center'>
          <span >Preferred Job Title </span> 
          <input type="text" disabled={!isEditorOpen}  placeholder='Developer' {...register('jobTitle')} className='outline-none border-sm  px-sm p-xs  '/>
        </div>
        <p className='text-orange-dark'>{errors.jobTitle?.message}</p>
       </div>
       <div>
       <div className='grid gap-xs w-fit sm:flex items-center'>
          <span >Preferred Job Categories </span> 
         <Controller
         name='jobCategories'
         control={control}
         disabled={!isEditorOpen} 
         render={({field:{onChange}}) => {
          return <MultipleSelectCheckmarks isEditorOpen={isEditorOpen} value={jobCategories} onChange={onChange} values={jobsCategory} setState={setJobCategories}/>
         }}
         />
        </div>
        <p className='text-orange-dark'>{errors.jobCategories?.message}</p>
       </div>
     <div>
     <div className='grid gap-xs w-fit sm:flex items-center'>
          <span >Preferred Job Industries </span> 
          <Controller
         name='jobIndustries'
         control={control}
         render={({field:{onChange}}) => {
          
          return <MultipleSelectCheckmarks isEditorOpen={isEditorOpen} value={jobIndustries} onChange={onChange} values={industryCategories}  setState={setJobIndustries}/>
         }}
         />
        </div> 
        <p className='text-orange-dark'>{errors.jobIndustries?.message}</p>
     </div>
      <div>
      <div className='grid gap-xs  sm:flex '>
          <span >Skills </span> 
         <Controller
         name='skills'
         control={control}
         render={({field:{onChange}}) => {
          return <TagsInputBox isEditorOpen={isEditorOpen} values={profile?.job_preference?.skills} onChange={onChange}/>
         }}
         />
        </div>
        <p className='text-orange-dark'>{errors.skills?.message}</p>
      </div>


        <div>
        <div className='grid gap-xs w-fit sm:flex items-center'>
          <span >Available for </span> 
          <input type="text" disabled={!isEditorOpen} placeholder='Full Time'  {...register('availableFor')} className='outline-none border-sm px-sm p-xs '/>
        </div>
        <p className='text-orange-dark'>{errors.availableFor?.message}</p>

        </div>
       <div>
       <div className='grid gap-xs w-fit sm:flex items-center'>
          <span >Looking For </span> 
          <input type="text" disabled={!isEditorOpen} placeholder='Mid'  {...register('jobLevel')} className='outline-none border-sm px-sm p-xs '/>
        </div>
        <p className='text-orange-dark'>{errors.jobLevel?.message}</p>

       </div>
       <div>
       <div className='grid gap-xs w-fit sm:flex items-center'>
          <span >Preferred Job Location </span> 
          <input type="text" disabled={!isEditorOpen} placeholder='Kathmandu'  {...register('jobLocation')} className='outline-none border-sm px-sm p-xs '/>
        </div>
        <p className='text-orange-dark'>{errors.jobLocation?.message}</p>

       </div>
      <div>
      <div className='grid gap-xs w-fit sm:flex items-center'>
          <span >Expected salary</span> 
          <input type="text" disabled={!isEditorOpen} placeholder='40000'  {...register('expectedSalary')} className='outline-none border-sm px-sm p-xs '/>
        </div>
        <p className='text-orange-dark'>{errors.expectedSalary?.message}</p>

      </div>
        {isEditorOpen &&  <div className='flex  gap-xs'>
     <button className='bg-green-dark h-full text-white p-sm rounded-sm disabled:opacity-50' disabled={isLoading}>Save</button>
     <button className=' border-sm  text-green-dark p-sm rounded-sm' onClick={() => setIsEditorOpen(false)}>Cancel</button>
     </div>}
      </section>
    </form>
    </div>
  )
}

export default JobPreference