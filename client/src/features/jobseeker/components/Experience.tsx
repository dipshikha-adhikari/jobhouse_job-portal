import { useState } from "react";
import ExperienceForm from "./ExperienceForm";
import { IJobseekerExperience } from "../../../types/postgres/types";
import ExperienceBox from "../../../components/elements/box/ExperienceBox";

type ExperienceProps = {
  experience: IJobseekerExperience[] | undefined;
};

const Experience = ({ experience }: ExperienceProps) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  if (experience?.length === 0) {
    return (
      <div className="grid min-h-[80vh] gap-sm">
        {!isEditorOpen && (
          <div className="grid gap-sm h-fit">
            <p>No Experience available!</p>
            <button
              className="w-fit border-sm  border-green-dark text-green-dark rounded-sm px-sm p-xs"
              onClick={() => setIsEditorOpen(true)}
            >
              Add New
            </button>
          </div>
        )}

        <section>
          {isEditorOpen && (
            <ExperienceForm
              isError
              setIsEditorOpen={setIsEditorOpen}
              isEditorOpen={isEditorOpen}
            />
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="flex gap-sm flex-col min-h-[80vh] ">
      <section className="grid gap-sm">
        {experience &&
          experience?.map((item: IJobseekerExperience) => {
            return <ExperienceBox item={item} key={item.id} />;
          })}
      </section>
      <section>
        {!isEditorOpen && (
          <button
            className="w-fit border-sm h-fit  border-green-dark text-green-dark rounded-sm px-sm p-xs"
            onClick={() => setIsEditorOpen(true)}
          >
            + New
          </button>
        )}

        {isEditorOpen && (
          <ExperienceForm
            isError
            setIsEditorOpen={setIsEditorOpen}
            isEditorOpen={isEditorOpen}
          />
        )}
      </section>
    </div>
  );
};

export default Experience;
