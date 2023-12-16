import { Request, Response } from "express";
import { QueryResult } from "pg";
const pool = require('../../lib/db')

interface IUserRequest extends Request {
  user: any
}

export const applyForJob = async (req: IUserRequest, res: Response) => {
  try {
    const { id } = req.user
   
    const result: QueryResult = await pool.query('select * from jobseeker_profile where user_id = $1', [id])
    let profiles = result.rows

    if (profiles.length > 0) {
      const { employer_id, job_id } = req.body
      if(employer_id === undefined || job_id === undefined){
        return res.status(400).send({ message: 'employer_id or job_id is undefined' })
      }
      let profile = profiles[0]
      let jobseeker_id = profile.jobseeker_id
      const query = 'insert into job_applications (employer_id,job_id,jobseeker_id) values($1, $2, $3)'
       await pool.query(query, [employer_id, job_id, jobseeker_id])
      res.status(200).send({ message: 'Success' })
    } else {
      return res.status(400).send({ message: 'Jobseeker profile not found' })
    }
  } catch (err) {
    return res.status(400).send({ message: err })
  }
}


