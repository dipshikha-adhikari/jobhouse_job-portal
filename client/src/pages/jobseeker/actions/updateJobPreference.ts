import toast from "react-hot-toast";
import { IJobseekerJobPreferenceInputs } from "../../../types/react/types";
import { privateRequest } from "../../../lib/axios";

export const updateJobPrefetence = (data: IJobseekerJobPreferenceInputs, setIsLoading: (props: any) => void, setIsEditorOpen:(props:any) => void) => {
    try {
        let dataToBeSent = {
            job_preference: {
                available_for: data.availableFor,
                expected_salary: data.expectedSalary,
                job_categories: data.jobCategories,
                job_industries: data.jobIndustries,
                job_level: data.jobLevel,
                job_location: data.jobLocation,
                job_title: data.jobTitle,
                summary: data.objective,
                skills: data.skills
            }
        }

        toast.promise(privateRequest.put('/api/v1/jobseeker/profile', dataToBeSent), {

            loading: 'Loading',
            success: () => {
                setIsLoading(false)
                setIsEditorOpen(false)
                return 'Success'
            },
            error: () => {
                setIsLoading(false)
                return 'Failed'
            }
        })
    } catch (err) {
        console.log(err)
        setIsLoading(false)

    }
}