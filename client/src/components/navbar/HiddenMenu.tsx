import { useEffect, useRef, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/auth";
import useStore from "../../store/store";
import Categories from "../shared/Categories";

interface IHiddenMenu {
  setMenuOpen: (props: boolean) => void;
  menuOpen: boolean;
}
const HiddenMenu = ({ setMenuOpen, menuOpen }: IHiddenMenu) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const store = useStore();

  const { isAunthenticated } = useAuthStore();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (!menuOpen) return;
    if (
      (e.target as Element).classList.contains("menu-btn") ||
      (e.target as Element).parentElement?.classList.contains("menu-btn")
    )
      return;

    if (ref.current && !ref.current.contains(e.target as Element)) {
      setMenuOpen(false);
    }
  };

  if (isAunthenticated) {
    return (
      <div className="grid gap-xs p-sm border-b-sm md:hidden " ref={ref}>
        <span
          className="items-center gap-2 flex relative cursor-pointer"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Browse jobs <FaArrowDown className="text-green-dark" />
          {isModalOpen && (
            <div className="absolute top-7 border-b-md  p-sm  h-80 overflow-y-scroll  bg-white">
              <Categories setIsModalOpen={setIsModalOpen} />
            </div>
          )}
        </span>
        <Link
          to="/blogs"
          onClick={() => setMenuOpen(false)}
          className="text-black-light w-fit font-normal hover:text-blue-dark"
        >
          Blogs
        </Link>
        <Link
          to="/faqs"
          onClick={() => setMenuOpen(false)}
          className="text-black-light w-fit font-normal hover:text-blue-dark"
        >
          FAQs
        </Link>
      </div>
    );
  } else
    return (
      <div className="py-md grid gap-xs md:hidden  bg-white " ref={ref}>
        <div className="flex gap-10 ">
          <Link
            onClick={() => setMenuOpen(false)}
            to="/user/login"
            className=" font-normal text-green-dark hover:text-green-dark  border-[1px] border-green-dark  rounded-sm p-xs px-md "
          >
            Log in
          </Link>
          <div
            className="bg-blue-dark register-button text-white
             p-xs px-md rounded-sm cursor-pointer   "
            onClick={() => {
              store.toggleRegisterModal();
              setMenuOpen(false);
            }}
          >
            Register
          </div>
        </div>
        <span
          className="flex items-center gap-2 relative cursor-pointer"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Browse jobs <FaArrowDown className="text-green-dark" />
          {isModalOpen && (
            <div className="absolute top-10 z-10 h-80 overflow-y-scroll p-sm sm:p-lg bg-white">
              <Categories setIsModalOpen={setIsModalOpen} />
            </div>
          )}
        </span>
        <Link
          to="/blogs"
          onClick={() => setMenuOpen(false)}
          className="text-black-light w-fit font-normal hover:text-blue-dark"
        >
          Blogs
        </Link>
        <Link
          to="/faqs"
          onClick={() => setMenuOpen(false)}
          className="text-black-light w-fit font-normal hover:text-blue-dark"
        >
          FAQs
        </Link>
      </div>
    );
};

export default HiddenMenu;
