import { Link } from "react-router-dom";

const Left = () => {
  return (
    <div className="  flex items-center gap-10 ">
      {/* logo  */}
      <Link
        to="/"
        className="text-2xl hover:text-green-dark text-green-dark"
      >
        Itsmywork
      </Link>
    </div>
  );
};

export default Left;
