import { useState, useEffect } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Layout from "../../components/ui/Layout";
import { MdWork } from "react-icons/md";
import { FaPlus, FaUser } from "react-icons/fa";
import RecentJobs from "./RecentJobs";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useProfile } from "./hooks/useEmployerProfile";
import AllJobs from "./AllJobs";
import Error from "../../components/shared/Error";
import Loader from "../../components/shared/Loader";
import { useQuery } from "react-query";
import { privateRequest } from "../../lib/axios";
import { useRecentJobs } from "./hooks/useRecentJobs";

const Overview = () => {
  const [selected, setSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useCurrentUser();
  const loading = !user;
  const navigate = useNavigate();
  const { profile, isLoading } = useProfile();
  const { jobs } = useRecentJobs(profile?.user_id);
  const { data: vacancies } = useQuery(["vacancies", user], async () => {
    const result = await privateRequest.get("/api/v1/employer/vacancies");
    return result.data;
  });
  const { data: applicants } = useQuery(["applicants", user], async () => {
    const result = await privateRequest.get("/api/v1/employer/applicants");
    return result.data;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCreate = () => {
    if (!profile?.basic_information.id) {
      toast.error("Update profile first");
    } else {
      navigate("/jobs/create");
    }
  };

  useEffect(() => {
    if (profile?.basic_information.id) {
      setSelected("recent");
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  }, [profile]);

  if (isLoading || loading) return <Loader />;

  if (user.role !== "employer") return <Error />;

  return (
    <Layout>
      <div className="relative py-md grid gap-sm">
        <header className="relative h-full grid gap-xs  place-items-center border-b-sm border-default pb-sm ">
          <img
            src={
              profile?.image?.url
                ? profile.image.url
                : "https://template.canva.com/EAENvp21inc/1/0/1600w-qt_TMRJF4m0.jpg"
            }
            alt=""
            className="w-20 h-20 "
          />
          <div className="grid gap-1 place-items-center">
            <p className="font-semibold text-xl">
              {profile?.basic_information?.organization_name
                ? profile.basic_information.organization_name
                : user.fullName}
            </p>
            <p className="text-gray-dark">
              {profile?.basic_information?.industry_type}
            </p>
            <p>
              {profile?.basic_information?.phone_number || user.phoneNumber}
            </p>
            <p>{profile?.basic_information?.email || user.email}</p>
          </div>
        </header>

        <section className="grid sm:px-md gap-md md:flex items-start justify-between">
          <div className=" grid gap-xs   sm:flex-[0.4] max-w-xs w-full ">
            <div className="grid gap-xs  shadow-sm p-sm">
              <p className="flex items-center gap-sm">
                <MdWork className="text-blue-dark" /> {jobs?.length}
              </p>
              <p>Current jobs</p>
            </div>
            <div className="grid gap-xs shadow-sm p-sm">
              <p className="flex items-center gap-sm">
                <MdWork className="text-orange-default" />{" "}
                {vacancies?.total_vacancy_count}
              </p>
              <p>Total Vacancies</p>
            </div>
            <div className="grid gap-xs shadow-sm p-sm">
              <p className="flex items-center gap-sm">
                <FaUser className="text-blue-default" /> {applicants?.length}
              </p>
              <p>Total Applicants</p>
            </div>
          </div>

          <div className="grid gap-sm  flex-1">
            <header className="border-y-sm uppercase text-green-dark font-semibold py-sm w-fit">
              About your jobs
            </header>
            <nav className="flex gap-sm flex-wrap items-center ">
              <span
                className={`${
                  selected === "recent" && "border-b-2 border-blue-dark"
                } cursor-pointer`}
                onClick={() => setSelected("recent")}
              >
                Recent
              </span>
              <span
                className={`${
                  selected === "all" && "border-b-2 border-blue-dark "
                } cursor-pointer`}
                onClick={() => setSelected("all")}
              >
                All
              </span>

              <button
                className="flex items-center gap-2 bg-orange-light text-white px-sm rounded-sm p-xs"
                onClick={handleCreate}
              >
                new <FaPlus />{" "}
              </button>
            </nav>
            <section className="grid gap-sm">
              {selected === "recent" && (
                <RecentJobs employerId={profile?.user_id} />
              )}
              {selected === "all" && <AllJobs employerId={profile?.user_id} />}
              {isModalOpen && (
                <div className="grid gap-sm">
                  <p>Please update your profile to post a job.</p>
                  <Link
                    to="/employer/profile/basic-info"
                    className="bg-blue-dark w-fit text-white hover:text-white p-xs px-sm rounded-sm "
                  >
                    Update now
                  </Link>
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Overview;
