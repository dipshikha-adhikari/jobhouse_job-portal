import errorImage from '../../asstes/error.avif';
const Error = () => {
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
