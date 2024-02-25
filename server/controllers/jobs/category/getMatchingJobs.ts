import { Response } from "express";
import { IUserRequest } from "../../../types";
import { QueryResult } from "pg";
const pool = require('../../../lib/db')

export const getMatchingJobs = (req: IUserRequest, res: Response) => {
  const { id } = req.user

  const query = `
    SELECT j.*, u.fullname AS employer_name, img.url as employer_image
    FROM jobs j
    JOIN jobseekers_job_preference jjp ON 
      (j.category_id = ANY(jjp.job_categories) OR j.industry_id = ANY(jjp.job_industries))
    JOIN users u ON j.employer_id = u.user_id
    join images img on j.employer_id = img.user_id
    join employers_basic_information e on j.employer_id = e.user_id
    WHERE jjp.user_id = $1 and deadline > now();
`

  pool.query(query, [id], (err: Error, result: QueryResult) => {
    if (err) return res.status(400).send({ message: err })
    res.status(200).send(result.rows)
  })
}