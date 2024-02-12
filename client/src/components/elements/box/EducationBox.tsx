import { useState } from "react";
import { IJobseekerEducation } from "../../../types/postgres/types";
import moment from "moment";
import { deleteEducation } from "../../../features/profiles/jobseeker/api/deleteEducation";
import EducationForm from "../../../features/profiles/jobseeker/components/EducationForm";

type Props = {
  item: IJobseekerEducation;
};

const EducationBox = ({ item }: Props) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="">
      {!isEditorOpen && (
        <div className="border-sm h-fit max-w-sm flex justify-between  gap-sm p-md rounded-sm">
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
              className="bg-green-dark text-white  rounded-sm p-xs px-sm"
              onClick={() => setIsEditorOpen(true)}
            >
              Edit
            </button>
            <button
              className="bg-orange-light disabled:opacity-50 text-white  rounded-sm p-xs px-sm"
              disabled={isLoading}
              onClick={() => deleteEducation(setIsLoading, item.id)}
            >
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
