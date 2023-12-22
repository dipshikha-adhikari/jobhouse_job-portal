import { Request, Response } from "express";
import { QueryResult } from "pg";
const pool = require('../../lib/db')

export const getJobById = async (req: Request, res: Response) => {
    const{jobId} = req.params
  const query = `SELECT 
  j.*,
  c.category_name, 
  i.industry_name,
  json_build_object(
    'user_id', e.user_id,
    'organization_name', e.organization_name,
    'phone_number',e.phone_number,
    'image', e.image, 
  'cover_image', e.cover_image,
  'address', e.address
    
) AS employer_details
FROM jobs j
LEFT JOIN employers_basic_information e ON j.employer_id = e.user_id
LEFT JOIN categories c ON j.category_id = c.category_id
LEFT JOIN industries i ON j.industry_id = i.industry_id
WHERE j.job_id = $1
`

  pool.query(query,[jobId], function (err: Error, result: QueryResult) {
    if (err) {
      return res.status(400).send({ error: err });
    }
    return res.status(200).send(result.rows[0]);
  });

}