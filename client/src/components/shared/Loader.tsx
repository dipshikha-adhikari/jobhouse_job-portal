import { useEffect } from "react";
import "../../styles/loading.css";
const Loader = () => {

  useEffect(() => {
window.scrollTo(0,0)
  },[])
  
  return (
    <div>
      <div className="min-h-[80vh] flex justify-center items-center">
        <div className="loader one w-10  h-10 relative">
          <span className="w-full h-full top-0 left-0 rounded-full  absolute bg-green-dark"></span>
          <span className="backdrop-blur-sm  bg-[rgba(50,100,200,0.2)] w-full h-full top-0 left-1/2 rounded-full  absolute"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
