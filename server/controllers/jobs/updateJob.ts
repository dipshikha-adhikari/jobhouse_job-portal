import { Response } from "express";
import { QueryResult } from "pg";
import { IUserRequest } from "../../types";
const pool = require('../../lib/db')

interface ICreateJob {
    title: string;
    experienceRequired: string;
    salary: string;
    deadline: Date;
    noOfVacancy: number;
    description: string;
    location: string;
    levelId: number;
    typeId: string;
    categoryId: string
    industryId: string
    educationRequired: string
    skills: any
};

export const updateJob = async (req: IUserRequest, res: Response) => {
    const { id } = req.user;

    const userQuery = 'select * from users where user_id = $1'

    pool.query(userQuery, [id], function (err: Error, result: QueryResult) {
        if (err) return res.status(400).send({ error: err })
        const role = result?.rows[0]?.role
        if (role !== 'employer') return res.status(400).send({ message: 'Role should be employer' })
        const jobId = req.params.jobId;
        const jobQuery = 'select * from jobs where employer_id = $1 and job_id = $2'

        pool.query(jobQuery, [id, jobId], function (err: Error, result: QueryResult) {
            if (err) return res.status(400).send({ error: 'Employer and job did not match' })
            if (result.rowCount > 0) {
                const { description, deadline, title, salary, categoryId, levelId, location, typeId, noOfVacancy, experienceRequired, industryId, educationRequired, skills }: ICreateJob = req.body
                if (isValidJobData(req.body)) {
                    const updateQuery = `UPDATE jobs SET employer_id = $2, description = $3, deadline = $4, title = $5, salary = $6, category_id = $7, level_id = $8, location = $9, type_id = $10, no_of_vacancy = $11,  experience_required = $12 , industry_id = $13, education_required = $14, skills = $15 where job_id = $1`;

                    pool.query(updateQuery, [jobId, id, description, deadline, title, salary, categoryId, levelId, location, typeId, noOfVacancy, experienceRequired, industryId, educationRequired, skills], (err: Error, result: QueryResult) => {
                        if (err) {
                            return res.status(400).send({ error: err });
                        }
                        return res.status(200).send({ message: 'Job updated successfully' });
                    });
                } else {
                    return res.status(400).send({ error: 'Invalid job format', format: ' description, deadline, title, salary, category_id, level, location, type, no_of_vacancy, experience_required' })
                }
            } else {
                return res.status(400).send({ error: 'You are not allowed' })

            }

        })
    })

};

const isValidJobData = (data: ICreateJob) => {
    return (
        data.description && data.deadline && data.title && data.salary && data.categoryId && data.levelId && data.location && data.typeId && data.noOfVacancy && data.experienceRequired && data.industryId && data.educationRequired
    )
}

