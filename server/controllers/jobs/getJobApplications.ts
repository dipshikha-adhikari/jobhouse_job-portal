import { Response } from "express";
import { QueryResult } from "pg";
import { IUserRequest } from "../../types";
const pool = require('../../lib/db')

export const getJobApplications = async (req: IUserRequest, res: Response) => {
  const { id } = req.user
  const { jobId } = req.query
  const { limit } = req.query
  const { offset } = req.query

  const query = `
      SELECT
      ja.job_id,
      ja.employer_id,
      ja.jobseeker_id,
      jbi.fullname,
      jjp.summary,jjp.expected_salary, jjp.job_title,
      json_agg(
        json_build_object(
          'start_date', je.start_date,
          'end_date', je.end_date
        )
      ) AS experience,
      json_build_object (
        'url', i.url,
        'public_id', i.public_id
      ) AS image
    FROM job_applications ja
    LEFT JOIN images i ON ja.jobseeker_id = i.user_id
    LEFT JOIN jobseekers_experience je ON ja.jobseeker_id = je.user_id
    LEFT JOIN jobseekers_job_preference jjp ON ja.jobseeker_id = jjp.user_id
    LEFT JOIN jobseekers_basic_information jbi ON jbi.user_id = ja.jobseeker_id
    WHERE ja.job_id = $1 AND ja.employer_id = $2
    GROUP BY ja.job_id, ja.employer_id, ja.jobseeker_id, jbi.fullname, jjp.summary, jjp.job_title, jjp.expected_salary,i.url, i.public_id
    -- Define an appropriate ordering column here
    LIMIT $3 OFFSET $4; -- Adjust the offset based on the page number
      `

      pool.query('select * from  employers_other_information where user_id = $1',[id], (err:Error, result:QueryResult) => {
        if(err)       return res.status(400).send( 'can not find employers_other_information');
        if(result.rowCount > 0){
          pool.query(query, [jobId, id, limit, offset], function (err: Error, result: QueryResult) {
            if (err) {
              return res.status(400).send({ message: 'Can not get job applications' });
            }
            return res.status(200).send(result.rows);
          });
        }else{
      return res.status(400).send({     message: 'employer not found' });
        }
      })


}

