import { Request, Response } from "express";
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
    level: string;
    type: string;
    categoryId: string
    industryId: string
};

export const createJob = async (req: IUserRequest, res: Response) => {
    const { id } = req.user

    const userQuery = 'select * from employers_basic_information where user_id = $1'
    pool.query(userQuery, [id], function (err: Error, result: QueryResult) {
        if (err) return res.status(400).send({ error: err })
        if (result.rowCount > 0) {
            if (isValidJobData(req.body)) {
                const { description, deadline, title, salary, categoryId, level, location, type, noOfVacancy, experienceRequired , industryId}: ICreateJob = req.body
                const query = 'insert into jobs (employer_id,description,deadline, category_id,location,salary,title,experience_required,level,type,no_of_vacancy, industry_id) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12)'
                pool.query(query, [id, description, deadline, categoryId, location, salary, title, experienceRequired, level, type, noOfVacancy, industryId], function (err: Error, result: QueryResult) {
                    if (err) return res.status(400).send({ error: err })
                    return res.status(200).send({ message: 'Successfully created job' })
                })
            } else {
                return res.status(404).send({ message: 'Invalid job format' })
            }
        } else {
            return res.status(404).send({ message: 'update basic information first' })
        }


    })


}

const isValidJobData = (data: ICreateJob) => {
    return (
        data.description && data.deadline && data.title && data.salary && data.categoryId && data.level && data.location && data.type && data.noOfVacancy && data.experienceRequired && data.industryId
    )
}