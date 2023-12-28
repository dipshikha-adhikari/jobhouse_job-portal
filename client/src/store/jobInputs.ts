import { create } from "zustand";

type StepOne = {
  title: string;
  categoryId: null | string;
  location: string;
  experienceRequired: string;
  salary: string;
  deadline: Date | null;
};

type StepTwo = {
  noOfVacancy: number;
  description: string;
  level: string;
  type: string;
  skills?: string[];
  educationRequired: string;
};

interface jobInputs {
  stepOne: StepOne;
  stepTwo: StepTwo;
  setStepOneInputs: (props: StepOne) => void;
  setStepTwoInputs: (props: StepTwo) => void;
}

const useJobInputs = create<jobInputs>((set) => ({
  stepOne: {
    title: "",
    categoryId: null,
    location: "",
    experienceRequired: "",
    salary: "",
    deadline: null,
  },
  stepTwo: {
    noOfVacancy: 1,
    description: "",
    level: "",
    type: "",
    skills: [],
    educationRequired: "",
  },

  setStepOneInputs: (props) => {
    set((state) => ({
      ...state,
      stepOne: props,
    }));
  },
  setStepTwoInputs: (props) => {
    set((state) => ({
      ...state,
      stepTwo: props,
    }));
  },
}));

export default useJobInputs;
