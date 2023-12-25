import { useState } from "react";
import { IJobseekerEducation } from "../../../types/postgres/types";
import { useJobseekerProfile } from "../hooks/useJobseekerProfile";
import EducationForm from "./EducationForm";
import EducationBox from "../../../components/ui/EducationBox";
import Error from "../../../components/shared/Error";
import Loader from "../../../components/shared/Loader";

type EducationProps = {
  profile: IJobseekerEducation[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const Education = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { profile, isError, isLoading }: EducationProps = useJobseekerProfile("education");

if(isError) return <Error/>
if(isLoading) return <Loader/>

  if (profile?.length  === 0) {
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
    <div className="flex gap-sm flex-col min-h-[80vh] ">
      <section className="grid gap-sm">
        {profile !== undefined &&
          profile?.map((item) => {
            return <EducationBox item={item}  key={item.id}/>;
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
