import { create } from "zustand";

interface jobInputs {
  stepOne: {
    title: string;
    categoryId: any;
    location: string;
    experienceRequired: string;
    salary: string;
    deadline: any;
  },
  stepTwo:{
    noOfVacancy: number ;
    description: string;
    level: string;
    type: string;
    skills?:any
    educationRequired:string
  },
  setStepOneInputs: (props: any) => void,
  setStepTwoInputs: (props: any) => void,
}



const useJobInputs = create<jobInputs>((set) => ({
  stepOne: {
    title: '',
    categoryId: null,
    location: '',
    experienceRequired: '',
    salary: '',
    deadline: null
  },
  stepTwo:{
    noOfVacancy:1,
    description: '',
    level: '',
    type: '',
    skills:[],
    educationRequired:''
  },

  setStepOneInputs: (props) => {
    set((state) => (
      {
        ...state, stepOne: props
      }
    ))
  },
  setStepTwoInputs: (props) => {
    set((state) => (
      {
        ...state, stepTwo: props
      }
    ))
  }

}))

export default useJobInputs