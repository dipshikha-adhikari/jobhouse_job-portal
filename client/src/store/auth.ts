import { create } from "zustand";

interface AuthState {
  isAunthenticated: boolean;
  setAuthentication: (props: boolean) => void;
}

// let userInfo = localStorage.getItem('userInfo')
// let parsedInfo = userInfo ? JSON.parse(userInfo) : null

const useAuthStore = create<AuthState>((set) => ({
  isAunthenticated: false,
  setAuthentication: (props) =>
    set({
      isAunthenticated: props,
    }),
}));

export default useAuthStore;
