import { forwardRef, useEffect, useRef, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { FaIndustry } from "react-icons/fa";
import { useQuery } from "react-query";
import running from "../../asstes/icons8-running.gif";
import livingroom from "../../asstes/livingroom.avif";
import Blogs from "../../components/shared/Blogs";
import Categories from "../../components/shared/Categories";
import Error from "../../components/shared/Error";
import Industries from "../../components/shared/Industries";
import SearchBox from "../../components/ui/SearchBox";
import { publicRequest } from "../../lib/axios";
import useStore from "../../store/store";
import { AppliedJobs, IJob } from "../../types/postgres/types";
import { useAppliedJobs } from "../jobseeker/hooks/useAppliedJobs";
import AllJobs from "./AllJobs";
import JobsByTypeAndLevel from "./JobsByTypeAndLevel";
import TopCompanies from "./TopCompanies";

type AppliedJobsType = {
  jobs: AppliedJobs[];
  isLoading: boolean;
  isError: boolean;
};

const Home = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const { isJobsFetched } = useStore();

  const { jobs: appliedJobs }: AppliedJobsType = useAppliedJobs();
  const [offset, setOffset] = useState(0);
  const limit = 6;

  const getAllJobs = async () => {
    const res = await publicRequest.get(
      `/api/v1/jobs/?limit=${limit}&offset=${offset}`
    );

    return res.data;
  };
  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery<IJob[]>(["allJobs", offset], getAllJobs);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    window.scrollTo(0, 0);
  }, [headerRef]);

  if (isLoading && !isJobsFetched)
    return (
      <div>
        <Header ref={headerRef}/>
        <img src={running} alt="" className="w-12 h-12 mx-auto p-sm" />
      </div>
    );

  if (isError) return <Error />;

  return (
    <div className="grid gap-sm ">
      <Header ref={headerRef} />
      <main className="grid gap-sm  lg:flex ">
        <section className="grid gap-sm flex-1 h-fit ">
          <AllJobs
            isError={isError}
            isLoading={isLoading}
            height={headerHeight}
            jobs={jobs}
            limit={limit}
            offset={offset}
            setOffset={setOffset}
            appliedJobs={appliedJobs}
          />
          {<TopCompanies />}
          <div className="border-sm   ">
            <header className="flex items-center gap-2 font-bold border-b-sm p-sm  uppercase">
              <BiCategory className="text-green-dark " /> Jobs By Category
            </header>
            <Categories />
          </div>
        </section>
        <aside className="grid gap-sm w-fit flex-[0.4] h-fit ">
          <div className=" border-sm ">
            <header className="flex items-center gap-2 border-b-sm  font-bold uppercase  p-sm  ">
              <FaIndustry className="text-green-dark " /> Jobs By Industry
            </header>
            <Industries />
          </div>
          {<JobsByTypeAndLevel />}
        </aside>
      </main>
      {isJobsFetched && <Blogs />}
    </div>
  );
};

export default Home;

const Header = forwardRef<HTMLDivElement>((props,ref) => {
  console.log(props)
  return (
    <header className=" justify-start  relative " ref={ref}>
      <img
        src={livingroom}
        alt=""
        className="h-full absolute z-[-10] top-0 left-auto w-full  object-cover"
      />
      <img
        src="https://static.merojob.com/images/default_pp/header-image.png"
        alt=""
        className=" h-[120px] mx-auto  object-cover"
      />
      <SearchBox />
    </header>
  );
})
