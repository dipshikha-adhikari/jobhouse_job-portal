import { useEffect, useRef, useState } from "react";
import { IJobseekerProfile } from "../../../types/postgres/types";
import { Link } from "react-router-dom";
import { FaCalendar, FaHome, FaMoneyBill } from "react-icons/fa";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import moment from "moment";
import { BiCategoryAlt, BiLocationPlus } from "react-icons/bi";

type UserInfoProps = {
  profile: IJobseekerProfile;
};
const UserInfo = ({ profile }: UserInfoProps) => {
  const [progress, setProgress] = useState(0);
  const { fullName } = useCurrentUser();
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    calculateProgress();
    window.scrollTo(0, 0);
  }, [profile]);

  function calculateProgress() {
    const val = 100 / 4;
    let progress = 0;
    if (profile?.basic_information) {
      progress += val;
    }
    if (profile?.education?.length > 0) {
      progress += val;
    }
    if (profile?.experience.length > 0) {
      progress += val;
    }
    if (profile?.job_preference) {
      progress += val;
    }
    setProgress(progress);
  }

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${progress}%`;
    }
  }, [progress]);

  return (
    <section className="grid w-full md:place-content-center     gap-xs   h-fit ">
      <Link
        to="/jobseeker/profile"
        className="flex md:grid lg:flex text-black-default hover:text-black-default justify-between w-fit gap-xs"
      >
        <img
          src={`${
            profile?.basic_information?.image.url ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&usqp=CAU"
          }`}
          alt=""
          className="w-10 h-10 xs:w-16 xs:h-16 object-cover rounded-full"
        />
        <div>
          <h2 className="font-semibold">
            {profile?.basic_information?.fullname || fullName}
          </h2>
          <span>Profile Completeness : {progress}%</span>
          <span className="w-[150px] my-2 h-2 grid relative bg-gray-light">
            <span
              className={`absolute left-0 rounded-full h-full  bg-green-dark`}
              ref={progressRef}
            ></span>
          </span>
        </div>
      </Link>
      <div className="flex gap-4 items-center">
        <FaHome />{" "}
        <div className="grid">
          Current Address{" "}
          <span className="font-semibold">
            {profile?.basic_information?.current_address || "Not available"}
          </span>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <FaCalendar />{" "}
        <div className="grid">
          Age{" "}
          <span className="font-semibold">
            {moment(profile?.basic_information?.date_of_birth).format(
              "MMM Do YYYY",
            ) || "Not available"}
          </span>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <FaMoneyBill />{" "}
        <div className="grid">
          Expected Salary{" "}
          <span className="font-semibold">
            {profile?.job_preference?.expected_salary || "Not available"}{" "}
          </span>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <BiCategoryAlt />{" "}
        <div className="grid">
          Prefered Job Category{" "}
          <span className="font-semibold grid gap-1">
            {profile?.job_preference?.category_names
              ? profile?.job_preference?.category_names.map((cat) => {
                  return <span key={cat}>{cat}</span>;
                })
              : "Not available"}{" "}
          </span>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <BiLocationPlus />{" "}
        <div className="grid">
          Prefered Job Location{" "}
          <span className="font-semibold">
            {profile?.job_preference?.job_location || "Not available"}
          </span>
        </div>
      </div>
      <div className="py-md">
        <Link
          to="/jobseeker/profile/basic-info"
          className="rounded-sm  text-white  bg-green-dark hover:text-white p-xs px-sm  w-fit"
        >
          Update profile
        </Link>
      </div>{" "}
    </section>
  );
};

export default UserInfo;
