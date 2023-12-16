import { FaArrowDown, FaArrowRight, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import useStore from "../../../store/store";
import EmployerProfileMenu from "../../modals/EmployerProfileMenu";

const NavbarForEmployer = ({ setMenuOpen, menuOpen }: any) => {
  const store = useStore();

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
          to="/employer/profile"
          className="text-black-light hover:text-blue-dark hidden md:block"
        >
          Profile
        </Link>
        <Link
          to="/employer/overview"
          className="text-black-light hover:text-blue-dark hidden md:block"
        >
          Overview
        </Link>

        <div
          className="flex profile-menu-button items-center gap-1  w-full cursor-pointer"
          onClick={store.toggleJobseekerProfileMenuModal}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiupIgqp_vhCZWGAh5yeL3uF_Ke8-MGO5uBonmKjWMMFpKgX7kw6p34IDYpdSVZQTpH4M&usqp=CAU"
            alt=""
            className="w-10 rounded-full profile-menu-button h-10 object-cover"
          />
          <FaArrowRight
            fontSize={10}
            className="text-blue-dark profile-menu-button"
          />
          {store.jobseekerProfileMenuModalOpen && <EmployerProfileMenu />}
        </div>
        <div
          className="text-2xl cursor-pointer md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </div>
      </div>
    </div>
  );
};

export default NavbarForEmployer;
