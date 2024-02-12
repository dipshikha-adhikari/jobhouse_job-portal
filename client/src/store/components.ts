import { create } from "zustand";

interface AppState {
  loginModalOpen: boolean;
  registerModalOpen: boolean;
  jobseekerProfileMenuModalOpen: boolean;
  toggleLoginModal: () => void;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  toggleJobseekerProfileMenuModal: () => void;
  isJobsFetched: boolean;
  setIsJobsFetched: (props: boolean) => void
}

const useComponentsStore = create<AppState>((set) => ({
  loginModalOpen: false,
  registerModalOpen: false,
  jobseekerProfileMenuModalOpen: false,
  isJobsFetched: false,
  setIsJobsFetched: (props) => set((state) => ({ ...state, isJobsFetched: props })),
  toggleLoginModal: () =>
    set((state) => ({ ...state, loginModalOpen: !state.loginModalOpen })),
  openRegisterModal: () =>
    set((state) => ({ ...state, registerModalOpen: true })),
  closeRegisterModal: () =>
    set((state) => ({ ...state, registerModalOpen: false })),
  toggleJobseekerProfileMenuModal: () =>
    set((state) => ({
      ...state,
      jobseekerProfileMenuModalOpen: !state.jobseekerProfileMenuModalOpen,
    })),
}));

export default useComponentsStore;
