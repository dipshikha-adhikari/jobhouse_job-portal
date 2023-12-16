import { Request, Response } from "express";
import { QueryResult } from "pg";
const pool = require('../../lib/db')

export const getJobsByIndustries = async (req: Request, res: Response) => {
  let {industryId}= req.params

  const query = `
    SELECT jobs.*, employers_basic_information
    FROM jobs
    LEFT JOIN employers_basic_information ON jobs.employer_id = employers_basic_information.user_id
    WHERE jobs.industry_id = $1
    AND deadline > NOW()`; // Using JSON operator to access nested property

  pool.query(query, [industryId], function (err: Error, result: QueryResult) {
    if (err) {
      return res.status(400).send({ error: err });
    }
    return res.status(200).send(result.rows);
  });
};
