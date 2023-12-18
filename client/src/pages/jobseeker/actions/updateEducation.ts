import toast from "react-hot-toast";
import { privateRequest } from "../../../lib/axios";
import { IJobseekerEducationInputs } from "../../../types/react/types";
import { IJobseekerEducation } from "../../../types/postgres/types";
import { queryClient } from "../../../App";

export const updateEducation = async (data: IJobseekerEducationInputs, profile: IJobseekerEducation | undefined, setIsLoading: (props: any) => void, setIsEditorOpen: (props: any) => void) => {

    try {
        setIsLoading(true)
        let dataToBeSent = {
            course: data.course,
            degree: data.degree,
            graduation_year: data.graduationYear,
            institute_name: data.institute,
            location: data.location,
            marks: {
                value: data.marksValue,
                type: data.marksType
            }
        }
        let axiosConfig = {
            method: profile === undefined ? 'post' : 'put',
            url: profile === undefined ? '/api/v1/jobseeker/profile/education' : `/api/v1/jobseeker/profile/education/${profile.id}`,
            data: dataToBeSent
        }
        toast.promise(privateRequest(axiosConfig), {
            loading: 'Loading',
            success: () => {
                setIsLoading(false)
                setIsEditorOpen(false)
                queryClient.invalidateQueries('jobseekerProfile')
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