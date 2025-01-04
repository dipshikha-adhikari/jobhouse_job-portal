import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../../utils/validationSchema";
import { publicRequest } from "../../lib/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Inputs = {
  fullName: string;
  phoneNumber: number;
  email: string;
  password: string;
  confirmPassword: string;
};

const JobseekerRegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const splitedLocation = location.pathname.split("/");
  const role = splitedLocation[1];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(registerValidationSchema) });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    const { email, password, phoneNumber, fullName } = data;
    toast.promise(
      publicRequest.post("/api/v1/auth/register", {
        email,
        password,
        phoneNumber,
        fullName,
        role: "jobseeker",
      }),
      {
        loading: "Processing",
        success: () => {
          navigate("/auth/login");
          setIsLoading(false);
          return "Successfully registered";
        },
        error: (err) => {
          console.error(err);
          setIsLoading(false);
          if (err.response.data.message !== undefined) {
            setErrorMessage(err.response.data.message);
          } else {
            setErrorMessage("Server Error!");
          }
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
          return "Failed";
        },
      }
    );
  };

  return (
    <div className="py-md max-w-md mx-auto grid gap-4">
      <header className="grid gap-2">
        <h2 className="text-xl font-semibold">Create your free Account</h2>
        <p>
          Register with basic information, Complete your profile and start
          applying for the job for free!
        </p>
        <p className="text-xs">Every field is required *</p>
      </header>
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-2 border-sm p-xs">
          <AiOutlineUser />{" "}
          <input
            {...register("fullName")}
            className="outline-none w-full"
            placeholder="Full Name"
          />
        </div>
        <p className="text-red-600 text-sm">{errors.fullName?.message}</p>

        <div className="flex items-center gap-2 border-sm p-xs">
          <AiOutlinePhone />{" "}
          <input
            {...register("phoneNumber")}
            className="outline-none w-full"
            placeholder="Phone Number"
          />
        </div>
        <p className="text-red-600 text-sm">{errors.phoneNumber?.message}</p>

        <div className="flex items-center gap-2 border-sm p-xs ">
          <AiOutlineMail />{" "}
          <input
            {...register("email")}
            placeholder="Email Address"
            className="outline-none w-full"
          />
        </div>
        <p className="text-red-600 text-sm">{errors.email?.message}</p>

        <div className="flex items-center gap-2 border-sm p-xs">
          <RiLockPasswordLine />{" "}
          <input
            {...register("password")}
            placeholder="Password"
            className="outline-none w-full"
          />
        </div>
        <p className="text-red-600 text-sm">{errors.password?.message}</p>

        <div className="flex items-center gap-2 border-sm p-xs">
          <RiLockPasswordLine />{" "}
          <input
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="outline-none w-full"
          />
        </div>
        <p className="text-red-600 text-sm">
          {errors.confirmPassword?.message}
        </p>
        <p className="text-red-600 text-sm">{errorMessage}</p>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-dark p-xs disabled:opacity-50 text-white"
        >
          Create account
        </button>
      </form>
      <div>
        <span>Already have an account? </span>{" "}
        <Link
          to="/auth/login"
          className="text-green-dark hover:text-green-light cursor-pointer"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default JobseekerRegisterForm;
