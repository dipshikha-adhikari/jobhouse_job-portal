import { Request, Response } from "express";
import { QueryResult } from "pg";
import { IEmployerBasicInformation, } from "../../../types";
import { isValidBasicInformation } from "../../../helpers/validateEmployerProfileInsertion";
const pool = require('../../../lib/db')

interface IUserRequest extends Request {
    user: any
}


export const createBasicInformation= (req: IUserRequest, res: Response) => {
    const { id } = req.user
    const {organization_name,address,image, industry_type,cover_image, summary, phone_number, email }:IEmployerBasicInformation = req.body

            if (isValidBasicInformation(req.body)) {
                pool.query('select * from users where user_id = $1', [id], function (err: Error, result: QueryResult) {
                    if (err) return res.status(400).send({ message: err })
                    if (result.rowCount > 0) {
                        const role = result.rows[0].role
                     
                        if(role !== 'employer' || role === undefined){
                            return res.status(401).send({ message: 'Only employer is allowed' })
                        }
                        const query = `insert into employers_basic_information (user_id,organization_name,industry_id, address,image, cover_image, summary, phone_number, email ) values($1, $2, $3,$4,$5,$6,$7,$8, $9)`
                        pool.query(query, [id,organization_name,industry_type, address,image, cover_image, summary, phone_number, email ], function (err: Error, result: QueryResult) {
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
                    message: 'Invalid basic_information format', format: `organization_name,industry_type,address,image, cover_image, summary, phone_number, email `});
            }
        } 


        export const updateBasicInformation = (req: IUserRequest, res: Response) => {
            const { id } = req.user
    const {organization_name, industry_type,address,image, cover_image, summary, phone_number , email}:IEmployerBasicInformation = req.body

    if (isValidBasicInformation(req.body)) {
        pool.query('select * from employers_basic_information where user_id = $1', [id], function (err: Error, result: QueryResult) {
            if (err) return res.status(400).send({ message: err })
            if (result.rowCount > 0) {
             
                const query = `UPDATE employers_basic_information
             set   organization_name = $2, industry_id = $3,address = $4,image =$5, cover_image = $6, summary = $7, phone_number = $8, email = $9
                WHERE  user_id = $1`
        
                pool.query(query, [id, organization_name, industry_type,address,image, cover_image, summary, phone_number, email ], function (err: Error, result: QueryResult) {
                    if (err) return res.status(400).send({ message: err })
                    return res.status(201).send({ message: 'Success' })
                })
            } else {
                return res.status(400).send({ message: 'Basic information not found, make post request.' })
            }
        })
    }
    else {
        return res.status(400).send({
            message: 'Invalid basic_information format', format: `organization_name, industry_type,address,image, cover_image, summary, phone_number, email `});
    }
                } 

    
  



