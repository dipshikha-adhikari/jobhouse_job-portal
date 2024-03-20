const JobBoxSkeleton = () => {
  return (
    <div className="grid job-box-skeleton gap-xs h-fit mx-auto  w-full  ">
      <div className="h-60  bg-gray-300 "></div>
      <section className="grid gap-xs ">
        <div className="w-full  h-6 bg-gray-300"></div>
        <div className="w-40 h-6 bg-gray-300"></div>
      </section>
    </div>
  );
};

export default JobBoxSkeleton;
