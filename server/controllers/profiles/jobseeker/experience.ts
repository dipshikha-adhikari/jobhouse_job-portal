import { Request, Response } from "express";
import { QueryResult } from "pg";
import { isValidExperience } from "../../../helpers/validateJobseekerProfileInsertion";
import { IJobseekerExperience } from "../../../types";
const pool = require('../../../lib/db')

interface IUserRequest extends Request {
    user: any
}

export const createExperience = (req: IUserRequest, res: Response) => {
    const { id } = req.user
    const { organization_name, organization_type, job_location, job_category, job_title, job_level_id, start_date, end_date, duties }: IJobseekerExperience = req.body

    if (isValidExperience(req.body)) {
        pool.query('select * from users where user_id = $1', [id], function (err: Error, result: QueryResult) {
            if (err) return res.status(400).send({ message: err })
            if (result.rowCount > 0) {
                const role = result.rows[0].role
                if (role !== 'jobseeker') {
                    return res.status(401).send({ message: 'Only jobseeker is allowed' })
                }
                const query = `insert into jobseekers_experience (user_id, organization_name, organization_type,job_location, job_category, job_title, job_level_id, start_date, end_date, duties) values ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10)`
                pool.query(query, [id, organization_name, organization_type, job_location, job_category, job_title, job_level_id, start_date, end_date, duties], function (err: Error, result: QueryResult) {
                    if (err) return res.status(400).send({ message: err })
                    return res.status(200).send({ message: 'Success' })
                })
            } else {
                return res.status(400).send({ message: 'User not found' })
            }
        })
    } else {
        return res.status(400).send({
            message: 'Invalid experience format', format: `organization_name  &&
          organization_type  && job_location  && job_title  && job_category  && job_level_id  && start_date  && end_date  && duties` });
    }
}


export const updateExperience = (req: IUserRequest, res: Response) => {
    const { id } = req.user
    const {experienceId} = req.params
    const { organization_name, organization_type, job_location, job_category, job_title, job_level_id, start_date, end_date, duties }: IJobseekerExperience = req.body

    if (isValidExperience(req.body)) {
        pool.query('select * from jobseekers_experience where user_id = $1 and id = $2', [id, experienceId], function (err: Error, result: QueryResult) {
            if (err) return res.status(400).send({ message: err })
            if (result.rowCount > 0) {
                const query = `UPDATE jobseekers_experience
                    SET organization_name = $3, organization_type = $4,job_location = $5, job_category = $6, job_title = $7, job_level_id = $8, start_date = $9, end_date = $10, duties = $11
                    WHERE  id = $1 and user_id = $2`

                pool.query(query, [experienceId, id, organization_name, organization_type, job_location, job_category, job_title, job_level_id, start_date, end_date, duties], function (err: Error, result: QueryResult) {
                    if (err) return res.status(400).send({ message: err })
                    return res.status(200).send({ message: 'Success' })
                })
            } else {
                return res.status(400).send({ message: 'Experience with this experienceId is not found' })
            }
        })
    } else {
        return res.status(400).send({
            message: 'Invalid experience format', format: `organization_name  &&
          organization_type  && job_location  && job_title  && job_category  && job_level_id  && start_date  && end_date  && duties` });
    }
}








