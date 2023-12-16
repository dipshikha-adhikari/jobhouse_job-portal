import { FaPenNib } from "react-icons/fa6";
import {
  MouseEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { privateRequest } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IEmployerProfile } from "../../types";

interface IAboutSection {
  error: any;
  loading: any;
  profile: IEmployerProfile | undefined;
}

const AboutSection = ({ profile, error, loading }: IAboutSection) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const textRef: RefObject<HTMLTextAreaElement> = useRef(null);

  useEffect(() => {
    auto_grow();
  }, [isEditorOpen]);

  function auto_grow() {
    if (textRef.current) {
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }

  async function handleSave() {
    if (textRef.current) {
      try{
        if (profile?.summary !== undefined) {
         toast.promise( privateRequest.put("/api/v1/employer/profile", {
          summary: textRef.current.value,
        }),{
          loading:'Loading',
          success:() => {
            setIsEditorOpen(false)
            window.location.reload()
            return 'Success'
          },
          error:'Error'
        })
          
        } else {
          toast.promise( privateRequest.post("/api/v1/employer/profile", {
            summary: textRef.current.value,
          }),{
            loading:'Loading',
            success:() => {
              setIsEditorOpen(false)
            window.location.reload()
              return 'Success'
            },
            error:'Error'
          })

          console.log('success')
        }
      }catch(err){
        console.log(err)
      }
    }
  }

  if (error) return <div>Server Error!</div>;

  return (
    <div className="grid gap-sm">
      {profile && profile.summary ? (
        <div>{!isEditorOpen && profile?.summary}</div>
      ) : (
        <p
          className="flex gap-xs cursor-pointer items-center border-sm border-blue-light p-sm font-semibold w-fit rounded-md"
          onClick={() => setIsEditorOpen(!isEditorOpen)}
        >
          <span>Write about your company</span> <FaPenNib />
        </p>
      )}

      {isEditorOpen && (
        <textarea
          onInput={auto_grow}
          ref={textRef}
          className="h-full p-sm border-sm w-full border-black-light resize-none"
          defaultValue={profile?.summary ? profile.summary : ""}
        ></textarea>
      )}

      <div className="flex gap-sm">
        {isEditorOpen && (
          <button
            className="bg-blue-dark w-fit p-sm text-white rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        )}
        {!isEditorOpen && profile?.summary && (
          <button
            className="bg-blue-dark w-fit p-sm text-white rounded-md"
            onClick={() => setIsEditorOpen(true)}
          >
            Edit
          </button>
        )}

        {isEditorOpen && (
          <button
            className="bg-orange-default w-fit p-sm text-white rounded-md"
            onClick={() => setIsEditorOpen(false)}
          >
            cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default AboutSection;
