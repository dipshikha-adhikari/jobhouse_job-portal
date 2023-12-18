import { yupResolver } from "@hookform/resolvers/yup";
import {  useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { IEmployerProfile } from "../../../types/postgres/types";
import { IEmployerOtherInformationInputs } from "../../../types/react/types";
import { updateOtherInformation } from "../actions/updateOtherInformation";

const Schema = Yup.object().shape({
  website: Yup.string().required(),
});

interface IOtherInformation {
  isEditorOpen: boolean;
  setIsEditorOpen: (props: any) => void;
  profile:IEmployerProfile | undefined
}

const OtherInformation = ({ isEditorOpen, setIsEditorOpen, profile }: IOtherInformation) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({ resolver: yupResolver(Schema) });


  useEffect(() => {
    if (profile?.other_information.website) {
      setValue("website", profile.other_information.website);
    }
  },[profile])

  const onSubmit: SubmitHandler<IEmployerOtherInformationInputs> = async (
    data
  ) => {
  
    await updateOtherInformation(data, profile, setIsLoading, setIsEditorOpen);
  };


  return (

    <div className="grid gap-sm">

    {!isEditorOpen && (
      <button
        className="p-xs px-sm bg-blue-dark h-fit rounded-sm text-white w-fit"
        onClick={() => setIsEditorOpen(true)}
      >
        Edit
      </button>
    )}
    <form onSubmit={handleSubmit(onSubmit)} className="w-full grid gap-sm">
     

      <div className="grid gap-xs ">
        <span className="">Website</span>{" "}
        <input
          {...register("website")}
          className="p-xs outline-none border-sm border-default "
          disabled={!isEditorOpen}
        />
        <p className="text-orange-dark">{errors.website?.message}</p>
      </div>
      {isEditorOpen && (
        <div className="flex gap-sm">
          <button type="submit" className="p-xs px-sm bg-blue-dark text-white disabled:opacity-50" disabled={isLoading}>
            Save
          </button>
          <button
            className="p-xs px-sm bg-orange-dark text-white"
            onClick={() => setIsEditorOpen(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
    </div>
  );
};

export default OtherInformation;

