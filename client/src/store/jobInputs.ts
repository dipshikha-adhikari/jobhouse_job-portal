import { create } from "zustand";

type StepOne = {
  title: string ;
  categoryId: string;
  location: string;
  experienceRequired: string;
  salary: string;
  deadline: Date;
};



type StepTwo = {
  noOfVacancy: number;
  description: string;
  levelId: string;
  typeId: string;
  skills?: string[];
  educationRequired: string;
};

interface jobInputs {
  stepOne: StepOne;
  stepTwo: StepTwo;
  isStepOneCompleted:boolean
  setStepOneInputs: (props: StepOne) => void;
  setStepTwoInputs: (props: StepTwo) => void;
  setStepOneCompleted:(props:boolean) => void

}

const useJobInputs = create<jobInputs>((set) => ({
  stepOne: {
    title: "",
    categoryId: "",
    location: "",
    experienceRequired: "",
    salary: "",
    deadline: new Date(),
    updated:false
  },
  stepTwo: {
    noOfVacancy: 1,
    description: "",
    levelId: "",
    typeId: "",
    skills: [],
    educationRequired: "",
  },
  isStepOneCompleted:false,
setStepOneCompleted:(props) => {set((state) => ({...state,isStepOneCompleted:props}))},
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
