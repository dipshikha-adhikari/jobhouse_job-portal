import { FaArrowDown, FaArrowRight, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import useStore from "../../../store/store";
import JobseekerProfileMenu from "../../modals/JobseekerProfileMenu";
import { useJobseekerProfile } from "../../../pages/jobseeker/hooks/useJobseekerProfile";
import { IJobseekerProfile } from "../../../types/postgres/types";

type JobseekerNav = {
  setMenuOpen: (props: boolean) => void;
  menuOpen: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (props: boolean) => void;
};

type Profile = {
  profile: IJobseekerProfile;
  isLoading: boolean;
};

const NavbarForJobseeker = ({
  setMenuOpen,
  menuOpen,
  isModalOpen,
  setIsModalOpen,
}: JobseekerNav) => {
  const { profile }: Profile = useJobseekerProfile();
  const store = useStore();
  return (
    <div className="relative flex items-center gap-20 w-full justify-end">
      <div className=" gap-xs hidden md:flex">
        <span
          className="items-center font-semibold text-black-light gap-2 flex  cursor-pointer browse-btn"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Browse jobs <FaArrowDown className="text-green-dark browse-btn " />
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
            src={
              profile?.basic_information?.image?.url ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqZYAYrmuzw5vIhNRWG2f436EKH4LqTUAFhLDWd2yRNA&s"
            }
            alt=""
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full profile-menu-button  object-cover"
          />
          <FaArrowRight
            fontSize={10}
            className="text-blue-dark profile-menu-button "
          />
          {store.jobseekerProfileMenuModalOpen && <JobseekerProfileMenu />}
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

export default NavbarForJobseeker;
