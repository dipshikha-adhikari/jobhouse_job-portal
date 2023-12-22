import { Request, Response } from "express";
import { QueryResult } from "pg";
import { IUserRequest } from "../../types";
const pool = require('../../lib/db')

export const getAppliedJobs = async (req: IUserRequest, res: Response) => {
    try {
        const { id } = req.user
            const query = `
select job_applications.* , e.organization_name, e.image, j.title, j.deadline from job_applications
left join employers_basic_information e on job_applications.employer_id = e.user_id
left join jobs j on job_applications.job_id = j.job_id
where jobseeker_id = $1
`
            let result: QueryResult = await pool.query(query, [id]);
            return res.status(200).send(result.rows)
        }
    catch (err) {
        return res.status(400).send({ message: err })
    }
}

