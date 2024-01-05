import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { privateRequest, setAuthToken } from "../lib/axios";
import useAuthStore from "../store/auth";

export const useLogout = () => {
    const authStore = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try{
    toast.promise(privateRequest.post('/api/v1/auth/logout'),{
      loading:'Processing',
      success:() => {
        setAuthToken(null);
        localStorage.removeItem("userInfo");
        authStore.setAuthentication(false);
        navigate("/");
        return 'Logout success'
      },error:(er) => {
    console.log(er)
        return 'Logout failed'
      }
    })
        }catch(err){
          console.log(err)
          return 'Logout failed'
        }
      
      };

      return {handleLogout}

}