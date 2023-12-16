import { Layout } from "../../App";
import HiddenMenu from "./HiddenMenu";
import Left from "./Left";
import { useState } from "react";
import NavbarForJobseeker from "./jobseeker";
import NavbarForEmployer from "./employer";
import { FaArrowDown, FaBars } from "react-icons/fa";
import Register from "../modals/Register";
import useStore from "../../store/store";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/auth";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const store = useStore();
  const authStore = useAuthStore()
  const user = useCurrentUser()

  return (
    <div className="bg-white fixed top-0 left-0 z-50 w-full">
      <Layout>
        <div className="flex justify-between  h-[10vh] items-center">
          <Left />
          {user.role === "jobseeker" && authStore.isAunthenticated && (
            <NavbarForJobseeker setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
          )}
          {user.role === "employer" && authStore.isAunthenticated && (
            <NavbarForEmployer setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
          )}
          {!authStore.isAunthenticated  && (
            <div className="flex gap-10 items-center">
              <span className="items-center gap-2 hidden md:flex">
                Browse jobs <FaArrowDown className="text-blue-dark" />
              </span>
              <span className=" hidden md:flex">Blog</span>
              <span className=" hidden md:flex">FAQs</span>
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
                className="text-2xl md:hidden cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <FaBars />
              </div>
            </div>
          )}
        </div>
        {menuOpen && <HiddenMenu setMenuOpen={setMenuOpen} />}
      </Layout>
    </div>
  );
};

export default Navbar;
