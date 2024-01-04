import { Link } from "react-router-dom";

const NoUser = () => {
  return (
    <div className="h-[80vh] relative grid place-items-center w-full ">
      <div className="relative  w-full max-w-xl mx-auto max-h-[400px] overflow-hidden ">
        <img
          src="https://img.freepik.com/free-vector/401-error-unauthorized-concept-illustration_114360-1934.jpg?size=626&ext=jpg&ga=GA1.2.1964467772.1697906380&semt=ais"
          alt=""
          className="  object-cover "
        />
        <div className="absolute text-xl grid gap-sm bg-[rgba(0,0,0,0.5)] text-white p-sm rounded-md bottom-0">
          <h2>You are not authenticated</h2>
          <Link
            to="/user/login"
            className="bg-white rounded-sm w-fit text-blue-dark hover:text-blue-dark  p-sm"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoUser;
