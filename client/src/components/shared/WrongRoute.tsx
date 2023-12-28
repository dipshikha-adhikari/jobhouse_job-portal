import { useEffect } from "react";
import { Link } from "react-router-dom";

const WrongRoute = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="grid gap-xs place-items-center">
        <img
          src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=740&t=st=1703399806~exp=1703400406~hmac=ceba56ff8aaf2011fcf7e8620298b3cf8e5c0c566db0cb7e3d5e42bc0b24c309"
          alt="wrong route"
          className="w-full text-orange-dark max-h-[300px]"
        />
        <Link
          to="/"
          className="bg-blue-dark hover:text-white text-white rounded-sm px-sm p-xs"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default WrongRoute;
