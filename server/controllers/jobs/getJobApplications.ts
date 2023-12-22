import { Request, Response } from "express";
import { QueryResult } from "pg";
import { IUserRequest } from "../../types";
const pool = require('../../lib/db')

export const getJobApplications = async (req: IUserRequest, res: Response) => {
  const { id } = req.user
  const { jobId } = req.params


      const query = `select * from job_applications
  where job_id = $1 and employer_id = $2`

      pool.query(query, [jobId, id], function (err: Error, result: QueryResult) {
        if (err) {
          return res.status(400).send({ message: err });
        }
        return res.status(200).send(result.rows);
      });
    } 
  
