import { FaArrowDown, FaArrowRight, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import useStore from "../../../store/store";
import EmployerProfileMenu from "../../modals/EmployerProfileMenu";
import { useProfile } from "../../../pages/employer/hooks/useEmployerProfile";

type EmployerNav = {
  setMenuOpen: (props: boolean) => void;
  menuOpen: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (props: boolean) => void;
};

const NavbarForEmployer = ({
  setMenuOpen,
  menuOpen,
  isModalOpen,
  setIsModalOpen,
}: EmployerNav) => {
  const store = useStore();
  const { profile } = useProfile();
  return (
    <div className="relative flex items-center gap-20 w-full justify-end">
      <div className=" gap-xs hidden md:flex ">
        <span
          className="items-center gap-2 font-semibold text-black-light flex cursor-pointer browse-btn "
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Browse jobs <FaArrowDown className="text-green-dark browse-btn" />
        </span>
        <Link
          to="/blogs"
          className="text-black-light font-semibold hover:text-blue-dark"
        >
          Blogs
        </Link>
        <Link
          to="/faqs"
          className="text-black-light font-semibold hover:text-blue-dark"
        >
          FAQs
        </Link>
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
            src={profile?.image.url}
            alt=""
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full profile-menu-button  object-cover"
          />
          <FaArrowRight
            fontSize={10}
            className="text-blue-dark profile-menu-button"
          />
          {store.jobseekerProfileMenuModalOpen && <EmployerProfileMenu />}
        </div>
        <div
          className="text-2xl cursor-pointer md:hidden menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars className="menu-btn" />
        </div>
      </div>
    </div>
  );
};

export default NavbarForEmployer;
