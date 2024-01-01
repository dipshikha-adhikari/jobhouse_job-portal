import { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { CiStar } from "react-icons/ci";
import { FaIndustry } from "react-icons/fa";
import { MdHomeWork } from "react-icons/md";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Categories from "../../components/shared/Categories";
import Error from "../../components/shared/Error";
import Industries from "../../components/shared/Industries";
import JobCard from "../../components/shared/JobCard";
import Loader from "../../components/shared/Loader";
import SearchBox from "../../components/ui/SearchBox";
import { publicRequest } from "../../lib/axios";
import { AppliedJobs, IJob } from "../../types/postgres/types";
import { useAppliedJobs } from "../jobseeker/hooks/useAppliedJobs";

type AppliedJobsType = {
  jobs: AppliedJobs[];
  isLoading: boolean;
  isError: boolean;
};

type TopComapny = {
  user_id: string;
  organization_name: string;
  image_url: string;
  industry_name: string;
  job_count: string;
};

const Home = () => {
  const { jobs: appliedJobs }: AppliedJobsType = useAppliedJobs();
  const [appliedIds, setAppliedIds] = useState<number[]>([]);
  const getAllJobs = async () => {
    const res = await publicRequest.get("/api/v1/jobs");
    return res.data;
  };
  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery<IJob[]>("allJobs", getAllJobs);

  const getTopCompanies = async () => {
    const result = await publicRequest.get("/api/v1/topEmployers");
    return result.data;
  };
  const {
    data: companies,
    isLoading: loadingComapnies,
    isError: errorComapnies,
  } = useQuery("topComapnies", getTopCompanies);

  useEffect(() => {
    appliedJobs?.map((item) => {
      if (!appliedIds.includes(item?.job_id)) {
        setAppliedIds((prev: number[]) => [...prev, item.job_id]);
      }
    });
  }, [appliedJobs]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className="grid gap-sm ">
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
        <SearchBox />
      </header>
      <section className="grid gap-lg mx-auto lg:flex">
        <aside className="grid gap-md flex-1 h-fit sm:px-md">
          <header className="font-semibold border-y-sm flex items-center gap-2  w-fit p-xs text-xl uppercase text-green-dark">
            <CiStar className="text-green-dark" /> Top jobs
          </header>
          <div className="grid gap-sm  grid-cols-auto-sm ">
            {jobs?.map((job) => {
              return (
                <JobCard appliedJobs={appliedJobs} job={job} key={job.job_id} />
              );
            })}
          </div>
          <div className="grid py-xl gap-md">
            <h2 className=" uppercase font-semibold text-green-dark text-xl border-y-md w-fit p-xs  flex items-center gap-2">
              {" "}
              <MdHomeWork />
              Top Companies
            </h2>
            <div className="grid gap-sm  grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
              {loadingComapnies && <div className="">Loading...</div>}
              {errorComapnies && <div className="">Error</div>}
              {companies?.map((item: TopComapny) => {
                return (
                  <Link
                    key={item.user_id}
                    to={`/employer/${item.organization_name}/${item.user_id}`}
                    className="grid gap-2 shadow-xxl text-black-dark max-w-sm hover:text-black-dark  border-xs  p-sm place-content-start"
                  >
                    <div className="flex items-start gap-xs">
                      <img
                        src={item.image_url}
                        alt="image"
                        className="w-20 h-20"
                      />
                      <p className="grid gap-2">
                        <span className="font-bold">
                          {item.organization_name}{" "}
                        </span>
                        <span className=" font-normal">
                          {" "}
                          ({item.industry_name})
                        </span>
                      </p>
                    </div>
                    <p className="text-green-dark font-semibold">
                      {" "}
                      {item.job_count} jobs
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="grid gap-sm ">
            <header className="flex items-center gap-2  font-semibold border-y-md  w-fit p-xs text-xl text-green-dark uppercase">
              <FaIndustry /> Jobs By Industry
            </header>
            <Industries />
          </div>
        </aside>
        <aside className="grid gap-sm flex-[0.3] h-fit mx-auto">
          <div className="grid gap-sm sm:px-md h-fit ">
            <header className="flex items-center gap-2 font-semibold border-y-sm uppercase  w-fit p-xs text-xl text-green-dark">
              <BiCategory /> Jobs By Category
            </header>
            <Categories />
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Home;
