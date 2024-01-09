import { useEffect, useRef, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { FaIndustry } from "react-icons/fa";
import { MdHomeWork } from "react-icons/md";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Categories from "../../components/shared/Categories";
import Industries from "../../components/shared/Industries";
import SearchBox from "../../components/ui/SearchBox";
import { publicRequest } from "../../lib/axios";
import AllJobs from "./AllJobs";


type TopComapny = {
  user_id: string;
  organization_name: string;
  image_url: string;
  industry_name: string;
  job_count: string;
};

type Levels = {
  level_id: string;
  level_name: string;
  total_jobs: string;
};

type Types = {
  type_id: string;
  type_name: string;
  total_jobs: string;
};

const Home = () => {
const  headerRef = useRef<HTMLDivElement>(null)  
const [headerHeight, setHeaderHeight] = useState(0)

  const getTopCompanies = async () => {
    const result = await publicRequest.get("/api/v1/topEmployers");
    return result.data;
  };
  const {
    data: companies,
    isLoading: loadingComapnies,
    isError: errorComapnies,
  } = useQuery("topComapnies", getTopCompanies);

  const {
    data: levels,
    isLoading: levelsLoading,
    isError: levelsError,
  } = useQuery<Levels[]>("levels", async () => {
    const result = await publicRequest.get("/api/v1/jobs/levels/jobscount");
    return result.data;
  });

  const {
    data: types,
    isLoading: typesLoading,
    isError: typesError,
  } = useQuery<Types[]>("types", async () => {
    const result = await publicRequest.get("/api/v1/jobs/types/jobscount");
    return result.data;
  });

  useEffect(() => {
  if(headerRef.current){
    setHeaderHeight(headerRef.current.offsetHeight)
  }
    window.scrollTo(0, 0);
  }, [headerRef]);

  return (
    <div className="grid gap-sm ">
      <header className=" justify-start  relative " ref={headerRef}>
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
      <main className="grid gap-sm  lg:flex ">
        <section className="grid gap-sm flex-1 h-fit ">
        {/* ---------------- */}
       <AllJobs height={headerHeight} />

          {/* ------------------ */}

          <div className="  border-sm ">
            <header className="border-b-sm  font-bold text-green-dark xl:text-xl  p-sm  flex items-center gap-2">
              {" "}
              <MdHomeWork />
              Top Companies
            </header>
            <div className="grid gap-xs p-sm grid-cols-[repeat(auto-fit,minmax(200px,1fr))] ">
              {loadingComapnies && <div className="">Loading...</div>}
              {(errorComapnies && !companies) && <div className="">Error</div>}
              {companies?.map((item: TopComapny) => {
                return (
                  <Link
                    key={item.user_id}
                    to={`/employer/${item.organization_name}/${item.user_id}`}
                    className="grid gap-2 shadow-sm w-full text-black-default max-w-sm hover:text-black-dark    p-sm place-content-start"
                  >
                    <div className="flex items-start gap-xs">
                      <img
                        src={item.image_url}
                        alt="image"
                        className="w-20 h-20"
                      />
                      <p className="grid gap-2">
                        <span className="font-bold text-black-light">
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
          {/* --------------------  */}
          <div className=" border-sm ">
            <header className="flex items-center gap-2 border-b-sm  font-bold   p-sm  text-green-dark ">
              <FaIndustry /> Jobs By Industry
            </header>
            <Industries />
          </div>
        </section>
        {/* ----------------  */}
        <aside className="grid gap-sm w-fit flex-[0.4] h-fit ">
          <div className="border-sm   ">
            <header className="flex items-center gap-2 font-bold border-b-sm p-sm    text-green-dark">
              <BiCategory /> Jobs By Category
            </header>
            <Categories />
          </div>
          {/* ---------------   */}
         <div className="flex flex-wrap gap-sm  ">
         <div className=" border-x-sm border-t-sm w-full max-w-sm ">
            <header className="flex border-b-sm p-sm items-center gap-2  font-bold   text-green-dark ">
              <FaIndustry /> Jobs By Level
            </header>

            <div className=" ">
              {levelsLoading && <div className="p-sm">Loading...</div>}
              {(levelsError && !levels) && <div className="p-sm">Error</div>}
              {levels?.map((level) => {
                return (
                  <Link
                    to={`/jobs/?level=${level.level_name}`}
                    key={level.level_id}
                    className="text-black-light border-b-sm p-sm pb-xs font-normal flex items-center gap-sm hover:text-black-dark "
                  >
                    {level.level_name}{" "}
                    <span className="text-green-dark">
                      ({level.total_jobs})
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className=" border-x-sm border-t-sm w-full max-w-sm">
            <header className="flex items-center gap-2  font-semibold border-b-sm  p-sm  text-green-dark ">
              <FaIndustry /> Jobs By Employment Type
            </header>

            <div className="">
              {typesLoading && <div className="p-sm">Loading...</div>}
              {(typesError && !types) && <div className="p-sm">Error</div>}
              {types?.map((type) => {
                return (
                  <Link
                    to={`/jobs/?type=${type.type_name}`}
                    key={type.type_id}
                    className="text-black-light  p-sm pb-xs hover:text-black-dark border-b-sm rounded-sm  font-normal  flex items-center gap-sm"
                  >
                    {type.type_name}{" "}
                    <span className="text-green-dark">({type.total_jobs})</span>
                  </Link>
                );
              })}
            </div>
          </div>
         </div>
        </aside>
      </main>
    </div>
  );
};

export default Home;
