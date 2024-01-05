import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useStore from "../../store/store";
import { useLogout } from "../../hooks/useLogout";

const JobseekerProfileMenu = () => {
  const ref = useRef<HTMLDivElement>(null);
  const store = useStore();
const {handleLogout} = useLogout()

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [ref, store.jobseekerProfileMenuModalOpen]);

  const handleClickOutside = (e: MouseEvent) => {
    if ((e.target as Element).classList.contains("profile-menu-button")) return;
    if (
      store.jobseekerProfileMenuModalOpen &&
      ref.current &&
      !ref.current.contains(e.target as Element)
    ) {
      store.toggleJobseekerProfileMenuModal();
    }
  };



  return (
    <div
      ref={ref}
      className="absolute max-w-[350px] bg-white w-full shadow-xl top-12 grid  place-items-start gap-xs text-black-default  p-md sm:px-xl right-0"
    >
      <Link
        to="/jobseeker/profile/job-preference"
        className="text-black-default border-b-sm border-green-dark hover:text-green-dark md:block hidden"
      >
        Update Profile
      </Link>
      <Link
        to="/jobseeker/profile"
        className="text-black-default border-b-sm border-green-dark hover:text-green-dark md:hidden"
      >
        Profile
      </Link>
      <Link
        to="/jobseeker/overview"
        className="text-black-default border-b-sm border-green-dark hover:text-green-dark md:hidden"
      >
        Overview
      </Link>
      <button
        className="text-black-light font-medium border-b-sm border-green-dark hover:text-green-dark"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default JobseekerProfileMenu;
