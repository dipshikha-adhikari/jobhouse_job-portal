import { forwardRef, useEffect, useRef } from "react";
import { BiCategory } from "react-icons/bi";
import { FaIndustry } from "react-icons/fa";
import livingroom from "../../../asstes/livingroom.avif";
import SearchBox from "../../../components/elements/box/SearchBox";
import CategorySkeleton from "../../../components/elements/skeleton/CategorySkeleton";
import JobBoxSkeleton from "../../../components/elements/skeleton/JobBoxSkeleton";
import { MainLayout } from "../../../components/layout";
import Error from "../../../components/ui/Error";
import Blogs from "../../blogs/components/Blogs";
import Categories from "../../jobs/components/Categories";
import Industries from "../../jobs/components/Industries";
import AllJobs from "../components/AllJobs";
import JobsByTypeAndLevel from "../components/JobsByTypeAndLevel";
import TopCompanies from "../components/TopCompanies";
import { useHomePageController } from "../controllers/useHomeController";

const Home = () => {
  const {
    jobs,
    isLoading,
    isError,
    appliedJobs,
    headerRef,
    headerHeight,
    offset,
    setOffset,
    limit,
    companies,
    loadingCompanies,
    errorCompanies,
    jobsCount,
    isJobsFetched,
  } = useHomePageController();
  console.log(errorCompanies);
  if (isLoading && !isJobsFetched)
    return (
      <div className="grid h-screen overflow-hidden ">
        <Header ref={headerRef} />
        <div className="grid h-fit p-sm py-md justify-center  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-sm">
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
              jobsCount={jobsCount?.count}
            />
            {
              <TopCompanies
                companies={companies}
                loadingCompanies={loadingCompanies}
                errorCompanies={errorCompanies}
              />
            }
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
        {<Blogs />}
      </div>
    </MainLayout>
  );
};

export default Home;

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
