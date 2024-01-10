import HiddenMenu from "./HiddenMenu";
import Left from "./Left";
import { useEffect, useRef, useState } from "react";
import NavbarForJobseeker from "./jobseeker";
import NavbarForEmployer from "./employer";
import { FaArrowDown, FaBars } from "react-icons/fa";
import Register from "../modals/Register";
import useStore from "../../store/store";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/auth";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Categories from "../shared/Categories";
import { Layout } from "../../App";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const store = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const authStore = useAuthStore();
  const user = useCurrentUser();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [ref, isModalOpen]);

  const handleClickOutside = (e: MouseEvent) => {
    if (!isModalOpen) return;
    if (
      (e.target as Element).classList.contains("browse-btn") ||
      (e.target as Element).parentElement?.classList.contains("browse-btn")
    )
      return;
    if (ref.current && !ref.current.contains(e.target as Element)) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-white fixed top-0 left-0 z-50 w-full">
      <Layout>
        <div className="flex justify-between  h-[8vh] sm:h-[10vh] items-center">
          <Left />
          {user.role === "jobseeker" && authStore.isAunthenticated && (
            <NavbarForJobseeker
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              setMenuOpen={setMenuOpen}
              menuOpen={menuOpen}
            />
          )}
          {user.role === "employer" && authStore.isAunthenticated && (
            <NavbarForEmployer
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              setMenuOpen={setMenuOpen}
              menuOpen={menuOpen}
            />
          )}
          {!authStore.isAunthenticated && (
            <div className="flex gap-10 items-center">
              <span
                className="items-center gap-2 font-semibold text-black-light hidden md:flex cursor-pointer browse-btn"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                Browse jobs{" "}
                <FaArrowDown className="text-blue-dark browse-btn" />
              </span>
              <Link
                to="/blogs"
                className="text-black-light hidden md:flex font-semibold hover:text-blue-dark"
              >
                Blogs
              </Link>
              <Link
                to="/faqs"
                className="text-black-light font-semibold hidden md:flex hover:text-blue-dark"
              >
                FAQs
              </Link>
              <div className="relative ">
                <Link
                  to="/user/login"
                  className="bg-blue-dark font-normal text-white border-[1px] border-blue-default hover:text-white rounded-sm p-xs px-md hidden sm:block"
                >
                  Log in
                </Link>
              </div>
              <div className="relative">
                <div
                  className="bg-blue-dark rounded-sm register-button text-white
             p-xs px-md cursor-pointer  hidden sm:block "
                  onClick={store.toggleRegisterModal}
                >
                  Register
                </div>
                {store.registerModalOpen && <Register />}
              </div>
              <div
                className="text-2xl md:hidden cursor-pointer  menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <FaBars className="menu-btn" />
              </div>
            </div>
          )}
        </div>
        {isModalOpen && (
          <div
            ref={ref}
            className="absolute top-14 -z-10 overflow-y-auto hidden md:block max-h-[70vh] w-full left-0 border-sm bg-white p-sm "
          >
            <Categories setIsModalOpen={setIsModalOpen} />
          </div>
        )}
        {menuOpen && <HiddenMenu menuOpen setMenuOpen={setMenuOpen} />}
      </Layout>
    </div>
  );
};

export default Navbar;
