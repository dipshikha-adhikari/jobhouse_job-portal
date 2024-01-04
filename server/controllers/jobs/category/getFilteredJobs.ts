import { Request, Response } from "express";
import { QueryResult } from "pg";
const pool = require('../../../lib/db')

export const getFilteredJobs =  (req: Request, res: Response) => {
    let { categoryId, industryId, level, type, limit, offset } = req.query // Assuming the category value is obtained from the request


    let queryString = '';
    let limitAndOffsetQuery = ''
    let paramsArray = [];

    if (categoryId !== undefined && categoryId !== 'undefined'  && categoryId !== 'null' && categoryId !== '') {
      queryString += `j.category_id = $${paramsArray.push(categoryId)} AND `;
  }
  if (industryId !== undefined && industryId !== 'undefined'  && industryId !== 'null' && industryId !== '') {
      queryString += `j.industry_id = $${paramsArray.push(industryId)} AND `;
  }
  if (level !== undefined && level !== 'null' && level !== 'undefined' && level !== '') {
      queryString += `jl.level_name ILIKE '%' || $${paramsArray.push(level)} || '%' AND `;
  }
  if (type !== undefined && type !== 'null' && type !== 'undefined' && type !== '') {
      queryString += `jt.type_name ILIKE '%' || $${paramsArray.push(type)} || '%' AND `;
  }
  if (limit !== undefined && limit !== 'null' && limit !== 'undefined' && limit !== '') {
     limitAndOffsetQuery += `limit $${paramsArray.push(limit)} `;
  }
  if (offset !== undefined && offset !== 'null' && offset !== 'undefined' && offset !== '') {
      limitAndOffsetQuery += `offset $${paramsArray.push(offset)} `;
  }

    const query = `
    WITH employer_details AS (
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
      j.*, jt.type_name,jl.level_name,
      ed.employer_info AS employer_details,
      COALESCE(COUNT(ja.job_id), 0) AS job_application_count
    FROM jobs j
    LEFT JOIN employer_details ed ON j.employer_id = ed.user_id
    LEFT JOIN job_applications ja ON j.job_id = ja.job_id
    left join job_types jt on j.type_id = jt.type_id
    left join job_levels jl on j.level_id = jl.level_id
    
    WHERE  ${queryString}  j.deadline > NOW() 
    GROUP BY j.job_id, ed.employer_info, jt.type_name, jl.level_name
${limitAndOffsetQuery}
   `;
 
console.log(queryString, paramsArray)
if(queryString === '' )  return res.status(400).send({message:'Query can not be empty ' });
    pool.query(query, paramsArray, function (err: Error, result: QueryResult) {
        if (err) {
            return res.status(400).send({message:'Please set valid queries' });
        }
        return res.status(200).send(result.rows);
    });
};
