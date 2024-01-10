import { useEffect } from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="grid gap-xs place-items-center">
        <img
          src="https://img.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_114360-7912.jpg?size=626&ext=jpg&ga=GA1.2.1964467772.1697906380&semt=ais"
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

export default PageNotFound;
