export interface IEmployerBasicInformationInputs  {
    summary: string 
    image?: string 
    coverImage?: string 
    industryType:number  
    organizationName:string
    address:string 
    phoneNumber:number
  };

 export interface IEmployerOtherInformationInputs {
    website?:string
  }

  export interface ICreateJobInputs {
    title: string;
    experienceRequired: string;
    salary: string;
    deadline: Date ;
    noOfVacancy: number;
    description: string;
    categoryId: any;
    location: string;
    level:string;
    type:string;
    skills?:[]
    educationRequired:string
}

export interface IJobseekerJobPreferenceInputs  {
  objective: string,
  jobTitle:string,
  jobCategories:string[],
  jobIndustries:string[],
availableFor:string,
jobLevel:string,
jobLocation:string,
expectedSalary:string
skills:string[] ,
}
export interface IJobseekerBasicInfoInputs {
fullname:string 
image?:any
currentAddress:string 
permanentAddress:string 
phoneNumber:string 
gender:string 
dateOfBirth:Date
}
export interface IJobseekerEducationInputs {
degree:string 
course:any
institute:string 
graduationYear:Date 
location:string 
marksValue?:any
marksType?:any
}
export interface IJobseekerExperienceInputs {
organizationName:string 
organizationType:string
jobLocation:string 
jobTitle:string
jobCategory:string 
jobLevel:string 
startDate:Date 
endDate:Date 
duties:string 
}