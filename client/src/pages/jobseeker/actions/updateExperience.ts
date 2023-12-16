import toast from "react-hot-toast";
import { privateRequest } from "../../../lib/axios";
import {  IJobseekerExperienceInputs } from "../../../types/react/types";

export const updateExperience = async (data: IJobseekerExperienceInputs, setIsLoading: (props: any) => void, setIsEditorOpen: (props: any) => void) => {

    try {
        setIsLoading(true)
        let dataToBeSent = {
            experience: {
                organization_name:data.organizationName, 
                organization_type:data.organizationType,
                job_location:data.jobLocation,
                job_title:data.jobTitle,
                job_category:data.jobCategory,
                job_level:data.jobLevel,
                start_date:data.startDate,
                end_date:data.endDate, 
                duties:data.duties
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