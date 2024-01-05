import { create } from "zustand";

interface AuthState {
  isAunthenticated: boolean;
  setAuthentication: (props: boolean) => void;
}


const useAuthStore = create<AuthState>((set) => ({
  isAunthenticated: false,
  setAuthentication: (props) =>
    set({
      isAunthenticated: props,
    }),
}));

export default useAuthStore;
