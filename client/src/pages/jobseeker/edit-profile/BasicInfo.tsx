import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import { IJobseekerBasicInfoInputs } from '../../../types/react/types'
import { JobseekerBasicInfoSchema } from '../../../utils/validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { IJobseekerBasicInformation } from '../../../types/postgres/types';
import { useCurrentUser } from '../../../hooks/useCurrentUser'
import moment from 'moment'
import { ChangeEvent } from 'react';
import { updateBasicInfo } from '../actions/updateBasicInfo'
import { useJobseekerProfile } from '../hooks/useJobseekerProfile'

type BasicInfo = {
  profile:IJobseekerBasicInformation,
  isLoading:boolean,
  isError:boolean
}

const BasicInfo = () => {
  const[isEditorOpen, setIsEditorOpen] = useState(false)
  const[isLoading, setIsLoading] = useState(false)
  const[image, setImage] = useState<any>(null)
  const[imagePreview, setImagePreview] = useState<any>()
  const {fullName, phoneNumber} = useCurrentUser()
  const{register,handleSubmit, formState:{errors}, setValue} = useForm({resolver:yupResolver(JobseekerBasicInfoSchema)})
  const {profile:basicInfo}:BasicInfo = useJobseekerProfile('basicInformation')

  useEffect(() => {
    if(!basicInfo ){
      setValue('fullname', fullName!)
      setValue('phoneNumber', phoneNumber!)
    }
  },[fullName, phoneNumber])

  useEffect(() => {
  
  if(basicInfo ){
    let dateOfBirth:any = moment(basicInfo?.date_of_birth).format("YYYY-MM-DD")
    let gender:any = basicInfo?.gender 

    setImagePreview(basicInfo?.image.url)

 if(basicInfo?.image.url){
  //image is not handled by react-hook-form
  setImage(() => ({url:basicInfo.image.url, public_id:basicInfo?.image?.public_id}))
 }
setValue('fullname' , basicInfo?.fullname)
setValue('currentAddress', basicInfo?.current_address)
setValue('dateOfBirth', dateOfBirth)
setValue('gender',gender)
setValue('permanentAddress', basicInfo?.permanent_address)
setValue('phoneNumber', basicInfo?.phone_number)
  }
},[basicInfo])

const onSubmit:SubmitHandler<IJobseekerBasicInfoInputs> = (data) => {
  let dataToBeSent = {...data, image}
  updateBasicInfo(dataToBeSent, setIsLoading, setIsEditorOpen, basicInfo)

}

const handleImage = (e:ChangeEvent< HTMLInputElement>) => {
  if(e.target.files){
    let url = URL.createObjectURL(e.target.files[0])
    let image = e.target.files[0]
 const reader = new FileReader()
 if(image){
  reader.readAsDataURL(image)
  reader.onloadend = () => {
    let imageSrc = reader.result
setImage(imageSrc)
  }
 }
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
          <span>Profile Picture </span> <input type="file"  disabled={!isEditorOpen} onChange={(e) => handleImage(e)}  placeholder='Upload image' className='outline-none p-xs border-sm'/>
        </div>
        {imagePreview && <img src={imagePreview} className='w-20 h-20'/>}
       
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
     <button className='border-green-dark border-sm  text-green-dark p-sm rounded-sm' onClick={() => {
      setIsEditorOpen(false)
      setIsLoading(false)
     }}>Cancel</button>
     </div>}
     </form>

    </div>
  )
}

export default BasicInfo