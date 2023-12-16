import toast from "react-hot-toast";
import { privateRequest } from "../../../lib/axios";
import { IJobseekerBasicInfoInputs } from "../../../types/react/types";
import { saveImageToCloudinary } from "../../../utils/saveImageToCloudinary";

export const updateBasicInfo = async (data: IJobseekerBasicInfoInputs, setIsLoading: (props: any) => void, setIsEditorOpen: (props: any) => void) => {

    if (data.image !== undefined) {
        let result = await saveImageToCloudinary(data.image)
        if (result === undefined) throw new Error('Failed to upload image')
        data.image = result?.url
    }

    try {
        setIsLoading(true)
        let dataToBeSent = {
            basic_information: {
                fullname: data.fullname,
                image: data.image,
                current_address: data.currentAddress,
                permanent_address: data.permanentAddress,
                phone_number: data.phoneNumber,
                gender: data.gender,
                date_of_birth: data.dateOfBirth
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