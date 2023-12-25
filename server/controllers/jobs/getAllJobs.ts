import { Request, Response } from "express";
import { QueryResult } from "pg";
const pool = require('../../lib/db')

export const getAllJobs = async (req: Request, res: Response) => {
  const query = `
  SELECT j.*,
  c.category_name,
  i.industry_name,
  jsonb_build_object(
      'user_id', e.user_id,
      'organization_name', e.organization_name,
      'phone_number', e.phone_number,
      'address', e.address,
      'image',img.url
  ) AS employer_details,
  COALESCE(COUNT(ja.job_id), 0) AS job_application_count
FROM jobs j
LEFT JOIN employers_basic_information e ON j.employer_id = e.user_id
LEFT JOIN categories c ON j.category_id = c.category_id
LEFT JOIN industries i ON j.industry_id = i.industry_id
LEFT JOIN job_applications ja ON j.job_id = ja.job_id
left join images img on img.user_id = e.user_id
WHERE j.deadline > NOW()
GROUP BY j.job_id, e.user_id, c.category_name, i.industry_name, employer_details


`
  pool.query(query, function (err: Error, result: QueryResult) {
    if (err) {
      return res.status(400).send({ error: err });
    }
    return res.status(200).send(result.rows);
  });

}

