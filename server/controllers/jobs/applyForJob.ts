import { Request, Response } from "express";
import { QueryResult } from "pg";
const pool = require('../../lib/db')

interface IUserRequest extends Request {
  user: any
}

export const applyForJob = async (req: IUserRequest, res: Response) => {
  try {
    const { id } = req.user

    const result: QueryResult = await pool.query('select * from jobseekers_education where user_id = $1', [id])
    let educations = result.rows
 const experienceResult:QueryResult = await pool.query('select * from jobseekers_experience where user_id = $1',[id])
const experience = experienceResult.rows
    if (educations.length > 0 || experience.length > 0) {
      const { employer_id, job_id } = req.body
      if (employer_id === undefined || job_id === undefined) {
        return res.status(400).send({ message: 'employer_id or job_id is undefined' })
      }
      const result: QueryResult = await pool.query('select * from job_applications where jobseeker_id = $1 and job_id = $2',[id, job_id])
      if (result.rowCount > 0) {
        return res.status(400).send({ message: 'already applied for this job' })
      }

      const query = 'insert into job_applications (employer_id,job_id,jobseeker_id) values($1, $2, $3)'
      await pool.query(query, [employer_id, job_id, id])
      res.status(200).send({ message: 'Success' })
    } else {
      return res.status(400).send({ message: 'Experience or education must be updated' })
    }
  } catch (err) {
    return res.status(400).send({ message: err })
  }
}


