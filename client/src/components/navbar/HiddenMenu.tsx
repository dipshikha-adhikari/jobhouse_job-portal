import { Link } from "react-router-dom";
import useStore from "../../store/store";
import { FaArrowDown } from "react-icons/fa";
import useAuthStore from "../../store/auth";
import { useCurrentUser } from "../../hooks/useCurrentUser";

interface IHiddenMenu {
  setMenuOpen: (props: any) => void;
}
const HiddenMenu = ({ setMenuOpen }: IHiddenMenu) => {
  const store = useStore();
const{role} = useCurrentUser()

  const {isAunthenticated} = useAuthStore()

  if (isAunthenticated && role === "jobseeker") {
    return (
      <div className="grid gap-xs py-md md:hidden shadow-sm">
        <span className="items-center gap-2 flex">
          Browse jobs <FaArrowDown className="text-blue-default" />
        </span>
        <span>Blog</span>
        <span>FAQs</span>
      </div>
    );
  } else if (isAunthenticated && role === "employer") {
    return (
      <div className="grid gap-xs py-md md:hidden">
     <span className="items-center gap-2 flex">
          Browse jobs <FaArrowDown className="text-blue-dark" />
        </span>
        <span>Blog</span>
        <span>FAQs</span>
       
      </div>
    );
  } else
    return (
      <div className="py-md grid gap-xs md:hidden ">
   
        <div className="flex gap-10 ">
        <Link
        onClick={() => setMenuOpen(false)}
                  to="/user/login"
                  className=" font-normal  border-[1px] border-blue-dark  rounded-sm p-xs px-md "
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
        <span className="flex items-center gap-2">
          Browse jobs <FaArrowDown className="text-blue-default" />
        </span>
        <span >Blog</span>
        <span>FAQs</span>
      </div>
    );
};

export default HiddenMenu;
