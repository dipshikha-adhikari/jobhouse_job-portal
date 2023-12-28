import { useState } from "react";
import { IJobseekerEducation } from "../../types/postgres/types";
import moment from "moment";
import EducationForm from "../../pages/jobseeker/edit-profile/EducationForm";

type Props = {
  item: IJobseekerEducation;
};

const EducationBox = ({ item }: Props) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <div>
      {!isEditorOpen && (
        <div className="border-sm h-fit flex justify-between border-gray-light p-sm rounded-sm">
          <div className="grid gap-xs">
            <span className="font-semibold">
              {item.degree} - {item.course}
            </span>

            <p>
              {item.institute_name}, {item.location},{" "}
              {moment(item.graduation_year).year()}
            </p>
            <p>
              <span className="capitalize">{item.marks.type}</span> -{" "}
              {item.marks.value.toUpperCase()}
            </p>
          </div>
          <div className="grid justify-end h-fit gap-xs ">
            <button
              className="bg-green-dark text-white  rounded-sm px-sm"
              onClick={() => setIsEditorOpen(true)}
            >
              Edit
            </button>
            <button className="bg-orange-light text-white  rounded-sm px-sm">
              Delete
            </button>
          </div>
        </div>
      )}
      <section>
        {isEditorOpen && (
          <EducationForm
            profile={item}
            isEditorOpen
            setIsEditorOpen={setIsEditorOpen}
          />
        )}
      </section>
    </div>
  );
};

export default EducationBox;
