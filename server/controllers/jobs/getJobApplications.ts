import { Request, Response } from "express";
import { QueryResult } from "pg";
import { IUserRequest } from "../../types";
const pool = require('../../lib/db')

export const getJobApplications = async (req: IUserRequest, res: Response) => {
  const { id } = req.user
  const { jobId } = req.params

  pool.query('select * from employer_profile where user_id = $1', [id], function (err: Error, result: QueryResult) {
    if (err) return res.status(400).send({ message: err })
    const data = result.rows
    if (data.length > 0) {
      const employerId = data[0].employer_id

      const query = `select job_applications.*, jobseeker_profile.* from job_applications
  left join jobseeker_profile on job_applications.jobseeker_id = jobseeker_profile.jobseeker_id
  where job_id = $1 and employer_id = $2`

      pool.query(query, [jobId, employerId], function (err: Error, result: QueryResult) {
        if (err) {
          return res.status(400).send({ message: err });
        }
        return res.status(200).send(result.rows);
      });
    } else {
      return res.status(400).send({ message: "Employer not found" })
    }
  })
}