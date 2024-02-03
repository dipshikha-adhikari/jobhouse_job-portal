import moment from "moment";
import { useEffect } from "react";
import {
  CiCalendar,
  CiCircleCheck,
  CiLocationOn,
  CiUser,
} from "react-icons/ci";
import {
  FaArrowAltCircleDown,
  FaRegCalendarAlt,
  FaRegEdit,
} from "react-icons/fa";
import { GiFlagObjective, GiSkills } from "react-icons/gi";
import { GrCertificate } from "react-icons/gr";
import {
  MdOutlineMapsHomeWork,
  MdOutlineRoomPreferences,
} from "react-icons/md";
import { SlGraduation } from "react-icons/sl";
import { Link } from "react-router-dom";
import AlmostLoaded from "../../components/shared/AlmostLoaded";
import Error from "../../components/shared/Error";
import NoUser from "../../components/shared/NoUser";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import useAuthStore from "../../store/auth";
import {
  IJobseekerEducation,
  IJobseekerProfile,
} from "../../types/postgres/types";
import { useJobseekerProfile } from "./hooks/useJobseekerProfile";

type Profile = {
  profile: IJobseekerProfile;
  isLoading: boolean;
  isError: boolean;
};

const Profile = () => {
  const { profile, isLoading, isError }: Profile = useJobseekerProfile();
  const { fullName, phoneNumber, email } = useCurrentUser();
  const { isAunthenticated } = useAuthStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <AlmostLoaded/>
  if (!isAunthenticated) return <NoUser />;
  if (profile?.user_id === undefined || isError) return <Error />;

  return (
    <div className="sm:px-xl p-sm  lg:border-sm lg:p-xl max-w-4xl w-full mx-auto">
      <div className="flex justify-end  ">
        <Link
          to="/jobseeker/profile/basic-info"
          className=" flex items-center gap-xs border-sm p-xs border-green-dark text-green-dark hover:text-green-light px-sm"
        >
          <FaRegEdit /> Edit
        </Link>
      </div>
      <div className="grid  gap-md  ">
        <section>
          <img
            src={
              profile.basic_information?.image?.url ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqZYAYrmuzw5vIhNRWG2f436EKH4LqTUAFhLDWd2yRNA&s"
            }
            alt=""
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="grid gap-2 ">
            <div className="font-semibold flex gap-2">
              {profile?.basic_information?.gender === "male" && <span>MR</span>}
              {profile?.basic_information?.gender === "female" && (
                <span>MRS</span>
              )}
              {profile?.basic_information?.fullname || fullName}
            </div>
            <p>
              Current Address :{" "}
              {profile?.basic_information?.current_address || "Not available"}
            </p>

            <p>
              Phone : {profile?.basic_information?.phone_number || phoneNumber}
            </p>
            <p>Email : {email}</p>
            <p>
              Date of Birth :{" "}
              {profile?.basic_information?.date_of_birth
                ? moment(profile?.basic_information?.date_of_birth).format(
                    "YYYY-MM-DD",
                  )
                : "Not available"}
            </p>
          </div>
        </section>

        <section className="">
          <header className="font-semibold  uppercase text-xl flex gap-xs items-center">
            <GiFlagObjective /> Objective
          </header>
          <p className="py-md break-all">
            {profile?.job_preference?.summary || "Not available"}
          </p>
        </section>
        <section className="grid gap-xs ">
          <header className="font-semibold text-xl uppercase flex items-center gap-xs">
            <MdOutlineMapsHomeWork /> Work Experience
          </header>
          {profile?.experience.length > 0 ? (
            <div className="grid break-all gap-sm">
              {profile?.experience.map((exp) => {
                return (
                  <div
                    className=" h-fit md:flex items-start grid gap-2 md:gap-md lg:gap-xl "
                    key={exp.id}
                  >
                    <div className="grid h-fit gap-2 flex-1">
                      <p className="text-black-light italic flex items-center gap-xs">
                        <FaRegCalendarAlt />{" "}
                        {moment(exp.start_date).format("MMM Do YYYY")} -{" "}
                        {moment(exp.end_date).format("MMM Do YYYY")}
                      </p>
                      <p className="flex items-center gap-xs">
                        <CiUser />{" "}
                        <span className="font-semibold">{exp.job_title}</span> (
                        {exp.level_name})
                      </p>
                    </div>
                    <div className="grid flex-1 gap-2">
                      <p className="flex font-semibold items-center gap-xs">
                        <MdOutlineMapsHomeWork /> {exp.organization_name} (
                        {exp.organization_type})
                      </p>
                      <p className="flex items-center gap-xs">
                        <CiLocationOn />
                        {exp.job_location}
                      </p>

                      {exp.duties !== undefined && (
                        <div className=" pl-8">
                          <p className="flex items-center font-semibold gap-2">
                            {" "}
                            <FaArrowAltCircleDown /> Duties
                          </p>
                          <div
                            className="   prose prose-li:marker:text-black-default"
                            dangerouslySetInnerHTML={{ __html: exp.duties }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            "Not available"
          )}
        </section>

        <section className="grid gap-xs">
          <header className="font-semibold   w-fit  uppercase text-xl flex items-center gap-xs">
            <SlGraduation /> Education
          </header>
          {profile?.education.length > 0 ? (
            <div className="grid gap-xs break-all">
              {profile.education.map((item: IJobseekerEducation) => {
                return (
                  <div
                    key={item.degree}
                    className="grid border-l-sm p-sm md:border-none border-gray-light gap-2"
                  >
                    <p className="flex items-center gap-2">
                      {" "}
                      <CiCalendar />
                      {moment(item.graduation_year).format("YYYY-MM-DD")}
                    </p>
                    <p className="flex items-center font-semibold gap-2">
                      <CiCircleCheck /> {item.degree}
                    </p>
                    <p className="flex items-center gap-2">
                      <MdOutlineMapsHomeWork /> {item.institute_name},{" "}
                      {item.location}, {item.education_board}
                    </p>
                    <span className="flex items-center font-semibold gap-2">
                      <GrCertificate /> Marks : {item.marks.value}{" "}
                      {item.marks.type}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            "Not available"
          )}
        </section>
        <section className="grid gap-xs">
          <header className="font-semibold  flex items-center gap-xs uppercase text-xl ">
            <MdOutlineRoomPreferences /> Job Preference
          </header>
          {profile?.job_preference ? (
            <div className="grid gap-2">
              <p className="flex items-center gap-2">
                {" "}
                <CiCircleCheck /> Looking for :{" "}
                {profile?.job_preference?.level_name}
              </p>
              <div className="flex gap-2 items-center ">
                <CiCircleCheck /> Job Categories :{" "}
                <div className="grid gap-2 h-fit">
                  {profile.job_preference?.category_names.map((cat: string) => {
                    return (
                      <span
                        key={cat}
                        className="bg-black-light text-white p-xs px-sm"
                      >
                        {cat}
                      </span>
                    );
                  })}{" "}
                </div>
              </div>
              <p className="flex items-center gap-2">
                {" "}
                <CiCircleCheck /> Available for :{" "}
                {profile.job_preference.type_name}
              </p>
              <p className="flex items-center gap-2">
                <CiCircleCheck /> Expected Salary : (Equals) NRs{" "}
                {profile.job_preference?.expected_salary}
              </p>
              <p className="flex items-center gap-2">
                <CiCircleCheck /> Preferred Location :{" "}
                {profile.job_preference.job_location}
              </p>
            </div>
          ) : (
            "Not available"
          )}
        </section>
        <section className="grid gap-xs">
          <header className="font-semibold flex items-center gap-xs uppercase text-xl ">
            <GiSkills /> Skills
          </header>
          <div className="grid gap-2 break-all">
            {profile?.job_preference?.skills
              ? profile?.job_preference?.skills.map((skill: string) => {
                  return <li key={skill}>{skill}</li>;
                })
              : "Not available"}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
