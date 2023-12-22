import { Response } from "express";
import { QueryResult } from "pg";
import { IJob, IUserRequest } from "../../types";
const pool = require('../../lib/db')

interface ICreateJob {
    title: string;
    experienceRequired: string;
    salary: string;
    deadline: Date;
    noOfVacancy: number;
    description: string;
    location: string;
    level: string;
    type: string;
    categoryId: string
    industryId: string
    educationRequired:string 
    skills:any
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

            const { description, deadline, title, salary, categoryId, level, location, type, noOfVacancy, experienceRequired , industryId, educationRequired, skills}: ICreateJob = req.body

            // Construct the update query dynamically based on the received fields in the request body
if(isValidJobData(req.body)){
    const updateQuery = `UPDATE jobs SET employer_id = $2, description = $3, deadline = $4, title = $5, salary = $6, category_id = $7, level = $8, location = $9, type = $10, no_of_vacancy = $11,  experience_required = $12 , industry_id = $13, education_required = $14, skills = $15 where job_id = $1`;

    pool.query(updateQuery, [jobId, id, description, deadline, title, salary, categoryId, level, location, type, noOfVacancy, experienceRequired, industryId, educationRequired, skills], (err: Error, result: QueryResult) => {
        if (err) {
            return res.status(400).send({ error: err });
        }
        return res.status(200).send({ message: 'Job updated successfully' });
    });
}else{
    return res.status(400).send({ error: 'Invalid job format', format:' description, deadline, title, salary, category_id, level, location, type, no_of_vacancy, experience_required' })
}
        })
    })

};

const isValidJobData = (data: ICreateJob) => {
    return (
        data.description && data.deadline && data.title && data.salary && data.categoryId && data.level && data.location && data.type && data.noOfVacancy && data.experienceRequired && data.industryId && data.educationRequired
    )
}

