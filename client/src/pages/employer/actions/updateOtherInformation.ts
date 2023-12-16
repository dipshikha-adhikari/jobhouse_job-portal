import toast from "react-hot-toast";
import { privateRequest } from "../../../lib/axios";
import { IEmployerOtherInformationInputs } from "../../../types/react/types";
import { IEmployerProfile } from "../../../types/postgres/types";


export const updateOtherInformation = async (data: IEmployerOtherInformationInputs, profile:IEmployerProfile | undefined, setIsLoading: any, setIsEditorOpen:any) => {

    try {
        setIsLoading(true)
        let url: string = '/api/v1/employer/profile/otherInformation';


        const axiosConfig = {
            method : profile?.other_information.id  ? 'put':'post' , // Casting 'method' to ensure it's one of the allowed values
            url, 
            data
        };

        toast.promise(privateRequest(axiosConfig),
            {
                loading: 'loading',
                error: (err) => {
                    console.log(err)
                    setIsLoading(false)
                    return err.name || err.response.data.message
                },
                success: () => {
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

