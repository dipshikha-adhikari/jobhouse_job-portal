import { Request, Response } from 'express'
import { QueryResult } from 'pg'
const pool = require('../lib/db')

export const getTopEmployers = async (req: Request, res: Response) => {
  try {
    const result: QueryResult = await pool.query(`SELECT
ebi.user_id,
ebi.organization_name,
img.url as image_url,
i.industry_name,
COUNT(j.job_id) AS job_count
FROM
employers_basic_information ebi
LEFT JOIN
jobs j ON ebi.user_id = j.employer_id
LEFT JOIN
industries i ON ebi.industry_id = i.industry_id
left join images img on ebi.user_id = img.user_id where j.deadline > NOW()
GROUP BY
ebi.user_id, ebi.organization_name,  i.industry_name, img.url
ORDER BY
COUNT(j.job_id) DESC
LIMIT 5;
`)
    res.status(200).send(result.rows)
  } catch (err) {
    res.status(400).send({ message: 'Can not get employers' })
  }
}
