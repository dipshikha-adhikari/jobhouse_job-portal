import { useEffect, useState } from "react";
import Categories from "../../../components/shared/Categories";
import Error from "../../../components/shared/Error";
import NoUser from "../../../components/shared/NoUser";
import Layout from "../../../components/ui/Layout";
import useAuthStore from "../../../store/auth";
import { IJobseekerProfile } from "../../../types/postgres/types";
import { useJobseekerProfile } from ".././hooks/useJobseekerProfile";

import { BiCategory } from "react-icons/bi";
import { FaIndustry } from "react-icons/fa";
import AlmostLoaded from "../../../components/shared/AlmostLoaded";
import Industries from "../../../components/shared/Industries";
import AppliedJobsTable from "./AppliedJobsTable";
import MatchingJobsTable from "./MatchingJobsTable";
import UserInfo from "./UserInfo";

type Profile = {
  profile: IJobseekerProfile;
  isLoading: boolean;
  isError: boolean;
};

const JobseekerOverview = () => {
  const [selected, setSelected] = useState("matchingJobs");
  const { profile, isLoading, isError }: Profile = useJobseekerProfile();
  const { isAunthenticated } = useAuthStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!isAunthenticated) return <NoUser />;
  if (isLoading) return <AlmostLoaded/>
  if (isError) return <Error />;

  return (
    <Layout>
      <div className=" sm:flex grid  md:justify-center md:gap-xs p-sm gap-sm ">
        <UserInfo profile={profile} />

        <section className="grid h-fit gap-xs  w-full  ">
          <div className="flex gap-4 h-fit w-full">
            <button
              className={` ${
                selected === "matchingJobs" &&
                "text-green-dark border-green-dark "
              }  p-xs font-semibold  `}
              onClick={() => setSelected("matchingJobs")}
            >
              Matching Jobs
            </button>
            <button
              className={` ${
                selected === "appliedJobs" &&
                "text-green-dark border-b-sm border-green-dark"
              } p-xs font-semibold  `}
              onClick={() => setSelected("appliedJobs")}
            >
              Applied Jobs
            </button>
          </div>

          <div className=" min-h-[300px] hidden sm:block min-w-[300px] ">
            {selected === "matchingJobs" && (
              <MatchingJobsTable profile={profile} />
            )}
            {selected === "appliedJobs" && <AppliedJobsTable />}
          </div>
        </section>
      </div>
      <div className=" h-fit sm:hidden  ">
        {selected === "matchingJobs" && <MatchingJobsTable profile={profile} />}
        {selected === "appliedJobs" && <AppliedJobsTable />}
      </div>

      <section className="grid pt-xl  gap-sm">
        <div className="border-sm   ">
          <header className="flex items-center gap-2 font-bold border-b-sm p-sm  uppercase text-black-default">
            <BiCategory className='text-green-dark'/> Jobs By Category
          </header>
          <Categories />
        </div>

        <div className=" border-sm ">
          <header className="flex items-center gap-2 border-b-sm  font-bold   p-sm  uppercase text-black-default">
            <FaIndustry className='text-green-dark' /> Jobs By Industry
          </header>
          <Industries />
        </div>
      </section>
    </Layout>
  );
};

export default JobseekerOverview;
