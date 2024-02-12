import { useEffect } from 'react';
import errorImage from '../../asstes/error.avif';
const Error = () => {

  useEffect(() => {
window.scrollTo(0,0)
  },[])

  return (
    <div className="grid place-items-center h-[80vh]">
      <img
        src={errorImage}
        loading='lazy'
        alt="error"
        className="w-full text-orange-dark rounded-md overflow-hidden py-sm object-contain max-h-[400px]"
      />
    </div>
  );
};

export default Error;
