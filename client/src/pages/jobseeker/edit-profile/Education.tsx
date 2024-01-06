import { useState } from "react";
import EducationBox from "../../../components/ui/EducationBox";
import { IJobseekerEducation } from "../../../types/postgres/types";
import EducationForm from "./EducationForm";

type EducationProps = {
  education: IJobseekerEducation[] | undefined;
};

const Education = ({ education }: EducationProps) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  if (education?.length === 0) {
    return (
      <div className="grid min-h-[80vh] gap-sm">
        {!isEditorOpen && (
          <div className="grid gap-sm h-fit">
            <p>No education available!</p>
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
            <EducationForm
              setIsEditorOpen={setIsEditorOpen}
              isEditorOpen={isEditorOpen}
            />
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="flex gap-sm flex-col  min-h-[80vh] ">
      <section className="grid gap-sm">
        {education !== undefined &&
          education?.map((item) => {
            return <EducationBox item={item} key={item.id} />;
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
          <EducationForm
            setIsEditorOpen={setIsEditorOpen}
            isEditorOpen={isEditorOpen}
          />
        )}
      </section>
    </div>
  );
};

export default Education;
