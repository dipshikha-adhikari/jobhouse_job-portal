import { Request, Response } from "express";

export const getTotalApplicantsCount = async(req:Request, res:Response) => {
    const query = `
    SELECT ja.*
FROM job_applications ja
JOIN jobs j ON ja.job_id = j.job_id
WHERE ja.employer_id = 18
AND j.deadline > CURRENT_DATE;
`
}