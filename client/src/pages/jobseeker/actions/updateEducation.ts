import toast from "react-hot-toast";
import { privateRequest } from "../../../lib/axios";
import { IJobseekerBasicInfoInputs, IJobseekerEducationInputs } from "../../../types/react/types";

export const updateEducation = async (data: IJobseekerEducationInputs, setIsLoading: (props: any) => void, setIsEditorOpen: (props: any) => void) => {



    try {
        setIsLoading(true)
        let marksType = data.marksType

        let dataToBeSent = {
            education: {
                course: data.course,
                degree: data.degree,
                graduation_year: data.graduationYear,
                institute_name: data.institute,
                location: data.location,
                marks: {
                    [marksType]: data.marksValue
                }
            }
        }

        toast.promise(privateRequest.put('/api/v1/jobseeker/profile', dataToBeSent), {

            loading: 'Loading',
            success: () => {
                setIsLoading(false)
                setIsEditorOpen(false)
                return 'Success'
            },
            error: (err) => {
                console.log(err)
                setIsLoading(false)
                return 'Failed'
            }
        })
    } catch (err) {
        console.log(err)
        setIsLoading(false)
    }
}