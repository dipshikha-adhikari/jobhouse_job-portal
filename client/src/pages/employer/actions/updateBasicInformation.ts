import { saveImageToCloudinary } from "../../../utils/saveImageToCloudinary";
import toast from "react-hot-toast";
import { privateRequest } from "../../../lib/axios";
import { IEmployerProfile } from "../../../types/postgres/types";
import { queryClient } from "../../../App";


export const updateBasicInformation = async (profile:IEmployerProfile | undefined, data: any, setIsLoading: any, setIsEditorOpen: any) => {
    try {

        setIsLoading(true)
       // if (data.cover_image !== undefined) {
        //     let result = await saveImageToCloudinary(data.cover_image)
        //     if (result === undefined) throw new Error('Failed to upload image')
        //     data.cover_image= result?.url
        // }
        // if (data.image !== undefined) {
        //     let result = await saveImageToCloudinary(data.image)
        //     if (result === undefined) throw new Error('Failed to upload image')
        //     data.image = result?.url
        // }
        let url: string = '/api/v1/employer/profile/basicInformation'

        const axiosConfig = {
            method: profile?.basic_information.id === undefined ? 'post' : 'put', // Casting 'method' to ensure it's one of the allowed values
            url,
            data
        };

        toast.promise(privateRequest(axiosConfig),
            {
                loading: 'loading',
                error: (err) => {
                    console.log(err)
                    setIsLoading(false)
                    return 'Error'
                },
                success: () => {
                    queryClient.invalidateQueries('employerProfile')
                    setIsLoading(false)
                    setIsEditorOpen(false)
                    return 'Success'
                }
            }
        )
    } catch (err) {
        setIsLoading(false)
        console.log(err)
    }
}


 