import { Link } from "react-router-dom";
import image from "../../../asstes/logo.png";

const Left = () => {
  return (
    <div className="  flex items-center  ">
      {/* logo  */}
      <Link
        to="/"
        className=" flex items-center md:text-xl hover:text-green-light text-green-dark  "
      >
        <img src={image} alt="" className="w-10 object-cover h-10" />
        <span>
          Job
          <span className="text-black-dark">House</span>
        </span>
      </Link>
    </div>
  );
};

export default Left;
