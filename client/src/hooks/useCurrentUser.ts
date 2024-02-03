import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { setAuthToken } from "../lib/axios";
import useAuthStore from "../store/auth";

interface DecodedToken {
  sub: string;
  exp: number;
}

export const useCurrentUser = () => {
  const [fullName, setFullName] = useState(null);
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const authStore = useAuthStore();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const parsedInfo = userInfo ? JSON.parse(userInfo) : null;

    function removeUserInfo() {
      setAuthToken(null);
      authStore.setAuthentication(false);
      setFullName(null);
      setRole(null);
      setEmail(null);
      setPhoneNumber(null);
      setId(null)
    }

    if (parsedInfo) {
      const decodedToken = jwtDecode<DecodedToken>(parsedInfo.token);
      const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
      if (decodedToken.exp > currentTimestamp) {
        setAuthToken(parsedInfo.token);
        authStore.setAuthentication(true);
        setFullName(parsedInfo.fullName);
        setRole(parsedInfo.role);
        setEmail(parsedInfo.email);
      setId(parsedInfo.id)

        setPhoneNumber(parsedInfo.phoneNumber);
      } else {
        removeUserInfo();
      }
    }
  }, [authStore.isAunthenticated]);

  return {
    fullName,
    role,
    email,
    phoneNumber,
    id
  };
};
