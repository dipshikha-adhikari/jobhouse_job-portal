import toast from "react-hot-toast";
import { privateRequest } from "../../../lib/axios";
import { IEmployerOtherInformationInputs } from "../../../types/react/types";
import { IEmployerProfile } from "../../../types/postgres/types";
import { queryClient } from "../../../App";

export const updateOtherInformation = async (
  data: IEmployerOtherInformationInputs,
  profile: IEmployerProfile | undefined,
  setIsLoading: (props: boolean) => void,
  setIsEditorOpen: (props: boolean) => void,
) => {
  try {
    setIsLoading(true);
    const url: string = "/api/v1/employer/profile/otherInformation";

    const axiosConfig = {
      method: profile?.other_information.id ? "put" : "post", // Casting 'method' to ensure it's one of the allowed values
      url,
      data,
    };

    toast.promise(privateRequest(axiosConfig), {
      loading: "loading",
      error: (err) => {
        console.log(err);
        setIsLoading(false);
        return err.name || err.response.data.message;
      },
      success: () => {
        queryClient.invalidateQueries("employerProfile");
        setIsLoading(false);
        setIsEditorOpen(false);
        return "Success";
      },
    });
  } catch (err) {
    setIsLoading(false);
    console.log(err);
  }
};
