import { MdArticle } from "react-icons/md";
import healthImg from "../../../asstes/health.jpg";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Blogs = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`${
        location.pathname === "/blogs" && "min-h-screen"
      } border-sm`}
    >
      <h2 className="heading flex gap-2 items-center font-bold uppercase p-sm border-b-sm">
        <MdArticle className="text-green-dark" /> Recent blogs
      </h2>
      <div className="grid gap-sm sm:grid-cols-auto-sm p-sm ">
        <Link
          to="/blogs/sorry-not-available"
          className="text-black-dark hover:text-black-dark flex items-center gap-sm p-sm shadow-sm"
        >
          <img
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/increase-productivity-1544660-1307880.png"
            alt=""
            className="w-10 h-10 object-cover"
          />
          <h2>Boost your job search with the enhanced JobHouse app</h2>
        </Link>
        <Link
          to={"/blogs/sorry-not-available"}
          className="flex text-black-dark hover:text-black-dark items-center gap-sm p-sm shadow-sm"
        >
          <img src={healthImg} alt="" className="w-10 h-10 object-cover" />
          <h2>Creating a Mentally Healthy Workplace</h2>
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
