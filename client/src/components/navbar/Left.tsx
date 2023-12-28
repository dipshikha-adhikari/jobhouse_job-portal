import { Link } from "react-router-dom";

const Left = () => {
  return (
    <div className="  flex items-center  ">
      {/* logo  */}
      <Link
        to="/"
        className="text-2xl flex hover:text-green-dark text-green-dark"
      >
        Job <span className="text-black-light">House</span>
      </Link>
    </div>
  );
};

export default Left;
