import { Request, Response } from "express";
import { QueryResult } from "pg";
import { IUserRequest } from "../../types";
const pool = require('../../lib/db')

export const getAppliedJobs = async (req: IUserRequest, res: Response) => {
    try {
        const { id } = req.user
        const data: QueryResult = await pool.query('select * from jobseeker_profile where user_id = $1', [id])
        if (data.rows.length > 0) {
            const jobseeker_id = data.rows[0].jobseeker_id
            const query = `
select job_applications.* , employer_profile.* from job_applications
left join employer_profile on job_applications.employer_id = employer_profile.employer_id
where jobseeker_id = $1
`
            let result: QueryResult = await pool.query(query, [jobseeker_id]);
            return res.status(200).send(result.rows)
        } else {
            return res.status(400).send({ message: "Could not find jobseeker" })
        }
    } catch (err) {
        return res.status(400).send({ message: err })
    }
}

