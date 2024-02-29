export const isValidJobPreferences = (pre: any) => {
  return (
    pre.summary !== undefined &&
    Array.isArray(pre.job_categories) &&
    Array.isArray(pre.job_industries) &&
    pre.job_title !== undefined &&
    pre.job_level_id !== undefined &&
    pre.job_type_id !== undefined &&
    Array.isArray(pre.skills) &&
    pre.expected_salary !== undefined &&
    pre.job_location !== undefined
  )
}

export const isValidEducation = (education: any) => {
  return (
    education.degree !== undefined &&
    education.course !== undefined &&
    education.institute_name !== undefined &&
    education.graduation_year !== undefined &&
    education.location !== undefined
  )
}

export const isValidBasicInformation = (info: any) => {
  return (
    (info.image !== undefined || true) &&
    info.permanent_address !== undefined &&
    info.current_address !== undefined &&
    info.gender !== undefined &&
    info.date_of_birth !== undefined &&
    info.fullname !== undefined &&
    info.phone_number !== undefined
  )
}

export const isValidExperience = (exp: any) => {
  return (
    exp.organization_name !== undefined &&
    exp.organization_type !== undefined &&
    exp.job_location !== undefined &&
    exp.job_title !== undefined &&
    exp.job_category !== undefined &&
    exp.job_level_id !== undefined &&
    exp.start_date !== undefined &&
    exp.end_date !== undefined &&
    exp.duties
  )
}
