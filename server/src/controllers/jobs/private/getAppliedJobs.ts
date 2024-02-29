import { Response } from 'express'
import { QueryResult } from 'pg'
import { IUserRequest } from '../../../types'
const pool = require('../../../lib/db')

export const getAppliedJobs = async (req: IUserRequest, res: Response) => {
  try {
    const { id } = req.user
    const user: QueryResult = await pool.query(
      `select * from users where user_id =$1 and role =$2`,
      [id, 'jobseeker']
    )

    if (user.rows.length > 0) {
      const query = `
    select job_applications.* , e.organization_name, img.url as employer_image, j.title, j.deadline from job_applications
    left join employers_basic_information e on job_applications.employer_id = e.user_id
    left join jobs j on job_applications.job_id = j.job_id
    left join images img on img.user_id = j.employer_id
    where jobseeker_id = $1
    `
      const result: QueryResult = await pool.query(query, [id])
      return res.status(200).send(result.rows)
    } else {
      return res.status(400).send({ message: 'Jobseeker  not found' })
    }
  } catch (err) {
    return res.status(400).send({ message: err })
  }
}
