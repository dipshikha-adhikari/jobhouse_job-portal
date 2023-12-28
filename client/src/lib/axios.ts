import axios from "axios";

export const publicRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

export const setAuthToken = (token: string | null) => {
  privateRequest.defaults.headers.common["token"] = token;
};
