export interface IEmployerProfile {
  user_id: string;
  id: string;
  basic_information: IEmployerBasicInformation;
  other_information: IEmployerOtherInformation;
  cover_image: {
    url: string;
    public_id: string;
  };
  image: {
    url: string;
    public_id: string;
  };
}

export interface IEmployerBasicInformation {
  id: string;
  summary: string;

  address: string;
  email: string;

  industry_id: number;
  industry_type: string;
  organization_name: string;
  phone_number: string;
}

export interface IEmployerOtherInformation {
  id: string;
  website?: string;
}

export interface IJob {
  job_id: number;
  title: string;
  experience_required: string;
  salary: string;
  deadline: Date;
  no_of_vacancy: number;
  description: string;
  category_id: string;
  location: string;
  level: string;
  level_id: string;
  type_id: string;
  level_name: string;
  type_name: string;
  education_required: string;
  skills: string[];
  employer_details: {
    organization_name: string;
    image: string;
    cover_image: string;
    address: string;
  };
  job_application_count: string;
  employer_id: string;
  industry_id: string;
  industry_name: string;
  category_name: string;
}

export interface AppliedJobs {
  id: number;
  job_id: number;
  employer_id: number;
  jobseeker_id: number;
  organization_name: string;
  employer_image: {
    url: string;
    public_id: string;
  };
  title: string;
  deadline: Date;
}

export interface IJobseekerProfile {
  basic_information: IJobseekerBasicInformation;
  education: IJobseekerEducation[];
  experience: IJobseekerExperience[];
  job_preference: IJobseekerJobPreference;
  user_id: string;
}

export interface IJobseekerJobPreference {
  id: string;
  summary: string;
  job_type_id: string;
  job_categories: number[];
  category_names: string[];
  industry_names: string[];
  job_industries: number[];
  job_title: string;
  job_level_id: string;
  level_name: string;
  type_name: string;
  skills: [];
  expected_salary: string;
  job_location: string;
}

export interface IJobseekerExperience {
  id: string;
  organization_name: string;
  organization_type: string;
  job_location: string;
  job_title: string;
  job_category: string;
  job_level_id: string;
  level_name: string;
  start_date: Date;
  end_date: Date;
  duties: string;
}

export interface IJobseekerBasicInformation {
  id: string;
  image: {
    url: string;
    public_id: string;
  };
  current_address: string;
  fullname: string;
  gender: string;
  date_of_birth: string;
  email: string;
  permanent_address: string;
  phone_number: string;
}

export interface IJobseekerEducation {
  id: string;
  course: string;
  degree: string;
  education_board: string;
  graduation_year: string;
  institute_name: string;
  location: string;
  marks: {
    type: string;
    value: string;
  };
}
