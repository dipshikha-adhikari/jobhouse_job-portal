import { Link } from "react-router-dom";

const NoUser = () => {
  return (
    <div className="h-[80vh] relative grid place-items-center w-full ">
      <div className="relative  max-w-xl mx-auto max-h-[400px] overflow-hidden ">
        <img
          src="https://img.freepik.com/free-vector/401-error-unauthorized-concept-illustration_114360-1934.jpg?size=626&ext=jpg&ga=GA1.2.1964467772.1697906380&semt=ais"
          alt=""
          className=" w-full object-cover "
        />
        <div className="absolute  left-0 p-sm rounded-md bottom-0">
          <Link
            to="/auth/login"
            className="bg-green-dark rounded-sm w-fit text-white hover:text-white  p-sm"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoUser;
