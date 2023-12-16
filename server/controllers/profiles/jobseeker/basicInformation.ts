import { Request, Response } from "express";
import { QueryResult } from "pg";
import { isValidBasicInformation, isValidEducation } from "../../../helpers/validateJobseekerProfileInsertion";
import { IJobseekerBasicInformation } from "../../../types";
const pool = require('../../../lib/db')

interface IUserRequest extends Request {
    user: any
}


export const createBasicInfo= (req: IUserRequest, res: Response) => {
    const { id } = req.user
    const {fullname, date_of_birth, phone_number, permanent_address,current_address, gender  }:IJobseekerBasicInformation = req.body
  
            if (isValidBasicInformation(req.body)) {
                pool.query('select * from users where user_id = $1', [id], function (err: Error, result: QueryResult) {
                    if (err) return res.status(400).send({ message: err })
                    if (result.rowCount > 0) {
                        const role = result.rows[0].role
                        if(role !== 'jobseeker'){
                            return res.status(401).send({ message: 'Only jobseeker is allowed' })
                        }
                        const query = `insert into jobseekers_basic_information (user_id,fullname, date_of_birth, phone_number, permanent_address,current_address, gender  ) values($1, $2, $3,$4,$5,$6,$7)`
                        pool.query(query, [id, fullname, date_of_birth, phone_number, permanent_address,current_address, gender ], function (err: Error, result: QueryResult) {
                            if (err) return res.status(400).send({ message: err })
                            return res.status(201).send({ message: 'Success' })
                        })
                    } else {
                        return res.status(400).send({ message: 'User not found' })
                    }
                })
            }
            else {
                return res.status(400).send({
                    message: 'Invalid basic_information format', format: `fullname, date_of_birth, phone_number, permanent_address,current_address, gender `});
            }
        } 


        export const updateBasicInfo = (req: IUserRequest, res: Response) => {
            const { id } = req.user
    const {fullname, date_of_birth, phone_number, permanent_address,current_address, gender  }:IJobseekerBasicInformation = req.body

    if (isValidBasicInformation(req.body)) {
        pool.query('select * from jobseekers_basic_information where user_id = $1', [id], function (err: Error, result: QueryResult) {
            if (err) return res.status(400).send({ message: err })
            if (result.rowCount > 0) {
               
                const query = `UPDATE jobseekers_basic_information
                SET fullname = $2 , date_of_birth = $3, phone_number = $4, permanent_address = $5,current_address = $6, gender = $7
                WHERE  user_id = $1`
        
                pool.query(query, [id, fullname, date_of_birth, phone_number, permanent_address,current_address, gender ], function (err: Error, result: QueryResult) {
                    if (err) return res.status(400).send({ message: err })
                    return res.status(201).send({ message: 'Success' })
                })
            } else {
                return res.status(400).send({ message: 'Basic information not found, make a post request' })
            }
        })
    }
    else {
        return res.status(400).send({
            message: 'Invalid basic_information format', format: `fullname, date_of_birth, phone_number, permanent_address,current_address, gender `});
    }
                } 

    
  


