import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IJobseekerEducation } from "../../../types/postgres/types";
import { JobseekerEducationSchema } from "../../../utils/validationSchema";
import { IJobseekerEducationInputs } from "../../../types/react/types";
import { updateEducation } from "../api/updateEducation";
import ResponsiveDatePicker from "../../../components/mui/DatePicker";

type EducationProps = {
  profile?: IJobseekerEducation | undefined;
  isEditorOpen: boolean;
  setIsEditorOpen: (props: boolean) => void;
};
const EducationForm = ({
  profile,
  isEditorOpen,
  setIsEditorOpen,
}: EducationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(JobseekerEducationSchema) });

  useEffect(() => {
    if (profile) {
      setValue("course", profile?.course);
      setValue("degree", profile?.degree);
      setValue("graduationYear", new Date(profile?.graduation_year));
      setValue("institute", profile?.institute_name);
      setValue("location", profile?.location);
      setValue("marksType", profile?.marks?.type);
      setValue("marksValue", profile?.marks?.value);
    }
  }, [profile]);

  const onSubmit: SubmitHandler<IJobseekerEducationInputs> = (data) => {
    updateEducation(data, profile, setIsLoading, setIsEditorOpen);
  };
  console.log(profile);
  const handleCancel = () => {
    if (ref.current) {
      window.scrollTo({
        top: 0,
        left: 0,
      });
    }
    setIsEditorOpen(false);
  };

  return (
    <div className="grid gap-sm py-md" ref={ref}>
      <header className="text-green-dark flex justify-between  font-semibold">
        Education
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="grid gap-xs">
          <div>
            <div className="grid sm:flex gap-2 items-center">
              <span className="font-semibold ">Degree</span>{" "}
              <input
                type="text"
                {...register("degree")}
                disabled={!isEditorOpen}
                placeholder="Bachelor, Masters or Higher Secondary"
                className="outline-none p-xs border-sm border-gray-light"
              />
            </div>
            <p className="text-red-600 text-sm">
              {isEditorOpen && errors.degree?.message}
            </p>
          </div>
          <div>
            <div className="grid sm:flex gap-2 items-center">
              <span className="font-semibold ">Course/Program</span>{" "}
              <input
                type="text"
                {...register("course")}
                disabled={!isEditorOpen}
                placeholder="Bachelor Of Science"
                className="outline-none p-xs border-sm border-gray-light"
              />
            </div>
            <p className="text-red-600 text-sm">
              {isEditorOpen && errors.course?.message}
            </p>
          </div>

          <div>
            <div className="grid sm:flex gap-2 items-center">
              <span className="font-semibold ">
                School / College / Institute
              </span>{" "}
              <input
                type="text"
                disabled={!isEditorOpen}
                {...register("institute")}
                placeholder="Your College/Institute Name"
                className="outline-none p-xs border-sm border-gray-light"
              />
            </div>
            <p className="text-red-600 text-sm">
              {isEditorOpen && errors.institute?.message}
            </p>
          </div>
          <div>
            <div className="grid sm:flex gap-2 w-[200px] xs:w-60 sm:w-full items-center">
              <span className="font-semibold ">Graduation Year</span>{" "}
              <Controller
                control={control}
                name="graduationYear"
                render={({ field }) => {
                  return (
                    <ResponsiveDatePicker
                      isEditorOpen={isEditorOpen}
                      field={field}
                    />
                  );
                }}
              />
            </div>
            <p className="text-red-600 text-sm">
              {isEditorOpen && errors.graduationYear?.message}
            </p>
          </div>
          <div className="grid sm:flex gap-2 items-center">
            <span className="font-semibold ">Marks</span>{" "}
            <div className="flex gap-xs">
              <input
                type="text"
                placeholder="Marks"
                {...register("marksValue")}
                disabled={!isEditorOpen}
                className="outline-none p-xs w-20 sm:w-40 border-sm border-gray-light"
              />
              <select
                disabled={!isEditorOpen}
                className="outline-none border-sm border-gray-light w-20 sm:w-40  p-xs"
                {...register("marksType")}
              >
                <option value="">Select</option>
                <option value="gpa">GPA</option>
                <option value="percent">percentage</option>
              </select>
            </div>
            <p className="text-red-600 text-sm">
              {" "}
              {isEditorOpen &&
                (errors.marksValue?.message || errors.marksType?.message)}
            </p>
          </div>

          <div>
            <div className="grid sm:flex gap-2 items-center">
              <span className="font-semibold ">Location</span>{" "}
              <input
                disabled={!isEditorOpen}
                placeholder="kathmandu"
                {...register("location")}
                className="outline-none p-xs border-gray-light border-sm"
              />
            </div>
            <p className="text-red-600 text-sm">
              {isEditorOpen && errors.location?.message}
            </p>
          </div>
          <div className="flex  gap-xs items-center">
            <button
              type="submit"
              className="bg-green-dark h-full text-white px-sm rounded-sm p-xs disabled:opacity-50"
              disabled={isLoading}
            >
              Save
            </button>
            <button
              type="button"
              className="bg-orange-dark  text-white px-sm p-xs rounded-sm"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
          {/* )} */}
        </section>
      </form>
    </div>
  );
};

export default EducationForm;
