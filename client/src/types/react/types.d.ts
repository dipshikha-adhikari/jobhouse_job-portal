export interface IEmployerBasicInformationInputs {
  summary: string;
  image?: string;
  coverImage?: string;
  industryType: number;
  organizationName: string;
  address: string;
  phoneNumber: string;
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
  levelId: string;
  typeId: string;
  skills?: Maybe<(string | undefined)[] | undefined>;
  educationRequired: string;
}

export interface IJobseekerJobPreferenceInputs {
  objective: string;
  jobTitle: string;
  jobCategories: string[];
  jobIndustries: string[];
  jobTypeId: string;
  jobLevelId: string;
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
  jobLevelId: string;
  startDate: Date;
  endDate: Date;
  duties: string;
}
