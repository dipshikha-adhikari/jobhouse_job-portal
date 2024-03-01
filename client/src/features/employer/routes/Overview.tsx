import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaUser } from "react-icons/fa";
import { MdRoundaboutLeft, MdWork } from "react-icons/md";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import AllJobs from "../components/AllJobs";
import RecentJobs from "../components/RecentJobs";
import { useRecentJobs } from "../api/getRecentJobs";
import { useProfile } from "../api/getProfile";
import { useCurrentUser } from "../../auth/api/getUser";
import { privateRequest } from "../../../lib/axios";
import AlmostLoaded from "../../../components/elements/loader/AlmostLoaded";
import Error from "../../../components/ui/Error";
import ContentLayout from "../../../components/layout/ContentLayout";

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
      toast.error("Update basic information first");
    } else {
      navigate("/employer/jobs/create");
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

  if (isLoading || loading) return <AlmostLoaded />;
  if (user.role !== "employer") return <Error />;

  return (
    <ContentLayout>
      <div className="relative py-md grid gap-sm">
        <header className="relative h-full grid gap-xs md:flex flex-row-reverse overflow-hidden  ">
          <div className=" flex-1 rounded-sm overflow-hidden grid place-items-center text-white py-sm relative">
            <img
              src="https://t3.ftcdn.net/jpg/03/44/06/44/360_F_344064489_6oeUMK2i2KwHtBQOIhmkNZO696NJmkQj.webp"
              alt=""
              className="absolute w-full h-full -z-20 top-0 left-0 object-cover "
            />

            <img
              src={
                profile?.image?.url
                  ? profile.image.url
                  : "https://template.canva.com/EAENvp21inc/1/0/1600w-qt_TMRJF4m0.jpg"
              }
              alt=""
              className="w-20 h-20  rounded-full "
            />
            <div className="grid gap-1 p-xs place-items-center">
              <p className="font-semibold text-xl">
                {profile?.basic_information?.organization_name
                  ? profile.basic_information.organization_name
                  : user.fullName}
              </p>
              <p className="">{profile?.basic_information?.industry_type}</p>
              <p>
                {profile?.basic_information?.phone_number || user.phoneNumber}
              </p>
              <p>{profile?.basic_information?.email || user.email}</p>
            </div>
          </div>

          <div className=" grid gap-xs flex-[0.5] place-items-center">
            <div className="grid gap-xs border-sm  max-w-sm  w-full p-sm">
              <p className="flex items-center gap-sm">
                <MdWork className="text-blue-dark" /> {jobs?.length || 0}
              </p>
              <p>Current jobs</p>
            </div>
            <div className="grid gap-xs border-sm  max-w-sm w-full  p-sm">
              <p className="flex items-center gap-sm">
                <MdWork className="text-green-dark" />{" "}
                {vacancies?.total_vacancy_count || 0}
              </p>
              <p>Total Vacancies</p>
            </div>
            <div className="grid gap-xs border-sm max-w-sm w-full p-sm">
              <p className="flex items-center gap-sm">
                <FaUser className="text-blue-light" /> {applicants?.length || 0}
              </p>
              <p>Total Applicants</p>
            </div>
          </div>
        </header>

        <section className="border-sm  ">
          <header className="border-b-sm uppercase font-bold text-black-default flex items-center gap-2 py-md  p-sm">
            <MdRoundaboutLeft className="text-green-light" /> Your jobs
          </header>
          <nav className="flex gap-sm p-sm py-md border-b-sm flex-wrap items-center text-black-light ">
            <span
              className={`${
                selected === "recent" && "font-semibold text-black-dark"
              } cursor-pointer`}
              onClick={() => setSelected("recent")}
            >
              Recent
            </span>
            <span
              className={`${
                selected === "all" && "font-semibold text-black-dark "
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
          <section className="grid p-md h-fit  gap-sm">
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
        </section>
      </div>
    </ContentLayout>
  );
};

export default Overview;
