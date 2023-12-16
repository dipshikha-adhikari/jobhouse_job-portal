import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { JobseekerEducationSchema } from "../../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { IJobseekerEducationInputs } from "../../../types/react/types";
import { IJobseekerProfile } from "../../../types/postgres/types";
import { updateEducation } from "../actions/updateEducation";

type EducationProps = {
  profile:IJobseekerProfile | undefined
  }

const Education = ({profile}:EducationProps) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(JobseekerEducationSchema) });

 

  const onSubmit: SubmitHandler<IJobseekerEducationInputs> = (data) => {
  updateEducation(data, setIsLoading, setIsEditorOpen)
  };


  return (
    <div className="grid gap-sm">
      <header className="text-green-dark flex justify-between  font-semibold">
        Basic Information
        {!isEditorOpen && (
          <span
            className="border-sm border-green-dark px-sm flex items-center cursor-pointer gap-xs rounded-sm"
            onClick={() => setIsEditorOpen(true)}
          >
            <FaEdit /> Edit
          </span>
        )}
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
                <option value="">Select</option>
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
          {isEditorOpen && (
            <div className="flex  gap-xs items-center">
              <button
                className="bg-green-dark h-full text-white p-sm rounded-sm disabled:opacity-50"
                disabled={isLoading}
              >
                Save
              </button>
              <button
                className="border-green-dark border-sm  text-green-dark p-sm rounded-sm"
                onClick={() => setIsEditorOpen(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </section>
      </form>
    </div>
  );
};

export default Education;
