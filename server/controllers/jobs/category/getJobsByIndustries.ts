import { Request, Response } from "express";
import { QueryResult } from "pg";
const pool = require('../../../lib/db')

export const getJobsByIndustries = async (req: Request, res: Response) => {
  let {industryId}= req.params

  const query =  `WITH employer_details AS (
    SELECT
      e.user_id,
      jsonb_build_object(
        'organization_name', e.organization_name,
        'phone_number', e.phone_number,
        'address', e.address,
        'image', COALESCE(img.url, '') -- Adjust the column name and table alias as needed
      ) AS employer_info
    FROM employers_basic_information e
    LEFT JOIN images img ON img.user_id = e.user_id -- Adjust the column name and table alias as needed
  )
  SELECT
    j.*,
    ed.employer_info AS employer_details,
    COALESCE(COUNT(ja.job_id), 0) AS job_application_count
  FROM jobs j
  LEFT JOIN employer_details ed ON j.employer_id = ed.user_id
  LEFT JOIN job_applications ja ON j.job_id = ja.job_id
  WHERE j.industry_id = $1
    AND j.deadline > NOW()
  GROUP BY j.job_id, ed.employer_info;
  `; // Using JSON operator to access nested property

  pool.query(query, [industryId], function (err: Error, result: QueryResult) {
    if (err) {
      return res.status(400).send({ error: err });
    }
    return res.status(200).send(result.rows);
  });
};
