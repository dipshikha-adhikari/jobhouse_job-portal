import { useCurrentUser } from "../../hooks/useCurrentUser";
import { MdLocationPin } from "react-icons/md";
import { FaEnvelope } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Layout from "../../components/ui/Layout";
import { useProfile } from "./hooks/useEmployerProfile";
import Error from "../../components/shared/Error";
import Loader from "../../components/shared/Loader";
import RecentJobs from "./RecentJobs";
import { useEffect } from "react";
import { CiStar } from "react-icons/ci";
import useAuthStore from "../../store/auth";
import NoUser from "../../components/shared/NoUser";

const Profile = () => {
  const user = useCurrentUser();
  const { profile, isLoading, error } = useProfile();
  const { isAunthenticated } = useAuthStore();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <Loader />;
  if (!isAunthenticated) return <NoUser />;
  if (!isLoading && (error || profile?.user_id === undefined)) return <Error />;

  return (
    <Layout>
      <div className="grid break-all gap-sm lg:flex lg:gap-md">
        <section className="grid gap-2 flex-1 h-fit">
          <header className="relative h-full">
            <div className="cover-image">
              <img
                src={
                  profile?.cover_image.url
                    ? profile.cover_image.url
                    : "https://w0.peakpx.com/wallpaper/718/147/HD-wallpaper-beautiful-really-cool-unique-blue-thumbnail.jpg"
                }
                alt=""
                className="min-w-full h-full max-h-[300px] object-cover relative "
              />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-sm">
              <img
                src={
                  profile?.image.url
                    ? profile.image.url
                    : "https://media.istockphoto.com/id/1340893300/vector/technology-logo-design-template-networking-vector-logo-design.jpg?s=612x612&w=0&k=20&c=-8XBWFDRAAYe3leL4nuMnei0wWpL6-IqsPCAbWIhASk="
                }
                alt=""
                className="h-20 w-20 sm:w-[100px] sm:h-[100px] rounded-full object-cover"
              />
            </div>
            <Link
              to="/employer/profile/basic-info"
              className="absolute right-2 bottom-2 bg-blue-light rounded-sm text-white hover:text-white px-sm p-xs"
            >
              Edit Profile
            </Link>
          </header>
          <div className="grid gap-2  border-b-sm  pb-sm place-items-center">
            <p className="font-semibold text-xl">
              {profile?.basic_information?.organization_name
                ? profile?.basic_information?.organization_name
                : user.fullName}
            </p>
            {profile?.basic_information?.industry_type && (
              <p>{profile?.basic_information?.industry_type}</p>
            )}
            {profile?.other_information?.website && (
              <p>{profile?.other_information?.website}</p>
            )}
          </div>
          <div className="grid gap-2 place-items-center border-b-sm  pb-sm">
            <p className="flex items-center gap-xs">
              <MdLocationPin className="text-blue-dark" />{" "}
              {profile?.basic_information?.address || "Not available"}
            </p>
            <p className="flex items-center gap-xs">
              <FaEnvelope className="text-blue-dark" /> {user.email}
            </p>
            <p className="flex items-center gap-xs">
              <FaPhoneAlt className="text-blue-dark" />
              {profile?.basic_information?.phone_number || user.phoneNumber}
            </p>
          </div>
          <div className="grid gap-xs ">
            <h2 className="font-semibold text-xl ">About</h2>
            {profile?.basic_information?.summary ? (
              profile.basic_information.summary
            ) : (
              <div className="grid gap-sm">
                Please update your profile to post a job.
                <Link
                  to="/employer/profile/basic-info"
                  className=" bg-blue-dark text-white hover:text-white px-sm p-xs w-fit"
                >
                  Update now
                </Link>
              </div>
            )}
          </div>
        </section>
        <div className="grid border-sm h-fit flex-[0.6] ">
          <div className="grid ">
            <h2 className="flex p-sm  text-green-dark items-center text-center gap-2 font-bold  border-b-sm  ">
              <CiStar /> Recent Jobs
            </h2>
          </div>
          <div className="p-sm">
            <RecentJobs employerId={profile?.user_id} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
