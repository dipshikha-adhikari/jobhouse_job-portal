import { Request, Response } from "express";
import { QueryResult } from "pg";
const pool = require('../../lib/db')

export const getJobById = async (req: Request, res: Response) => {
    const{jobId} = req.params
  const query = `SELECT 
  j.*,
  c.category_name, 
  i.industry_name,
  ed.employer_details,
  COALESCE(ja.job_application_count, 0) AS job_application_count
FROM jobs j
LEFT JOIN categories c ON j.category_id = c.category_id
LEFT JOIN industries i ON j.industry_id = i.industry_id
LEFT JOIN (
  SELECT 
    j.job_id,
    json_build_object(
      'user_id', e.user_id,
      'organization_name', e.organization_name,
      'phone_number', e.phone_number,
      'image', img.url, 
      'cover_image', cimg.url,
      'address', e.address
    ) AS employer_details
  FROM jobs j
  LEFT JOIN employers_basic_information e ON j.employer_id = e.user_id
  LEFT JOIN cover_images cimg ON cimg.user_id = e.user_id
  LEFT JOIN images img ON img.user_id = e.user_id
  WHERE j.job_id = $1
) AS ed ON j.job_id = ed.job_id
LEFT JOIN (
  SELECT job_id, COUNT(*) AS job_application_count
  FROM job_applications
  GROUP BY job_id
) AS ja ON j.job_id = ja.job_id
WHERE j.job_id = $1;

`

  pool.query(query,[jobId], function (err: Error, result: QueryResult) {
    if (err) {
      return res.status(400).send({ error: err });
    }
    return res.status(200).send(result.rows[0]);
  });

}