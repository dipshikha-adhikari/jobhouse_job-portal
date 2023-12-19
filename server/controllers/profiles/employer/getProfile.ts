import { Request, Response } from 'express';
import { QueryResult } from 'pg';
const pool = require('../../../lib/db')

interface IUserRequest extends Request {
  user: any
}

export const getEmployerProfile = (req: IUserRequest, res: Response) => {
  const { id } = req.user;
  const query = `
  SELECT 
 
  users.user_id,

 json_build_object(
   'industry_type', i.industry_name,
   'summary', ebi.summary,
   'cover_image', ebi.cover_image,
   'image', ebi.image,
   'industry_id', ebi.industry_id,
   'organization_name', ebi.organization_name,
   'address', ebi.address,
   'email',ebi.email,
   'phone_number', ebi.phone_number,
   'id',ebi.id
 ) as basic_information,

 json_build_object(
     'website', eoi.website,
     'id',eoi.id
 ) AS other_information

FROM users
LEFT JOIN employers_basic_information ebi ON ebi.user_id = users.user_id

LEFT JOIN employers_other_information eoi ON eoi.user_id = users.user_id
LEFT JOIN industries i ON ebi.industry_id = i.industry_id
WHERE users.user_id = $1


  
`
  pool.query(query, [id], function (err: Error, result: QueryResult) {
    if (err) return res.status(400).send({ error: err });
    return res.status(200).send(result.rows[0]);
  });
};

export const getEmployerProfileById = (req: Request, res: Response) => {
  const { employerId } = req.params
  const query = ` SELECT 
 
  users.user_id,

 json_build_object(
   'industry_type', i.industry_name,
   'summary', ebi.summary,
   'cover_image', ebi.cover_image,
   'image', ebi.image,
   'industry_id', ebi.industry_id,
   'organization_name', ebi.organization_name,
   'address', ebi.address,
   'email',ebi.email,
   'phone_number', ebi.phone_number,
   'id',ebi.id
 ) as basic_information,

 json_build_object(
     'website', eoi.website,
     'id',eoi.id
 ) AS other_information

FROM users
LEFT JOIN employers_basic_information ebi ON ebi.user_id = users.user_id

LEFT JOIN employers_other_information eoi ON eoi.user_id = users.user_id
LEFT JOIN industries i ON ebi.industry_id = i.industry_id
WHERE users.user_id = $1


  `
  console.log(employerId)
  pool.query(query, [employerId], function (err: Error, result: QueryResult) {
    if (err) return res.status(400).send({ error: err });
    return res.status(200).send(result.rows[0]);
  });
};



