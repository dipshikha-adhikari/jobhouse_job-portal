import { ChangeEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmployerBasicInformationSchema } from "../../../utils/validationSchema";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import NoUser from "../../../components/shared/NoUser";
import useAuthStore from "../../../store/auth";
import { IEmployerBasicInformationInputs } from "../../../types/react/types";
import { IEmployerProfile } from "../../../types/postgres/types";
import { useIndustries } from "../../../hooks/useIndustries";
import { updateBasicInformation } from "../actions/updateBasicInformation";
import SelectCategory from "../../../components/mui/SelectCategory";

interface IEditProfileDetails {
  isEditorOpen: boolean;
  setIsEditorOpen: (props: boolean) => void;
  profile: IEmployerProfile | undefined;
}

const BasicInformation = ({
  isEditorOpen,
  setIsEditorOpen,
  profile,
}: IEditProfileDetails) => {
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState<string | ArrayBuffer | null | object>();
  const [coverImage, setCoverImage] = useState<
    string | ArrayBuffer | null | object
  >();
  const [isLoading, setIsLoading] = useState(false);
  const { isAunthenticated } = useAuthStore();
  const user = useCurrentUser();
  const { industries } = useIndustries();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    control,
  } = useForm({ resolver: yupResolver(EmployerBasicInformationSchema) });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!profile?.basic_information.id && user.fullName) {
      setValue("organizationName", user.fullName);
    }
    if (!profile?.basic_information.id && user.phoneNumber) {
      setValue("phoneNumber", user.phoneNumber);
    }
  }, [user]);

  useEffect(() => {
    if (profile?.basic_information.id) {
      setImagePreview(profile?.image?.url);
      setImage(() => ({
        url: profile?.image?.url,
        public_id: profile?.image?.public_id,
      }));

      setValue(
        "organizationName",
        profile?.basic_information?.organization_name,
      );
      setValue("phoneNumber", profile?.basic_information?.phone_number);
      setValue("address", profile.basic_information.address);
      setValue("summary", profile.basic_information.summary);
      setValue("industryType", profile.basic_information.industry_id);
    }
  }, [profile, isEditorOpen]);

  const onSubmit: SubmitHandler<IEmployerBasicInformationInputs> = async (
    data,
  ) => {
    const dataToUpdate = {
      email: user.email,
      organization_name: data.organizationName,
      image,
      cover_image: coverImage,
      summary: data.summary,
      industry_type: data.industryType,
      phone_number: data.phoneNumber,
      address: data.address,
    };

    await updateBasicInformation(
      profile,
      dataToUpdate,
      setIsLoading,
      setIsEditorOpen,
    );
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files) {
      const url = URL.createObjectURL(e.target.files[0]);
      const image = e.target.files[0];
      const reader = new FileReader();
      if (image) {
        reader.readAsDataURL(image);
        reader.onloadend = () => {
          const imageSrc = reader.result;
          if (type === "image") {
            setImage(imageSrc);
            setImagePreview(url);
          }
          if (type === "coverImage") {
            setCoverImage(imageSrc);
          }
        };
      }
    }
  };

  if (!isAunthenticated) return <NoUser />;

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
      <form className="grid gap-3 " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <span>Organization Name</span>{" "}
          <input
            type="text"
            {...register("organizationName")}
            className="p-xs outline-none border-sm border-default "
            disabled={!isEditorOpen}
          />
          <p className="text-orange-dark">{errors.organizationName?.message}</p>
        </div>
        <div className="grid gap-2">
          <span>Phone Number</span>{" "}
          <input
            type="number"
            {...register("phoneNumber")}
            className="p-xs outline-none border-sm border-default "
            disabled={!isEditorOpen}
          />
          <p className="text-orange-dark">{errors.phoneNumber?.message}</p>
        </div>
        <div className="grid gap-2">
          <span>Address</span>{" "}
          <input
            {...register("address")}
            className="p-xs outline-none border-sm border-default "
            disabled={!isEditorOpen}
          />
          <p className="text-orange-dark">{errors.address?.message}</p>
        </div>

        <div className="grid  gap-2 w-40 sm:w-fit ">
          <label htmlFor="">Profile Image</label>
          <input
            type="file"
            disabled={!isEditorOpen}
            onChange={(e) => handleImage(e, "image")}
          />
          {imagePreview && <img src={imagePreview} className="w-20 h-20" />}
        </div>
        {/* <div className="grid  gap-2 ">
          <label htmlFor=""> Cover Image</label>
          <input
            type="file"
            disabled={!isEditorOpen}
            onChange={(e) => handleImage(e, "coverImage")}
          />
          {coverImagePreview && (
            <img
              src={coverImagePreview}
              className="w-20 h-20 object-cover rounded-full"
            />
          )}
        </div> */}
        <div>
          <div className=" grid gap-2  items-center">
            <span className="">* Industry Type</span>
            <Controller
              name="industryType"
              control={control}
              render={({ field }) => (
                <SelectCategory
                  values={industries}
                  type="industries"
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
              className="p-xs px-sm disabled:opacity-50 rounded-sm bg-blue-dark text-white"
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

export default BasicInformation;
