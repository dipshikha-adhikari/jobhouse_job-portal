import { FaArrowDown, FaArrowRight, FaBars, FaHome, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import useStore from "../../../store/store"
import JobseekerProfileMenu from "../../modals/JobseekerProfileMenu"

const NavbarForJobseeker = ({setMenuOpen, menuOpen}:any) => {
    const store = useStore()
    
  return (
    <div className="relative flex items-center gap-20 w-full justify-end">
        <div className=" gap-xs hidden md:flex">
        <span className="items-center gap-1 flex ">
          Browse jobs <FaArrowDown className="text-blue-default" />
        </span>
        <span>Blog</span>
        <span>FAQs</span>
      </div>

      <div className="flex items-center gap-6">
        <Link
          to="/jobseeker/overview"
          className="text-black-light hover:text-blue-default hidden md:block"
        >
          Overview
        </Link>
        <Link
          to="/jobseeker/profile"
          className="text-black-light hover:text-blue-default hidden md:block"
        >
          Profile
        </Link>
        <div
          className="flex  profile-menu-button items-center gap-1  cursor-pointer"
          onClick={store.toggleJobseekerProfileMenuModal}
        >
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
            alt=""
            className="w-10 profile-menu-button h-10 object-cover"
          />
          <FaArrowRight fontSize={10} className="text-blue-dark profile-menu-button " />
          {store.jobseekerProfileMenuModalOpen && <JobseekerProfileMenu />}
        </div>
        <div
          className="text-2xl cursor-pointer md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </div>
      </div>

      
    </div>
  )
}

export default NavbarForJobseeker