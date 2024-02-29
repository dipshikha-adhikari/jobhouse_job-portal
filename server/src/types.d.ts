import { Request } from 'express'

export interface IUserRequest extends Request {
  user: any
}

export interface IJobseekerProfile {
  basic_information: IJobseekerBasicInfo
  education: IJobseekerEducation
  experience: IJobseekerExperience
  job_preference: IJobseekerJobPreference
  user_id: string
}

export interface IJobseekerExperience {
  organization_name: string
  organization_type: string
  job_location: string
  job_title: string
  job_category: string
  job_level_id: string
  start_date: Date
  end_date: Date
  duties: string
}

export interface IJobseekerBasicInformation {
  image: {
    url?: string
    public_id?: string
  }
  current_address: string
  fullname: string
  phone_number: string
  gender: string
  date_of_birth: string
  permanent_address: string
}

export interface IJobseekerEducation {
  course: string
  degree: string
  graduation_year: string
  institute_name: string
  location: string
  marks: {
    type: string
    value: string
  }
}

export interface IJobseekerJobPreference {
  summary: string
  job_type_id: string
  job_categories: string[]
  job_industries: string[]
  job_title: string
  job_level_id: string
  skills: []
  expected_salary: string
  job_location: string
}

export interface IEmployerBasicInformation {
  summary: string
  cover_image?: {
    url?: string
    public_id?: string
  }
  image?: {
    public_id: string
    url: string
  }
  industry_type: string
  organization_name: string
  address: string
  phone_number: string
  email: string
}

export interface IEmployerOtherInformation {
  website?: string
}

export interface IJob {
  job_id: string
  title: string
  experience_required: string
  salary: string
  deadline: Date
  no_of_vacancy: number
  description: string
  category_id: string
  location: string
  level: string
  type: string
  employer_id: string
  industry_id: string
}
