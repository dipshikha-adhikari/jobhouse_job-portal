import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerValidationSchema } from "../../utils/validationSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { publicRequest } from "../../lib/axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

type Inputs = {
  fullName: string;
  phoneNumber: number;
  email: string;
  password: string;
  confirmPassword: string;
};

const EmployerRegister = () => {
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
        role,
      }),
      {
        loading: "Processing",
        success: () => {
          navigate("/user/login");
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
      },
    );
  };

  return (
    <div className="py-md max-w-md mx-auto grid gap-4">
      <header className="grid gap-2">
        <h2 className="text-xl font-semibold">
          Create your free Employer Account
        </h2>
        <p>Fill the basic information and start recruiting now!</p>
      </header>
      <p className="text-xs">Every field is required *</p>

      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-2 border-sm p-xs">
          <AiOutlineUser />{" "}
          <input
            {...register("fullName")}
            id=""
            placeholder="Organization name"
            className="outline-none w-full"
          />
        </div>
        <p className="text-red-600 text-sm">{errors.fullName?.message}</p>
        <div className="flex items-center gap-2 border-sm p-xs">
          <AiOutlinePhone />{" "}
          <input
            {...register("phoneNumber")}
            placeholder="Organization Contact Number"
            className="outline-none w-full"
          />
        </div>
        <p className="text-red-600 text-sm">{errors.phoneNumber?.message}</p>

        <div className="flex items-center gap-2 border-sm p-xs ">
          <AiOutlineMail />{" "}
          <input
            {...register("email")}
            placeholder="Office Email"
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
          className="bg-blue-dark p-xs text-white disabled:opacity-40"
          disabled={isLoading}
        >
          Create an Employer account
        </button>
      </form>
      <div>
        <span>Already have an account? </span>{" "}
        <Link
          to="/user/login"
          className="text-green-dark hover:text-green-light cursor-pointer"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default EmployerRegister;
