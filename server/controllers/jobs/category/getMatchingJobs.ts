import { Response } from "express";
import { IUserRequest } from "../../../types";
import { QueryResult } from "pg";
const pool = require('../../../lib/db')

export const getMatchingJobs = (req:IUserRequest, res:Response) => {
    const {id} = req.user 

    const query = `
    SELECT j.*
FROM jobs j
JOIN jobseekers_job_preference jjp ON 
  (j.category_id = ANY(jjp.job_categories) OR j.industry_id = ANY(jjp.job_industries))
WHERE jjp.user_id = $1; -- Replace with the desired user_id from jobseekers_job_preference
`

pool.query(query,[id], (err:Error, result:QueryResult) => {
if(err) return res.status(400).send({message:err})
res.status(200).send(result.rows)
})
}