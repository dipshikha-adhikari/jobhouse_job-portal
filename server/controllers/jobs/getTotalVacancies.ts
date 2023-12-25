import { Request, Response } from "express";

export const getTotalVacancies = async(req:Request, res:Response) => {
    const query = `SELECT ja.employer_id, SUM(j.vacancy_count) AS total_vacancy_count
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.job_id
    WHERE ja.employer_id = <your_employer_id>
    GROUP BY ja.employer_id;
    `
}