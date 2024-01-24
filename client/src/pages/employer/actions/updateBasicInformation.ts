import toast from "react-hot-toast";
import { privateRequest } from "../../../lib/axios";
import { IEmployerProfile } from "../../../types/postgres/types";
import { queryClient } from "../../../App";

export const updateBasicInformation = async (
  profile: IEmployerProfile | undefined,
  data: object,
  setIsLoading: (props: boolean) => void,
  setIsEditorOpen: (props: boolean) => void,
) => {
  try {
    setIsLoading(true);

    const url: string = "/api/v1/employer/profile/basicInformation";

    const axiosConfig = {
      method:
        profile?.basic_information?.id === null ||
        profile?.basic_information?.id === undefined
          ? "post"
          : "put", // Casting 'method' to ensure it's one of the allowed values
      url,
      data,
    };
    toast.promise(privateRequest(axiosConfig), {
      loading: "loading",
      error: (err) => {
        console.log(err);
        setIsLoading(false);
        return "Error";
      },
      success: () => {
        queryClient.invalidateQueries("employerProfile");
        setIsLoading(false);
        setIsEditorOpen(false);
        window.scrollTo(0,0)
        return "Success";
      },
    });
  } catch (err) {
    setIsLoading(false);
    console.log(err);
  }
};
