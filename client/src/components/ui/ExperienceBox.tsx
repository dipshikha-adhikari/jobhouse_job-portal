import moment from "moment";
import { useState } from "react";
import ExperienceForm from "../../pages/jobseeker/edit-profile/ExperienceForm";
import { IJobseekerExperience } from "../../types/postgres/types";
import { deleteExperience } from "../../pages/jobseeker/actions/deleteExperience";

type Props = {
  item: IJobseekerExperience;
};

const EducationBox = ({ item }: Props) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
const[isLoading, setIsLoading] = useState(false)

  return (
    <div>
      {!isEditorOpen && (
        <div className="border-sm h-fit flex justify-between  p-md rounded-sm">
          <div className="grid gap-xs">
            <p>
              <span className="font-semibold"> {item.job_title}</span> (
              {item.level_name})
            </p>

            <p>
              {item.organization_name} {item.organization_type}
            </p>
            <p>
              <span> {moment(item.start_date).year()}</span> -{" "}
              <span> {moment(item.end_date).year()}</span>
            </p>
            <p>{item.job_location}</p>
            <p>{item.job_category}</p>
            <div className="grid gap-xs">
              <span>Duties and Responsibilities</span>
              <div
                className="prose pl-sm prose-li:marker:text-black-default"
                dangerouslySetInnerHTML={{ __html: item.duties }}
              ></div>
            </div>
          </div>
          <div className="grid justify-end h-fit gap-xs ">
            <button
              className="bg-green-dark text-white  rounded-sm p-xs px-sm"
              onClick={() => setIsEditorOpen(true)}
            >
              Edit
            </button>
            <button className="bg-orange-light text-white disabled:opacity-50 rounded-sm p-xs px-sm" disabled={isLoading} onClick={() => deleteExperience(setIsLoading, item.id)}>
              Delete
            </button>
          </div>
        </div>
      )}
      <section>
        {isEditorOpen && (
          <ExperienceForm
            profile={item}
            isError
            isEditorOpen
            setIsEditorOpen={setIsEditorOpen}
          />
        )}
      </section>
    </div>
  );
};

export default EducationBox;
