import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import { setAuthToken } from "../lib/axios";
import useAuthStore from "../store/auth";

interface DecodedToken {
    sub: string;
    exp: number;
}

export const useCurrentUser = () => {
    const [fullName, setFullName] = useState(null)
    const [role, setRole] = useState(null)
    const [email, setEmail] = useState(null)
    const[phoneNumber, setPhoneNumber] = useState(null)
    const authStore = useAuthStore()

    useEffect(() => {
        let userInfo = localStorage.getItem("userInfo");
        let parsedInfo = userInfo ? JSON.parse(userInfo) : null;

        if (parsedInfo) {
            const decodedToken = jwtDecode<DecodedToken>(parsedInfo.token);
            const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds

            if (decodedToken.exp > currentTimestamp) {
                setAuthToken(parsedInfo.token);
                authStore.setAuthentication(true)
                setFullName(parsedInfo.fullName)
                setRole(parsedInfo.role)
                setEmail(parsedInfo.email)
                setPhoneNumber(parsedInfo.phoneNumber)
            } else {
                setAuthToken(null)
                authStore.setAuthentication(false)
                setFullName(null)
                setRole(null)
                setEmail(null)
                setPhoneNumber(null)
            }
        }
    }, [authStore.isAunthenticated])

    return {
        fullName, role, email,phoneNumber
    }

}