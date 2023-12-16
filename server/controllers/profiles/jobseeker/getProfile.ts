import {  Request, Response } from "express";
import { QueryResult } from "pg";
const pool = require('../../../lib/db')

interface IUserRequest extends Request{
  user:any
}

export const getJobseekerProfile = (req:IUserRequest, res:Response) => {
const{id} = req.user
const query = `select * from  jobseekers_basic_information 
left join jobseekers_job_preference ON jobseekers_job_preference.user_id = jobseekers_basic_information.user_id
left join jobseekers_experience on jobseekers_experience.user_id = jobseekers_basic_information.user_id
left join jobseekers_education on jobseekers_education.user_id = jobseekers_basic_information.user_id
where jobseekers_basic_information.user_id = $1`
pool.query(query,[id], function(err:Error,result:QueryResult){
    if(err) return res.status(400).send({error:err})
    if(result.rowCount > 0){
      return  res.status(200).send(result.rows[0])

    }else{
  return  res.status(404).send({message:"Not found"})

    }
})
}


