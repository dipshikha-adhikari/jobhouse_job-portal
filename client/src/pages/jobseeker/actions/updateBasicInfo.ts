import toast from "react-hot-toast";
import { privateRequest } from "../../../lib/axios";
import { IJobseekerBasicInfoInputs } from "../../../types/react/types";
import { IJobseekerBasicInformation } from "../../../types/postgres/types";
import { queryClient } from "../../../App";

export const updateBasicInfo = async (data: IJobseekerBasicInfoInputs, setIsLoading: (props: any) => void, setIsEditorOpen: (props: any) => void, basicInfo: IJobseekerBasicInformation | undefined) => {



    try {
        setIsLoading(true)
        let dataToBeSent = {
            fullname: data.fullname,
            image: data.image,
            current_address: data.currentAddress,
            permanent_address: data.permanentAddress,
            phone_number: data.phoneNumber,
            gender: data.gender,
            date_of_birth: data.dateOfBirth
        }

        let axiosConfig = {
            method: basicInfo?.id === undefined ? 'post' : 'put',
            url: '/api/v1/jobseeker/profile/basicInformation',
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