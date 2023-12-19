import { Request, Response } from "express";
import { QueryResult } from "pg";
const pool = require('../../../lib/db')

export const getJobsByCategories = async (req: Request, res: Response) => {
  let {categoryId} = req.params // Assuming the category value is obtained from the request

  // Construct the query with ILIKE operator for case-insensitive pattern matching
  const query = `
  SELECT jobs.*, employers_basic_information
  FROM jobs
  LEFT JOIN employers_basic_information ON jobs.employer_id = employers_basic_information.user_id
  WHERE jobs.category_id = $1
  AND deadline > NOW()
  `;

  pool.query(query, [categoryId], function (err: Error, result: QueryResult) {
    if (err) {
      return res.status(400).send({ error: err });
    }
    return res.status(200).send(result.rows);
  });
};
