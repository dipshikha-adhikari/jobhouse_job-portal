import { forwardRef, useEffect, useRef, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { FaIndustry } from "react-icons/fa";
import { useQuery } from "react-query";
import livingroom from "../../../asstes/livingroom.avif";
import { AppliedJobs, IJob } from "../../../types/postgres/types";
import useStore from "../../../store/components";
import { publicRequest } from "../../../lib/axios";
import Error from "../../../components/ui/Error";
import AllJobs from "../components/AllJobs";
import TopCompanies from "../components/TopCompanies";
import Categories from "../../jobs/components/Categories";
import Industries from "../../jobs/components/Industries";
import JobsByTypeAndLevel from "../components/JobsByTypeAndLevel";
import Blogs from "../../blogs/components/Blogs";
import SearchBox from "../../../components/elements/box/SearchBox";
import { MainLayout } from "../../../components/layout";
import { useAppliedJobs } from "../../jobseeker/api/getAppliedJobs";
import JobBoxSkeleton from "../../../components/elements/skeleton/JobBoxSkeleton";
import CategorySkeleton from "../../../components/elements/skeleton/CategorySkeleton";

type AppliedJobsType = {
  jobs: AppliedJobs[];
  isLoading: boolean;
  isError: boolean;
};

const Landing = () => {
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
      <div className="grid h-screen overflow-hidden ">
        <Header ref={headerRef} />
        <div className="grid h-fit p-sm  justify-center  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-sm">
          <JobBoxSkeleton />
          <JobBoxSkeleton />
          <div className="h-fit  grid gap-xs w-full">
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
          </div>
        </div>
      </div>
    );

  if (isError) return <Error />;

  return (
    <MainLayout>
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
    </MainLayout>
  );
};

export default Landing;

const Header = forwardRef<HTMLDivElement>((props, ref) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "https://static.merojob.com/images/default_pp/header-image.png";
    img.onload = function () {
      if (imageRef.current) {
        imageRef.current.setAttribute("src", img.src);
      }
    };
  }, []);

  console.log(props);
  return (
    <header className=" justify-start  relative " ref={ref}>
      <img
        src={livingroom}
        alt=""
        loading="eager"
        className="h-full absolute z-[-10] top-0 left-auto w-full  object-cover"
      />
      <img
        src=""
        alt=""
        ref={imageRef}
        loading="eager"
        className=" h-[120px] mx-auto  object-cover"
      />
      <SearchBox />
    </header>
  );
});
