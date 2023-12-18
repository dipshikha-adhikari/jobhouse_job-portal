import { useQuery } from "react-query";
import { publicRequest } from "../../lib/axios";
import JobCard from "../../components/ui/JobCard";
import { IJob } from "../../types/postgres/types";
import Loader from "../../components/shared/Loader";
import Error from "../../components/shared/Error";
import Industries from "../../components/shared/Industries";
import Categories from "../../components/shared/Categories";

const Home = () => {


  const getAllJobs = async () => {
    const res = await publicRequest.get("/api/v1/jobs");
    return res.data;
  };
  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery<IJob[]>("allJobs", getAllJobs);



  if (isLoading) return <Loader />;
  if (isError) return <Error />;
  
  return (
    <div className="grid gap-sm">
      <header className=" justify-start  relative ">
        <img
          src="https://img.freepik.com/free-photo/living-room-product-backdrop-interior-background_53876-147964.jpg?size=626&ext=jpg"
          alt=""
          className=" absolute z-[-10] top-0 left-auto w-full h-full  object-cover"
        />
        <img
          src="https://static.merojob.com/images/default_pp/header-image.png"
          alt=""
          className=" max-h-[200px] mx-auto  object-cover"
        />
        <div className=" max-w-xl w-full mx-auto p-sm rounded-sm grid gap-sm place-items-center  z-50  bg-[rgba(0,0,0,0.3)] text-white  bottom-0">
          <div className="w-full max-w-md flex">
            <input type="text" className="outline-none w-full text-black-dark border-none p-sm" placeholder="Search by Job Title,  Skill or Organization" />
            <button className="bg-green-light text-white px-sm">Search</button>
          </div>
          <p>Search, Apply & Get Jobs in Nepal - Free</p>
      
        </div>
      </header>
      <section className="grid gap-lg lg:flex">
        <aside className="grid gap-md flex-1 h-fit">
          <header className="font-semibold border-y-sm border-default w-fit p-sm text-xl uppercase text-green-dark">
            Top jobs
          </header>
          <div className="grid gap-sm  grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {jobs?.map((job) => {
              return <JobCard job={job} key={job.job_id} />;
            })}
          </div>
          <div className="grid gap-sm ">
            <header className="font-semibold border-y-md border-default w-fit p-sm text-xl text-green-dark uppercase">
              Jobs By Industry
            </header>
            <Industries/>
          </div>
        </aside>
        <aside className="grid gap-sm flex-[0.3] h-fit">
          <div className="grid gap-xs  h-fit ">
            <header className="font-semibold border-y-sm uppercase border-default w-fit p-sm text-xl text-green-dark">
              Jobs By Category
            </header>
           <Categories/>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Home;
