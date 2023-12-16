import { AiOutlineUser } from "react-icons/ai";
import { ImOffice } from "react-icons/im";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useStore from "../../store/store";

const Register = () => {
  const [selected, setSelected] = useState("jobseeker");
  const store = useStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (e.target.classList.contains("register-button")) return;

      if (
        store.registerModalOpen &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        store.toggleRegisterModal();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
    
  }, [ref, store.registerModalOpen]);

  return (
    <div
      ref={ref}
      className="fixed modal sm:absolute  sm:top-10 sm:right-0 sm:min-w-[400px] sm:left-auto sm:translate-x-0  bg-white p-md top-[10vh]  w-full  left-1/2 -translate-x-1/2 grid gap-4 place-items-center "
    >
      <header className="flex items-center  justify-between  w-full">
        <div className="flex gap-10">
          <span
            className={`${
              selected === "jobseeker" && "bg-gray-200 "
            }  p-xs cursor-pointer  `}
            onClick={() => setSelected("jobseeker")}
          >
            Jobseeker
          </span>
          <span
            className={`${
              selected === "employer" && "bg-gray-200"
            } cursor-pointer p-xs z-40  `}
            onClick={() => setSelected("employer")}
          >
            Employer
          </span>
        </div>{" "}

      </header>

      {selected === "jobseeker" ? (
        <AiOutlineUser fontSize={60} />
      ) : (
        <ImOffice fontSize={60} />
      )}
      <Link
        to={`/${selected}/register`}
        onClick={store.toggleRegisterModal}
      >
        Register
      </Link>

      {selected === "jobseeker" ? (
        <p>Create a free account to apply for jobs</p>
      ) : (
        <p>Create free account to post vacancys</p>
      )}
    </div>
  );
};

export default Register;
