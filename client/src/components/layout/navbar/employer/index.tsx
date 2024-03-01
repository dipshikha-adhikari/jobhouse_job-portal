import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LiaBarsSolid } from "react-icons/lia";
import useComponentsStore from "../../../../store/components";
import EmployerProfileMenu from "../../../elements/modals/EmployerProfileMenu";
import { useProfile } from "../../../../features/employer/api/getProfile";

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
  const store = useComponentsStore();
  const { profile } = useProfile();
  return (
    <div className="relative flex items-center gap-10 xs:gap-20 w-full justify-end">
      <div className=" gap-xs hidden md:flex ">
        <span
          className="items-center gap-2 font-semibold text-black-light hover:text-blue-dark flex cursor-pointer browse-btn "
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Browse jobs <FaArrowDown className="text-blue-dark browse-btn" />
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
          className="flex profile-menu-button  items-center gap-1  w-full cursor-pointer"
          onClick={store.toggleJobseekerProfileMenuModal}
        >
          <img
            src={
              profile?.image.url ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
            }
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
          <LiaBarsSolid className="menu-btn" />
        </div>
      </div>
    </div>
  );
};

export default NavbarForEmployer;
