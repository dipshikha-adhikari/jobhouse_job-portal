import { useEffect, useRef, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { FaIndustry } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Categories from "../../components/shared/Categories";
import Industries from "../../components/shared/Industries";
import SearchBox from "../../components/ui/SearchBox";
import { publicRequest } from "../../lib/axios";
import AllJobs from "./AllJobs";
import TopCompanies from "./TopCompanies";


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
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);


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
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
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
       <TopCompanies/>
          {/* --------------------  */}
       
                <div className="border-sm   ">
                  <header className="flex items-center gap-2 font-bold border-b-sm p-sm    text-green-dark">
                    <BiCategory /> Jobs By Category
                  </header>
                  <Categories />
                </div>
        </section>
        {/* ----------------  */}
        <aside className="grid gap-sm w-fit flex-[0.4] h-fit ">
         
                <div className=" border-sm ">
                  <header className="flex items-center gap-2 border-b-sm  font-bold   p-sm  text-green-dark ">
                    <FaIndustry /> Jobs By Industry
                  </header>
                  <Industries />
                </div>
          {/* ---------------   */}
          <div className="flex flex-wrap gap-sm  ">
            <div className=" border-x-sm border-t-sm w-full max-w-sm ">
              <header className="flex border-b-sm p-sm items-center gap-2  font-bold   text-green-dark ">
                <FaIndustry /> Jobs By Level
              </header>

              <div className=" ">
                {levelsLoading && <div className="p-sm">Loading...</div>}
                {levelsError && !levels && <div className="p-sm">Error</div>}
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
                {typesError && !types && <div className="p-sm">Error</div>}
                {types?.map((type) => {
                  return (
                    <Link
                      to={`/jobs/?type=${type.type_name}`}
                      key={type.type_id}
                      className="text-black-light  p-sm pb-xs hover:text-black-dark border-b-sm rounded-sm  font-normal  flex items-center gap-sm"
                    >
                      {type.type_name}{" "}
                      <span className="text-green-dark">
                        ({type.total_jobs})
                      </span>
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
