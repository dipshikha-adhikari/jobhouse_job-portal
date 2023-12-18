import { Request, Response } from "express";
import { QueryResult } from "pg";
const pool = require('../../../lib/db')

interface IUserRequest extends Request {
  user: any
}

export const getJobseekerProfile = async (req: IUserRequest, res: Response) => {
  const { id } = req.user
const {query} = req.query

  let profile: any = {

  }

  const basicInformationQuery = `select * from jobseekers_basic_information where user_id = $1`
  const experienceQuery = `select * from jobseekers_experience where user_id = $1`
  const educationQuery = `select * from jobseekers_education where user_id = $1`
  const jobPreferenceQuery = `SELECT
  jp.*,
  ARRAY_AGG(DISTINCT c.category_name) AS category_names,
  ARRAY_AGG(DISTINCT i.industry_name) AS industry_names
FROM
  jobseekers_job_preference jp
LEFT JOIN
  categories c ON c.category_id = ANY(jp.job_categories)
LEFT JOIN
  industries i ON i.industry_id = ANY(jp.job_industries)
WHERE
  jp.user_id = $1
GROUP BY
  jp.user_id, jp.id;
`





  try {

    
    
  if(query === 'basicInformation'){
    const basicInformation: QueryResult = await pool.query(basicInformationQuery, [id])
        return res.status(200).send(basicInformation.rows[0])
      }

if(query === 'jobPreference'){

  const result:QueryResult = await pool.query(jobPreferenceQuery,[id])
        return res.status(200).send(result.rows[0])
}
if(query === 'education'){
  const result:QueryResult = await pool.query(educationQuery,[id])
  return res.status(200).send(result.rows)
}
if(query === 'experience'){
  const result:QueryResult = await pool.query(experienceQuery,[id])
  return res.status(200).send(result.rows)
}

    const basicInformation: QueryResult = await pool.query(basicInformationQuery, [id])
    profile['basic_information'] = basicInformation.rows[0]
    const experience: QueryResult = await pool.query(experienceQuery, [id])
    profile['experience'] = experience.rows
    const education: QueryResult = await pool.query(educationQuery, [id])
    profile['education'] = education.rows
    const jobPreference: QueryResult = await pool.query(jobPreferenceQuery, [id])
    profile['job_preference'] = jobPreference.rows[0]

    return res.status(200).send(profile)

  } catch (err) {
    return res.status(400).send({ error: err })
  }

}


