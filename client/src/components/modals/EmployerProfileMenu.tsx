import { useRef, useEffect } from "react";
import useStore from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "../../lib/axios";
import useAuthStore from "../../store/auth";

const EmployerProfileMenu = () => {
  const ref = useRef<HTMLDivElement>(null);
  const store = useStore();
const authStore = useAuthStore()
const navigate = useNavigate()

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

  //this is only client side logout 
  const handleLogout = async() => {
setAuthToken(null)
localStorage.removeItem('userInfo')
authStore.setAuthentication(false)
navigate('/')
  }


  return (
    <div ref={ref} className="absolute max-w-sm bg-white w-full border-b-sm  border-default top-12 grid  place-items-start gap-xs text-black-default  p-md right-0">
     <Link to='/jobs/create' className="text-black-default hover:text-green-dark">Create Job</Link>
     <Link to='/employer/profile/basic-info' className="text-black-default hover:text-green-dark md:block hidden">Update Profile</Link>
     <Link to='/employer/profile' className="text-black-default hover:text-green-dark md:hidden">Profile</Link>
     <Link to='/employer/overview' className="text-black-default hover:text-green-dark md:hidden">Overview</Link>
        <button className="text-black-light font-medium hover:text-green-dark" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default EmployerProfileMenu;
