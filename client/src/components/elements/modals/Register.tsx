import { AiOutlineUser } from "react-icons/ai";
import { ImOffice } from "react-icons/im";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useStore from "../../../store/components";

const RegisterModal = () => {
  const [selected, setSelected] = useState("jobseeker");
  const store = useStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if ((e.target as Element).classList.contains("register-button")) return;

      if (
        store.registerModalOpen &&
        ref.current &&
        !ref.current.contains(e.target as Element)
      ) {
        store.closeRegisterModal();
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
      className="fixed modal sm:absolute right-0 z-50  top-[8vh] sm:top-[10vh] border-sm  max-w-[400px] border-b-sm bg-white p-md  w-full  grid gap-4 place-items-center "
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
        to={`/auth/${selected}/register`}
        onClick={store.closeRegisterModal}
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

export default RegisterModal;
