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
    levelId: string;
    typeId: string;
    categoryId: string
    industryId: string
    educationRequired: string
    skills: any
};

export const createJob = async (req: IUserRequest, res: Response) => {
    const { id } = req.user

    const userQuery = 'select * from employers_basic_information where user_id = $1'
    pool.query(userQuery, [id], function (err: Error, result: QueryResult) {
        if (err) return res.status(400).send({ message: 'Employer account not found' })
        if (result.rowCount > 0) {
            if (isValidJobData(req.body)) {
                const { description, deadline, title, salary, categoryId, levelId, location, typeId, noOfVacancy, experienceRequired, industryId, educationRequired, skills }: ICreateJob = req.body
                const query = 'insert into jobs (employer_id,description,deadline, category_id,location,salary,title,experience_required,level_id,type_id,no_of_vacancy, industry_id, education_required, skills) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12, $13,$14)'
                pool.query(query, [id, description, deadline, categoryId, location, salary, title, experienceRequired, levelId, typeId, noOfVacancy, industryId, educationRequired, skills], function (err: Error, result: QueryResult) {
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
        data.description && data.deadline && data.title && data.salary && data.categoryId && data.levelId && data.location && data.typeId && data.noOfVacancy && data.experienceRequired && data.industryId && data.educationRequired
    )
}