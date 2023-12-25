import { useEffect, useRef, useState } from "react";
import { JobseekerEducationSchema } from "../../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { IJobseekerEducationInputs } from "../../../types/react/types";
import { IJobseekerEducation} from "../../../types/postgres/types";
import { updateEducation } from "../actions/updateEducation";
import moment from 'moment';

type EducationProps = {
  profile?:IJobseekerEducation | undefined
  isEditorOpen:boolean
  setIsEditorOpen:(props:boolean) => void 
  }
const EducationForm = ({profile, isEditorOpen, setIsEditorOpen}:EducationProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef<HTMLDivElement>(null)
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({ resolver: yupResolver(JobseekerEducationSchema) });
  
  useEffect(() => {
if(profile){
  const dateString:string = moment(profile.graduation_year).format("YYYY-MM-DD")
  const date:Date = new Date(dateString)
  setValue('course', profile?.course)
  setValue('degree', profile?.degree)
  setValue('graduationYear', date)
  setValue('institute', profile?.institute_name)
  setValue('location', profile?.location)
  setValue('marksType', profile?.marks?.type)
  setValue('marksValue', profile?.marks?.value)
}
  },[profile])

    const onSubmit: SubmitHandler<IJobseekerEducationInputs> = (data) => {
    updateEducation(data, profile, setIsLoading, setIsEditorOpen)
    window.scrollTo({
      top:0,
      left:0,
    })
    };

  const handleCancel = () => {
    if(ref.current){
      window.scrollTo({
        top:0,
        left:0,
      })
    }
    setIsEditorOpen(false)
  }
    
  return (
    <div className="grid gap-sm py-md" ref={ref}>
      <header className="text-green-dark flex justify-between  font-semibold">
       Education
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="grid gap-sm">
          <div>
            <div className="grid sm:flex gap-xs items-center">
              <span>Degree</span>{" "}
              <input
                type="text"
                {...register("degree")}
                disabled={!isEditorOpen}
                placeholder="Bachelor, Masters or Higher Secondary"
                className="outline-none p-xs border-sm"
              />
            </div>
            <p className="text-red-600 text-sm">{isEditorOpen && errors.degree?.message}</p>
          </div>
          <div>
            <div className="grid sm:flex gap-xs items-center">
              <span>Course/Program</span>{" "}
              <input
                type="text"
                {...register("course")}
                disabled={!isEditorOpen}
                placeholder="Bachelor Of Science"
                className="outline-none p-xs border-sm"
              />
            </div>
            <p className="text-red-600 text-sm">{isEditorOpen && errors.course?.message}</p>
          </div>

          <div>
            <div className="grid sm:flex gap-xs items-center">
              <span>School / College / Institute</span>{" "}
              <input
                type="text"
                disabled={!isEditorOpen}
                {...register("institute")}
                placeholder="Your College/Institute Name"
                className="outline-none p-xs border-sm"
              />
            </div>
            <p className="text-red-600 text-sm">{isEditorOpen && errors.institute?.message}</p>
          </div>
          <div>
            <div className="grid sm:flex gap-xs items-center">
              <span>Graduation Year</span>{" "}
              <input
                type="date"
                {...register("graduationYear")}
                placeholder="2023"
                disabled={!isEditorOpen}
                className="outline-none p-xs border-sm"
              />
            </div>
            <p className="text-red-600 text-sm">
              {isEditorOpen && errors.graduationYear?.message}
            </p>
          </div>
            <div className="grid sm:flex gap-xs items-center">
              <span>Marks</span>{" "}
            <div className="flex gap-xs">
            <input type="text"  placeholder="Marks"  {...register('marksValue')}  disabled={!isEditorOpen} className="outline-none p-xs max-w-[100px] border-sm" />
              <select
                disabled={!isEditorOpen}
                className="outline-none border-sm p-xs"
                {...register("marksType")}
              >
                <option value='' >Select</option>
                <option value="gpa">GPA</option>
                <option value="percent">percentage</option>
              </select>
            </div>
            <p className="text-red-600 text-sm">  {isEditorOpen && (errors.marksValue?.message || errors.marksType?.message) }</p>

            </div>

          <div>
            <div className="grid sm:flex gap-xs items-center">
              <span>Location</span>{" "}
              <input
              disabled={!isEditorOpen}
                placeholder="kathmandu"
                {...register("location")}
                className="outline-none p-xs border-sm"
              />
            </div>
            <p className="text-red-600 text-sm">{isEditorOpen && errors.location?.message}</p>
          </div>
          {/* {isEditorOpen && ( */}
            <div className="flex  gap-xs items-center">
              <button
              type="submit"
                className="bg-green-dark h-full text-white p-sm rounded-sm disabled:opacity-50"
                disabled={isLoading}
              >
                Save
              </button>
              <button
              type="button"
                className="border-green-dark border-sm  text-green-dark p-sm rounded-sm"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          {/* )} */}
        </section>
      </form>
    </div>
  )
}

export default EducationForm