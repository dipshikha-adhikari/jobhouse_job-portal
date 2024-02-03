import { create } from "zustand";

interface AppState {
  loginModalOpen: boolean;
  registerModalOpen: boolean;
  jobseekerProfileMenuModalOpen: boolean;
  toggleLoginModal: () => void;
  toggleRegisterModal: () => void;
  toggleJobseekerProfileMenuModal: () => void;
  isJobsFetched:boolean;
  setIsJobsFetched:(props:boolean) => void
}

const useStore = create<AppState>((set) => ({
  loginModalOpen: false,
  registerModalOpen: false,
  jobseekerProfileMenuModalOpen: false,
  isJobsFetched:false,
  setIsJobsFetched:(props) => set((state) => ({...state, isJobsFetched:props})),
  toggleLoginModal: () =>
    set((state) => ({ ...state, loginModalOpen: !state.loginModalOpen })),
  toggleRegisterModal: () =>
    set((state) => ({ ...state, registerModalOpen: !state.registerModalOpen })),
  toggleJobseekerProfileMenuModal: () =>
    set((state) => ({
      ...state,
      jobseekerProfileMenuModalOpen: !state.jobseekerProfileMenuModalOpen,
    })),
}));

export default useStore;
