
export interface IEmployerProfile  {
  user_id:any 
  id:any
  basic_information: {
    id:string
    summary: string;
    image: string;
    address:string
    email:string
    phone_number:number
    cover_image: string;
    industry_id: number
    industry_type:string
    organization_name: string
  }
other_information:{
  website:string
  id:string
}
  
}

export interface IEmployerBasicInformation {
  basic_information: {
    summary: string;
    cover_image?: string;
    image?: any;
    industry_type: string;
    organization_name: string
  }
};

export interface IEmployerContactDetails {
  contact_details: {
    address: string,
    phone_number: string,
    website?: string
  }
}


export interface IJob {
  job_id: string;
  title: string;
  experience_required: string;
  salary: string;
  deadline: Date;
  no_of_vacancy: number;
  description: string;
  category_id: string;
  location: string;
  level: string;
  type: string;
  employer_details:{
    phone_number:number;
  organization_name:string;
  image:string 
  cover_image:string 
  address:string
  }
  employer_id: string
  industry_id :string 
  industry_name:string 
  category_name:string
}

export interface IJobseekerProfile {
  basic_information: {
    image: string,
    current_address: string
    fullname: string
    phone_number: string
    gender: string
    date_of_birth: string
    permanent_address:string
  },
  education: [
    {
      course: string
      degree: string
      education_board: string
      graduation_year: string
      institute_name: string
      location:string
marks:{
  percent:string 
  gpa:string
}
    }
  ],
  experience: IJobseekerExperience[]
  job_preference: {
    summary: string
    available_for: string
    job_categories: string[]
    job_industries: string[]
    job_title: string
    job_level: string
    skills: []
    expected_salary: string
    job_location: string
  },
  jobseeker_id: string
  user_id: string
}

export interface IJobseekerExperience {
  organization_name:string 
organization_type:string
job_location:string 
job_title:string
job_category:string 
job_level:string 
start_date:Date 
end_date:Date 
duties:string 
}