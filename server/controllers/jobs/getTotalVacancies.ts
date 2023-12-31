import { Request, Response } from "express";
import { QueryResult } from "pg";
import { IUserRequest } from "../../types";
const pool = require('../../lib/db')

export const getTotalVacancies = async(req:IUserRequest, res:Response) => {
  const{id} = req.user
    const query = `
    SELECT j.employer_id, SUM(j.no_of_vacancy) AS total_vacancy_count
    FROM jobs j
    WHERE j.employer_id = $1 AND deadline > NOW()
    GROUP BY j.employer_id 
    `
    try {
        const result: QueryResult = await pool.query(query, [id])
        return res.status(200).send(result.rows[0])
    } catch (err) {
        return res.status(400).send({ message: 'Can not found vacancies' })
    }

}