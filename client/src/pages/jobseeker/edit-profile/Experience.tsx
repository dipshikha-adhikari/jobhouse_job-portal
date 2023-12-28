import { useState } from "react";
import { IJobseekerExperience } from "../../../types/postgres/types";
import { useJobseekerProfile } from "../hooks/useJobseekerProfile";
import ExperienceForm from "./ExperienceForm";
import ExperienceBox from "../../../components/ui/ExperienceBox";

type ExperienceProps = {
  profile: IJobseekerExperience[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const Experience = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { profile }: ExperienceProps = useJobseekerProfile("experience");

  if (profile?.length === 0) {
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
        {profile !== undefined &&
          profile?.map((item: IJobseekerExperience) => {
            return <ExperienceBox item={item} />;
          })}
      </section>
      <section>
        {!isEditorOpen && (
          <button
            className="w-fit border-sm h-fit  border-green-dark text-green-dark rounded-sm px-sm p-xs"
            onClick={() => setIsEditorOpen(true)}
          >
            Add New
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
