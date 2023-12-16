import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmployerBasicInformationSchema } from "../../../utils/validationSchema";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import NoUser from "../../NoUser";
import useAuthStore from "../../../store/auth";
import { IEmployerBasicInformationInputs } from "../../../types/react/types";
import SelectIndustry from "../../../components/mui/SelectIndustry";
import { IEmployerProfile } from "../../../types/postgres/types";
import { useIndustries } from "../../../hooks/useIndustries";
import { updateBasicInformation } from "../actions/updateBasicInformation";

interface IEditProfileDetails {
  isEditorOpen: boolean;
  setIsEditorOpen: (props: any) => void;
  profile:IEmployerProfile | undefined
}

type Image = {
  coverImage: string;
  image: string;
};

const BasicInformation = ({
  isEditorOpen,
  setIsEditorOpen,
  profile
}: IEditProfileDetails) => {
  const [coverImagePreview, setCoverImagepreview] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [images, setImages] = useState<Image>({
    coverImage: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { isAunthenticated } = useAuthStore();
  const user = useCurrentUser();
  const {industries} = useIndustries()
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({ resolver: yupResolver(EmployerBasicInformationSchema) });

  useEffect(() => {
    if(user.fullName){
      setValue('organizationName', profile?.basic_information?.organization_name ? profile.basic_information.organization_name : user.fullName)
    }
    if(user.phoneNumber){
    setValue('phoneNumber', profile?.basic_information?.phone_number ?  profile?.basic_information.phone_number : user.phoneNumber )
    }

    if (profile?.basic_information) {
    setValue('address', profile.basic_information.address)
      setValue("summary", profile.basic_information.summary);
      setValue("industryType", profile.basic_information.industry_id);
    }
  }, [profile, user, isEditorOpen]);

  const onSubmit: SubmitHandler<IEmployerBasicInformationInputs> = async (
    data
  ) => {

    let dataToUpdate = {
      email:user.email,
      organization_name: data.organizationName,
      image: images.image,
      cover_image: images.coverImage,
      summary: data.summary,
      industry_type: data.industryType,
      phone_number:data.phoneNumber,
      address:data.address
  };


    await updateBasicInformation(
    profile,
      dataToUpdate,
      setIsLoading,
      setIsEditorOpen
    );
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files[0]) {
      if (type === "image") {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        setImages((prev: any) => ({
          ...prev,
          image: e.target.files && e.target.files[0],
        }));
      } else {
        setCoverImagepreview(URL.createObjectURL(e.target.files[0]));
        setImages((prev: any) => ({
          ...prev,
          coverImage: e.target.files && e.target.files[0],
        }));
      }
    }
  };

  if (!isAunthenticated) return <NoUser />;

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
    <form className="grid gap-3 " onSubmit={handleSubmit(onSubmit)}>
   
     <div className="grid gap-2">
        <span >Organization Name</span>{" "}
        <input
          type="text"
          {...register("organizationName")}
          className="p-xs outline-none border-sm border-default "
          disabled={!isEditorOpen}
        />
        <p className="text-orange-dark">{errors.organizationName?.message}</p>
      </div>
     <div className="grid gap-2">
        <span >Phone Number</span>{" "}
        <input
          type="number"

          {...register("phoneNumber")}
          className="p-xs outline-none border-sm border-default "
          disabled={!isEditorOpen}
        />
        <p className="text-orange-dark">{errors.phoneNumber?.message}</p>

      </div>
     <div className="grid gap-2">
        <span >Address</span>{" "}
        <input
          {...register("address")}
          className="p-xs outline-none border-sm border-default "
          disabled={!isEditorOpen}
        />
        <p className="text-orange-dark">{errors.address?.message}</p>

      </div>
      <div className="grid  gap-2 ">
        <label htmlFor=""> Cover Image</label>
        <input
          type="file"
          disabled={!isEditorOpen}
          onChange={(e) => handleImage(e, "coverImage")}
        />
        <img
          src={
            profile?.basic_information?.cover_image
              ? profile.basic_information.cover_image
              : coverImagePreview
              ? coverImagePreview
              : "https://template.canva.com/EAENvp21inc/1/0/1600w-qt_TMRJF4m0.jpg"
          }
          alt=""
          className="w-20 h-20"
        />
      </div>
      <div className="grid  gap-2 ">
        <label htmlFor="">Profile Image</label>
        <input
          type="file"
          disabled={!isEditorOpen}

          onChange={(e) => handleImage(e, "image")}
        />
        <img
          src={
            profile?.basic_information?.image
              ? profile.basic_information.image
              : imagePreview
              ? imagePreview
              : "https://media.istockphoto.com/id/1340893300/vector/technology-logo-design-template-networking-vector-logo-design.jpg?s=612x612&w=0&k=20&c=-8XBWFDRAAYe3leL4nuMnei0wWpL6-IqsPCAbWIhASk="
          }
          alt=""
          className="w-20 h-20"
        />
      </div>

      <div>
        <div className=" grid gap-2 items-center">
          <span className="">* Industry Type</span>
          <Controller
            name="industryType"
            control={control}
            render={({ field }) => (
              <SelectIndustry
                values={industries}
                field={field}
                isEditorOpen={isEditorOpen}
              />
            )}
          />
          
        </div>
        <p className="text-red-600 text-sm">{errors.industryType?.message}</p>
      </div>

      <div className="grid  gap-2 ">
        <label htmlFor="">
          <span className="text-orange-default text-xl">*</span> Summary
        </label>
        <textarea
          cols={40}
          rows={4}
          className="resize-none border-sm border-default outline-none p-xs"
          disabled={!isEditorOpen}
          {...register("summary")}
        ></textarea>
        <p className="text-orange-dark text-sm">{errors.summary?.message}</p>
      </div>

      {isEditorOpen && (
        <div className="flex gap-sm">
          <button
            type="submit"
            disabled={isLoading}
            className="p-xs px-sm disabled:opacity-50 bg-blue-dark text-white"
          >
            Save
          </button>
          <button
            className="p-xs px-sm bg-orange-default text-white"
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

export default BasicInformation;
