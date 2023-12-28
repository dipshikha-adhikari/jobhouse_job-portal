export interface IEmployerBasicInformationInputs {
  summary: string;
  image?: string;
  coverImage?: string;
  industryType: number;
  organizationName: string;
  address: string;
  phoneNumber: number;
}

export interface IEmployerOtherInformationInputs {
  website?: string;
}

export interface ICreateJobInputs {
  title: string;
  experienceRequired: string;
  salary: string;
  deadline: Date;
  noOfVacancy: number;
  description: string;
  categoryId: string;
  location: string;
  level: string;
  type: string;
  skills?: Maybe<(string | undefined)[] | undefined>;
  educationRequired: string;
}

export interface IJobseekerJobPreferenceInputs {
  objective: string;
  jobTitle: string;
  jobCategories: string[];
  jobIndustries: string[];
  availableFor: string;
  jobLevel: string;
  jobLocation: string;
  expectedSalary: string;
  skills: string[];
}
export interface IJobseekerBasicInfoInputs {
  fullname: string;
  image?: string | object | ArrayBuffer | null;
  currentAddress: string;
  permanentAddress: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: Date | string;
}
export interface IJobseekerEducationInputs {
  degree: string;
  course: string;
  institute: string;
  graduationYear: Date;
  location: string;
  marksValue?: string | number;
  marksType?: string;
}
export interface IJobseekerExperienceInputs {
  organizationName: string;
  organizationType: string;
  jobLocation: string;
  jobTitle: string;
  jobCategory: string;
  jobLevel: string;
  startDate: Date;
  endDate: Date;
  duties: string;
}
