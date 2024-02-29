import { Request, Response } from 'express'
import { QueryResult } from 'pg'
const pool = require('../../../lib/db')

interface IUserRequest extends Request {
  user: any
}

export const getJobseekerProfile = async (req: IUserRequest, res: Response) => {
  const { id } = req.user
  const { query } = req.query

  const profile: any = {}

  const basicInformationQuery = `select jbi.*, 
  json_build_object (
    'url', i.url,
    'public_id', i.public_id
  ) as image 
  from jobseekers_basic_information jbi 
  left join images i on jbi.user_id = i.user_id
  where jbi.user_id = $1`
  const experienceQuery = `select je.* , l.level_name
   from jobseekers_experience je
   left join job_levels l on je.job_level_id = l.level_id
   where user_id = $1
  `
  const educationQuery = `select * from jobseekers_education where user_id = $1`
  const jobPreferenceQuery = `SELECT
  jp.*,l.level_name, t.type_name,
  ARRAY_AGG(DISTINCT c.category_name) AS category_names,
  ARRAY_AGG(DISTINCT i.industry_name) AS industry_names
FROM
  jobseekers_job_preference jp
LEFT JOIN
  categories c ON c.category_id = ANY(jp.job_categories)
LEFT JOIN
  industries i ON i.industry_id = ANY(jp.job_industries)
  left join job_levels l on jp.job_level_id = l.level_id 
  left join job_types t on jp.job_type_id = t.type_id 
WHERE
  jp.user_id = $1
GROUP BY
  jp.user_id, jp.id, l.level_name, t.type_name;
`
  try {
    if (query === 'basicInformation') {
      const basicInformation: QueryResult = await pool.query(
        basicInformationQuery,
        [id]
      )
      return res.status(200).send(basicInformation.rows[0])
    }

    if (query === 'jobPreference') {
      const result: QueryResult = await pool.query(jobPreferenceQuery, [id])
      return res.status(200).send(result.rows[0])
    }
    if (query === 'education') {
      const result: QueryResult = await pool.query(educationQuery, [id])
      return res.status(200).send(result.rows)
    }
    if (query === 'experience') {
      const result: QueryResult = await pool.query(experienceQuery, [id])
      return res.status(200).send(result.rows)
    }

    const user: QueryResult = await pool.query(
      'select * from users where user_id = $1',
      [id]
    )
    profile['user_id'] = user.rows[0].user_id
    const basicInformation: QueryResult = await pool.query(
      basicInformationQuery,
      [id]
    )
    profile['basic_information'] = basicInformation.rows[0]
    const experience: QueryResult = await pool.query(experienceQuery, [id])
    profile['experience'] = experience.rows
    const education: QueryResult = await pool.query(educationQuery, [id])
    profile['education'] = education.rows
    const jobPreference: QueryResult = await pool.query(jobPreferenceQuery, [
      id
    ])
    profile['job_preference'] = jobPreference.rows[0]
    return res.status(200).send(profile)
  } catch (err) {
    return res.status(400).send({ error: err })
  }
}
