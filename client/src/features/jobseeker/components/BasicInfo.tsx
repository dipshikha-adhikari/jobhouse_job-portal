import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { IJobseekerBasicInformation } from "../../../types/postgres/types";
import { JobseekerBasicInfoSchema } from "../../../utils/validationSchema";
import { IJobseekerBasicInfoInputs } from "../../../types/react/types";
import ResponsiveDayPicker from "../../../components/mui/DayPicker";
import { useCurrentUser } from "../../auth/api/getUser";
import { updateBasicInfo } from "../api/updateBasicInfo";

type basic_information = {
  basic_information: IJobseekerBasicInformation;
};

const BasicInformation = ({ basic_information }: basic_information) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | ArrayBuffer | object | null>();
  const [imagePreview, setImagePreview] = useState<string>();
  const { fullName, phoneNumber } = useCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    control,
  } = useForm({ resolver: yupResolver(JobseekerBasicInfoSchema) });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!basic_information) {
      setValue("fullname", fullName!);
      setValue("phoneNumber", phoneNumber!);
    }
  }, [fullName, phoneNumber]);

  useEffect(() => {
    if (basic_information) {
      const gender: "male" | "female" | "other" =
        (basic_information?.gender as "male" | "female" | "other") || "other";

      setImagePreview(basic_information?.image.url);

      if (basic_information?.image.url) {
        //image is not handled by react-hook-form
        setImage(() => ({
          url: basic_information.image.url,
          public_id: basic_information?.image?.public_id,
        }));
      }

      setValue("gender", gender);
      setValue("dateOfBirth", new Date(basic_information?.date_of_birth));
      setValue("fullname", basic_information?.fullname);
      setValue("currentAddress", basic_information?.current_address);
      setValue("permanentAddress", basic_information?.permanent_address);
      setValue("phoneNumber", basic_information?.phone_number);
    }
  }, [basic_information, isEditorOpen]);
  const onSubmit: SubmitHandler<IJobseekerBasicInfoInputs> = (data) => {
    const dataToBeSent = { ...data, image };
    updateBasicInfo(
      dataToBeSent,
      setIsLoading,
      setIsEditorOpen,
      basic_information
    );
  };
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const url = URL.createObjectURL(e.target.files[0]);
      const image = e.target.files[0];
      const reader = new FileReader();
      if (image) {
        reader.readAsDataURL(image);
        reader.onloadend = () => {
          const imageSrc = reader.result;
          setImage(imageSrc);
        };
      }
      setImagePreview(url);
    }
  };

  return (
    <div className="grid gap-sm ">
      <header className="text-green-dark flex justify-between  font-semibold">
        Basic Information
        {!isEditorOpen && (
          <span
            className="border-sm border-green-dark px-sm py-1 flex items-center cursor-pointer gap-xs rounded-sm"
            onClick={() => setIsEditorOpen(true)}
          >
            <FaEdit /> Edit
          </span>
        )}
      </header>
      <form className="grid gap-sm" onSubmit={handleSubmit(onSubmit)}>
        <section className="grid gap-xs">
          <div className="">
            <div className="grid sm:flex gap-2 items-center">
              <span className="font-semibold">Full Name </span>{" "}
              <input
                type="text"
                disabled={!isEditorOpen}
                placeholder="Full Name"
                {...register("fullname")}
                className="outline-none p-xs border-sm border-gray-light"
              />
            </div>
            <p className="text-orange-dark text-sm">
              {errors.fullname?.message}
            </p>
          </div>
          <div className="">
            <div className="grid  sm:flex gap-2 items-center">
              <span className="font-semibold">Profile Picture </span>{" "}
              <input
                type="file"
                disabled={!isEditorOpen}
                onChange={(e) => handleImage(e)}
                placeholder="Upload image"
                className="outline-none p-xs border-sm w-40 sm:w-full border-gray-light"
              />
            </div>
            {imagePreview && <img src={imagePreview} className="w-20 h-20" />}
          </div>
          <div>
            <div className="grid sm:flex gap-2 items-center">
              <span className="font-semibold">Current Address </span>{" "}
              <input
                type="text"
                disabled={!isEditorOpen}
                {...register("currentAddress")}
                placeholder="Current Address"
                className="outline-none p-xs border-sm border-gray-light"
              />
            </div>
            <p className="text-orange-dark text-sm">
              {errors.currentAddress?.message}
            </p>
          </div>

          <div>
            <div className="grid gap-2 sm:flex items-center">
              <span className="font-semibold">Permanent Address</span>{" "}
              <input
                type="text"
                disabled={!isEditorOpen}
                {...register("permanentAddress")}
                placeholder="Permanent Address"
                className="outline-none p-xs border-sm border-gray-light"
              />
            </div>
            <p className="text-orange-dark text-sm">
              {errors.permanentAddress?.message}
            </p>
          </div>
          <div>
            <div className="grid sm:flex gap-2 items-center">
              <span className="font-semibold">Mobile No </span>{" "}
              <input
                type="number"
                disabled={!isEditorOpen}
                {...register("phoneNumber")}
                placeholder="Phone no"
                className="outline-none p-xs border-sm border-gray-light"
              />
            </div>
            <p className="text-orange-dark text-sm">
              {errors.phoneNumber?.message}
            </p>
          </div>
          <div>
            <div className="grid sm:flex gap-2 items-center">
              <span className="font-semibold">Gender </span>{" "}
              <select
                disabled={!isEditorOpen}
                {...register("gender")}
                className="outline-none p-xs w-fit border-sm border-gray-light"
              >
                <option value={undefined}>Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">other</option>
              </select>
            </div>
            <p className="text-orange-dark text-sm">{errors.gender?.message}</p>
          </div>
          <div>
            <div className="grid sm:flex gap-2 w-40 xs:w-60 sm:w-full items-center">
              <span className="font-semibold">Date of Birth</span>{" "}
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field }) => {
                  return (
                    <ResponsiveDayPicker
                      isEditorOpen={isEditorOpen}
                      field={field}
                    />
                  );
                }}
              />
            </div>
            <p className="text-orange-dark text-sm">
              {errors.dateOfBirth?.message}
            </p>
          </div>
        </section>
        {isEditorOpen && (
          <div className="flex  gap-xs">
            <button
              className="bg-green-dark h-full disabled:opacity-50 text-white p-xs px-sm rounded-sm"
              disabled={isLoading}
            >
              Save
            </button>
            <button
              className="bg-orange-dark  text-white px-sm p-xs rounded-sm"
              onClick={() => {
                setIsEditorOpen(false);
                setIsLoading(false);
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
