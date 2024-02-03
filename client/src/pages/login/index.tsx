import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { publicRequest, setAuthToken } from "../../lib/axios";
import useAuthStore from "../../store/auth";

interface Inputs {
  email: string;
  password: string;
}
const Schema = Yup.object().shape({
  email: Yup.string().required(""),
  password: Yup.string().required(""),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(Schema) });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin: SubmitHandler<Inputs> = (data) => {
    try {
      const { email, password } = data;
      setIsLoading(true);
      toast.promise(
        publicRequest.post("/api/v1/auth/login", { email, password }),
        {
          loading: "Processing",
          success: (res) => {
            setIsLoading(false);
            const data = res.data;
            const token = data.token;
            const id = data.user_id;
            const role = data.user.role;
            const fullName = data.user.fullname;
            const phoneNumber = data.user.phone_number;
            const email = data.user.email;
            const userInfo = { fullName, email, token, role, phoneNumber,id };
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            authStore.setAuthentication(true);
            setAuthToken(token);
            navigate(`/${role}/overview`);
            return "Success";
          },
          error: (err) => {
            console.log(err);
            setIsLoading(false);
            if (err.response !== undefined) {
              setErrorMessage(err.response.data.message);
            } else {
              setErrorMessage(err.message);
            }
            setTimeout(() => {
              setErrorMessage("");
            }, 4000);
            return "Failed";
          },
        },
      );
    } catch (err) {
      console.log(err);
      toast.dismiss();
    }
  };

  return (
    <div className="  w-full py-md grid gap-xs max-w-md mx-auto">
      <header className="grid gap-xs">
        <h2 className="text-xl">Please log in to continue!</h2>
        <span className="text-xs">
          Login with your registered Email & Password.
        </span>
      </header>
      <form className="grid gap-6" onSubmit={handleSubmit(handleLogin)}>
        <input
          {...register("email")}
          placeholder="Enter your email"
          className="outline-none border-sm p-xs"
        />
        <p className="text-red-600 text-sm">{errors.email?.message}</p>

        <input
          {...register("password")}
          placeholder="Enter your password"
          className="outline-none border-sm p-xs"
        />
        <p className="text-red-600 text-sm">{errors.password?.message}</p>

        <div className="flex justify-between items-center">
          <span className="flex gap-2 items-center">
            <input type="checkbox" className="modal" /> Remember me
          </span>
          <span className="modal">Forgot Password?</span>
        </div>
        <p className="text-red-600 text-sm">{errorMessage}</p>

        <button
          type="submit"
          className="w-fit px-md rounded-md outline-none bg-blue-dark text-white hover:text-white p-xs disabled:opacity-50"
          disabled={isLoading}
        >
          Log in
        </button>
        <div className="">
          <p>
            Dont have an account?{" "}
            <Link
              to={"/jobseeker/register"}
              className="text-green-dark register-button font-bold cursor-pointer"
            >
              Register
            </Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
