import { useEffect } from "react";
import { CiStar } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { UseQueryResult, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecentJobs } from "../api/getRecentJobs";
import { useAppliedJobs } from "../../jobseeker/api/getAppliedJobs";
import { IEmployerProfile } from "../../../../types/postgres/types";
import { publicRequest } from "../../../../lib/axios";
import AlmostLoaded from "../../../../components/elements/loader/AlmostLoaded";
import Error from "../../../../components/ui/Error";
import JobCard from "../../../../components/ui/JobCard";

const PublicProfile = () => {
  const params = useParams();
  const id = params.id;
  const {
    jobs,
    isLoading: loadingRecentJobs,
    isError: errorRecentJobs,
  } = useRecentJobs(id);

  const { jobs: appliedJobs } = useAppliedJobs();

  const {
    data: profile,
    isLoading,
    isError,
  }: UseQueryResult<IEmployerProfile> = useQuery(["profile", id], async () => {
    const result = await publicRequest.get(`/api/v1/employer/profile/${id}`);
    return result.data;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <AlmostLoaded />;
  if (isError || profile?.user_id === undefined) return <Error />;

  return (
    <div className="grid overflow-auto gap-sm lg:flex ">
      <section className="grid gap-xs  flex-[1.7] h-fit">
        <header className="relative  h-full">
          <div className="cover-image">
            <img
              src={
                profile?.cover_image?.url
                  ? profile?.cover_image.url
                  : "https://w0.peakpx.com/wallpaper/718/147/HD-wallpaper-beautiful-really-cool-unique-blue-thumbnail.jpg"
              }
              alt=""
              className="w-full h-full max-h-[250px] object-cover relative  "
            />
          </div>

          <div className="absolute top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2 flex gap-sm">
            <img
              src={
                profile?.image?.url
                  ? profile?.image.url
                  : "https://media.istockphoto.com/id/1340893300/vector/technology-logo-design-template-networking-vector-logo-design.jpg?s=612x612&w=0&k=20&c=-8XBWFDRAAYe3leL4nuMnei0wWpL6-IqsPCAbWIhASk="
              }
              alt=""
              className="h-20  w-20 rounded-sm object-contain"
            />
          </div>
        </header>
        <div className="grid gap-2 border-b-sm pb-sm   place-items-center">
          <h2 className="font-semibold text-xl">
            {profile?.basic_information?.organization_name}
          </h2>
          <p>{profile?.basic_information?.industry_type}</p>
          <p>{profile?.other_information?.website}</p>
        </div>
        <div className="grid gap-2 place-items-center border-b-sm  pb-sm">
          <p className="flex items-center gap-xs">
            <MdLocationPin className="text-blue-dark" />{" "}
            {profile?.basic_information?.address || "Not available"}
          </p>
          <p className="flex items-center gap-xs">
            <FaEnvelope className="text-blue-dark" />{" "}
            {profile?.basic_information?.email || "Not available"}
          </p>
          <p className="flex items-center gap-xs">
            <FaPhoneAlt className="text-blue-dark" />
            {profile?.basic_information?.phone_number || "Not available"}
          </p>
        </div>
        <div className="grid gap-xs">
          <h2 className="font-semibold text-xl">About</h2>
          {profile?.basic_information?.summary ? (
            profile.basic_information.summary
          ) : (
            <div className="grid gap-sm">No summary available!</div>
          )}
        </div>
      </section>
      <section className="  h-fit">
        <div className=" border-sm lg:w-[350px] ">
          <h2 className=" gap-2  flex items-center p-sm border-b-sm uppercase font-bold">
            <CiStar className="text-green-dark" /> Recent jobs by{" "}
            {profile?.basic_information?.organization_name}
          </h2>
          <div className="grid gap-xs p-sm sm:grid-cols-auto-sm">
            {loadingRecentJobs && <div className="text-center">Loading...</div>}
            {errorRecentJobs && jobs === undefined && (
              <div className="text-center">Error!</div>
            )}
            {jobs?.slice(0, 2)?.map((item) => {
              return (
                <JobCard
                  job={item}
                  key={item.job_id}
                  appliedJobs={appliedJobs}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicProfile;
