import { useRef, useEffect } from "react";
import useStore from "../../store/store";
import { setAuthToken } from "../../lib/axios";
import useAuthStore from "../../store/auth";
import { Link, useNavigate } from "react-router-dom";

const JobseekerProfileMenu = () => {
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
    <div ref={ref} className="absolute max-w-[300px] bg-white w-full border-b-sm top-12 grid  place-items-start gap-xs text-black-default  p-md right-0">
     <Link to='/jobseeker/profile/update' className="text-black-default hover:text-green-dark md:block hidden">Update Profile</Link>
     <Link to='/jobseeker/profile' className="text-black-default hover:text-green-dark md:hidden">Profile</Link>
     <Link to='/jobseeker/overview' className="text-black-default hover:text-green-dark md:hidden">Overview</Link>
        <button className="text-black-light font-medium hover:text-green-dark" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default JobseekerProfileMenu;
