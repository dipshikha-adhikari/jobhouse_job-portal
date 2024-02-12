import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { IEmployerProfile } from "../../../../types/postgres/types";
import { IEmployerOtherInformationInputs } from "../../../../types/react/types";
import { updateOtherInformation } from "../api/updateOtherInformation";

const Schema = Yup.object().shape({
  website: Yup.string().required(),
});

interface IOtherInformation {
  isEditorOpen: boolean;
  setIsEditorOpen: (props: boolean) => void;
  profile: IEmployerProfile | undefined;
}

const OtherInformation = ({
  isEditorOpen,
  setIsEditorOpen,
  profile,
}: IOtherInformation) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },

    setValue,
  } = useForm({ resolver: yupResolver(Schema) });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (profile?.other_information.website) {
      setValue("website", profile.other_information.website);
    }
  }, [profile, isEditorOpen]);

  const onSubmit: SubmitHandler<IEmployerOtherInformationInputs> = async (
    data
  ) => {
    await updateOtherInformation(data, profile, setIsLoading, setIsEditorOpen);
  };

  return (
    <div className="grid gap-sm">
      {!isEditorOpen && (
        <button
          className="p-xs px-sm bg-blue-light h-fit rounded-sm text-white w-fit"
          onClick={() => setIsEditorOpen(true)}
        >
          Edit
        </button>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full grid gap-xs">
        <div className="grid gap-2 ">
          <span className="font-semibold">Website</span>{" "}
          <input
            {...register("website")}
            className="p-xs outline-none border-sm border-gray-light "
            disabled={!isEditorOpen}
          />
          <p className="text-orange-dark">{errors.website?.message}</p>
        </div>
        {isEditorOpen && (
          <div className="flex gap-sm">
            <button
              type="submit"
              className="p-xs px-sm bg-blue-dark rounded-sm text-white disabled:opacity-50"
              disabled={isLoading}
            >
              Save
            </button>
            <button
              className="p-xs px-sm bg-orange-light rounded-sm text-white"
              onClick={() => {
                setIsEditorOpen(false);
                clearErrors();
              }}
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
