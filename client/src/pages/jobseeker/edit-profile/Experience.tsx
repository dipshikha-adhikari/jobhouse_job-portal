import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { IJobseekerProfile } from '../../../types/postgres/types';
import ExperienceForm from './ExperienceForm';

type ExperienceProps = {
  profile:IJobseekerProfile | undefined
  }

const Experience = ({profile}:ExperienceProps) => {
  const[isEditorOpen, setIsEditorOpen] = useState(false)
 

 
  return (
    <div className='grid gap-sm'>
        <header className='text-green-dark flex justify-between  font-semibold'>
        Basic Information 
      {!isEditorOpen &&   <span className='border-sm border-green-dark px-sm flex items-center cursor-pointer gap-xs rounded-sm' onClick={() => setIsEditorOpen(true)}><FaEdit/> Edit</span>}
      </header>
     <section>
      {profile?.experience ? profile?.experience.map(exp => {
        return <ExperienceForm setIsEditorOpen={setIsEditorOpen} isEditorOpen={isEditorOpen} experience={exp}/>
      }) : <ExperienceForm setIsEditorOpen={setIsEditorOpen} isEditorOpen={isEditorOpen} />}
     </section>
     
    </div>
  )
}

export default Experience