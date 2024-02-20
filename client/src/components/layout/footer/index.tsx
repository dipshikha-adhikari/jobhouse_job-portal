import { BiPhone } from "react-icons/bi";
import { FaEnvelope } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import ContentLayout from "../ContentLayout";
import { useCurrentUser } from "../../../features/auth/api/getUser";

const Footer = () => {
  const navigate = useNavigate();
  const { role } = useCurrentUser();

  const postJob = () => {
    if (role === "employer") {
      navigate("/employer/jobs/create");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className=" relative text-white mt-10  bg-black-default">
      <ContentLayout>
        <div className=" py-sm grid gap-10 md:flex">
          <div className="flex-1">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              eveniet delectus aspernatur facilis!
            </p>
          </div>
          <div className="flex-[0.5] grid gap-xs">
            <h2 className="font-semibold ">FOR JOBSEEKER</h2>
            <div className="grid gap-1 w-fit">
              <Link
                to="/auth/jobseeker/register"
                className="text-blue-light hover:text-blue-dark"
              >
                Register
              </Link>
              <Link
                to="/blogs"
                className="text-blue-light hover:text-blue-dark"
              >
                Blog
              </Link>
            </div>
          </div>
          <div className="flex-[0.5]  grid gap-xs">
            <h2 className="font-semibold ">FOR EMPLOYER</h2>
            <div className="grid gap-1 w-fit">
              <Link
                to="/auth/employer/register"
                className="text-blue-light hover:text-blue-dark"
              >
                Register
              </Link>
              <span
                onClick={postJob}
                className="text-blue-light font-semibold cursor-pointer hover:text-blue-dark"
              >
                Post a job
              </span>
            </div>
          </div>
          <div className="flex-[0.5]  grid gap-xs">
            <h2 className="font-semibold">CONTACT US</h2>
            <div className="grid gap-2">
              <p className="flex items-center gap-4">
                <FaLocationPin className="text-blue-light" /> New Baneshwor,
                Kathmandu
              </p>
              <p className="flex items-center gap-4">
                <BiPhone className="text-blue-light" /> 9807559979
              </p>
              <p className="flex items-center gap-4">
                <FaEnvelope className="text-blue-light" /> jobhouse@gmail.com
              </p>
            </div>
          </div>
        </div>
      </ContentLayout>
    </div>
  );
};

export default Footer;
