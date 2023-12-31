import { Response } from "express";
import { QueryResult } from "pg";
import { IUserRequest } from "../../types";
const pool = require('../../lib/db')

export const getTotalApplicantsCount = async (req: IUserRequest, res: Response) => {
    const { id } = req.user

    const query = `
    SELECT ja.*
FROM job_applications ja
left JOIN jobs j ON ja.job_id = j.job_id
WHERE ja.employer_id = $1 AND deadline > NOW() 

`
    try {
        const result: QueryResult = await pool.query(query, [id])
        return res.status(200).send(result.rows)
    } catch (err) {
        return res.status(400).send({ message: 'Can not found total applicants' })
    }


}