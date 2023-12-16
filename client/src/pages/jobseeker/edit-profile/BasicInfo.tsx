import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import { IJobseekerBasicInfoInputs } from '../../../types/react/types'
import { JobseekerBasicInfoSchema } from '../../../utils/validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { IJobseekerProfile } from '../../../types/postgres/types'
import { useCurrentUser } from '../../../hooks/useCurrentUser'
import moment from 'moment'
import { ChangeEvent } from 'react';
import { updateBasicInfo } from '../actions/updateBasicInfo'

type BasicInfoProps = {
profile:IJobseekerProfile | undefined
}

const BasicInfo = ({profile}:BasicInfoProps) => {
  const[isEditorOpen, setIsEditorOpen] = useState(false)
  const[isLoading, setIsLoading] = useState(false)
  const[image, setImage] = useState<any>()
  const[imagePreview, setImagePreview] = useState<any>()
  const {fullName, phoneNumber} = useCurrentUser()
  const{register,handleSubmit, formState:{errors}, setValue} = useForm({resolver:yupResolver(JobseekerBasicInfoSchema)})
  
  useEffect(() => {
    if(!profile?.basic_information ){
      setValue('fullname', fullName!)
      setValue('phoneNumber', phoneNumber!)
    }
  },[fullName, phoneNumber])

  useEffect(() => {
  
  if(profile?.basic_information){
    let dateOfBirth:any = moment(profile.basic_information.date_of_birth).format("YYYY-MM-DD")
    let gender:any = profile.basic_information?.gender
setValue('fullname' , profile?.basic_information?.fullname)
setValue('currentAddress', profile.basic_information.current_address)
setValue('dateOfBirth', dateOfBirth)
setValue('gender',gender)
setValue('image', profile.basic_information?.image)
setValue('permanentAddress', profile.basic_information?.permanent_address)
setValue('phoneNumber', profile.basic_information?.phone_number)
  }
},[profile])

const onSubmit:SubmitHandler<IJobseekerBasicInfoInputs> = (data) => {
  let dataToBeSent = {...data, image}
updateBasicInfo(dataToBeSent, setIsLoading, setIsEditorOpen)
}

const handleImage = (e:ChangeEvent< HTMLInputElement>) => {
  if(e.target.files){
    let url = URL.createObjectURL(e.target.files[0])
 setImage(e.target.files[0])
    setImagePreview( url)
  }
}

  return (
    <div className='grid gap-sm '>
      <header className='text-green-dark flex justify-between  font-semibold'>
        Basic Information 
      {!isEditorOpen &&   <span className='border-sm border-green-dark px-sm flex items-center cursor-pointer gap-xs rounded-sm' onClick={() => setIsEditorOpen(true)}><FaEdit/> Edit</span>}
      </header>
     <form  className='grid gap-sm' onSubmit={handleSubmit(onSubmit)}>
     <section className='grid gap-sm'>
       <div className=''>
       <div className='grid sm:flex gap-xs items-center'>
          <span>Full Name </span> <input type="text" disabled={!isEditorOpen} placeholder='Full Name' {...register('fullname')}  className='outline-none p-xs border-sm'/>
        </div>
        <p className="text-orange-dark text-sm">{errors.fullname?.message}</p>
       </div>
      <div className=''>
      <div className='grid sm:flex gap-xs items-center'>
          <span>Profile Picture </span> <input type="file" disabled={!isEditorOpen} {...register('image')}  onChange={(e) => handleImage(e)}  placeholder='Upload image' className='outline-none p-xs border-sm'/>
        </div>
        {profile?.basic_information?.image || imagePreview &&  <img src={profile?.basic_information?.image || imagePreview} alt="" className='w-20 h-20 object-cover'/>}
       
      </div>
       <div>
       <div className='grid sm:flex gap-xs items-center'>
          <span>Current Address </span> <input type="text" disabled={!isEditorOpen} {...register('currentAddress')} placeholder='Current Address' className='outline-none p-xs border-sm'/>
        </div>
        <p className="text-orange-dark text-sm">{errors.currentAddress?.message}</p>
       </div>
      
       <div>
       <div className='grid gap-xs sm:flex items-center'>
          <span>Permanent Address</span>  <input type="text" disabled={!isEditorOpen} {...register('permanentAddress')} placeholder='Permanent Address' className='outline-none p-xs border-sm'/>
        </div>
        <p className="text-orange-dark text-sm">{errors.permanentAddress?.message}</p>
       </div>
        <div>
        <div className='grid sm:flex gap-xs items-center'>
          <span>Mobile No </span> <input type="number"  disabled={!isEditorOpen} {...register('phoneNumber')} placeholder='Phone no' className='outline-none p-xs border-sm'/>
        </div>
        <p className="text-orange-dark text-sm">{errors.phoneNumber?.message}</p>
        
        </div>
      <div>
      <div className='grid sm:flex gap-xs items-center'>
          <span>Gender </span> <select disabled={!isEditorOpen}  {...register('gender')}  className='outline-none p-xs border-sm'>
          <option value={undefined} >
        Select 
      </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">other</option>
          </select>
        </div>
        <p className="text-orange-dark text-sm">{errors.gender?.message}</p>
      </div>
       <div>
       <div className='grid sm:flex gap-xs items-center'>
          <span>Date of Birth</span> <input type="date" disabled={!isEditorOpen} {...register('dateOfBirth')} className='outline-none p-xs border-sm'/>
        </div>
        <p className="text-orange-dark text-sm">{errors.dateOfBirth?.message}</p>
       </div>
      </section>
    {isEditorOpen &&  <div className='flex  gap-xs'>
     <button className='bg-green-dark h-full disabled:opacity-50 text-white p-sm rounded-sm' disabled={isLoading}>Save</button>
     <button className='border-green-dark border-sm  text-green-dark p-sm rounded-sm' onClick={() => setIsEditorOpen(false)}>Cancel</button>
     </div>}
     </form>

    </div>
  )
}

export default BasicInfo