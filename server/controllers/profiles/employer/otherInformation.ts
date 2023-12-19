import { Request, Response } from "express";
import { QueryResult } from "pg";
import { IEmployerBasicInformation, IEmployerOtherInformation, } from "../../../types";
import { isValidBasicInformation, isValidOtherInformation } from "../../../helpers/validateEmployerProfileInsertion";
const pool = require('../../../lib/db')

interface IUserRequest extends Request {
    user: any
}


export const createOtherInformation = (req: IUserRequest, res: Response) => {
    const { id } = req.user
    const { website }: IEmployerOtherInformation = req.body

    if (isValidOtherInformation(req.body)) {

        pool.query('SELECT * FROM employers_other_information WHERE user_id = $1', [id], function (err: Error, result: QueryResult) {
            if (err) return res.status(400).send({ message: err });
            if (result.rowCount > 0) {
                res.status(400).send({ message: 'Already exists, please make put request' })
            } else {

                pool.query('select * from users where user_id = $1', [id], function (err: Error, result: QueryResult) {
                    if (err) return res.status(400).send({ message: err })
                    if (result.rowCount > 0) {
                        const role = result.rows[0].role
                        if (role !== 'employer') {
                            return res.status(401).send({ message: 'Only employer is allowed' })
                        }
                        console.log(id)
                        const query = `insert into employers_other_information (user_id, website ) values($1, $2)`
                        pool.query(query, [id, website], function (err: Error, result: QueryResult) {
                            if (err) return res.status(400).send({ message: err })
                            return res.status(201).send({ message: 'Success' })
                        })
                    } else {
                        return res.status(400).send({ message: 'User not found' })
                    }
                })
            }
        }
        )

    }
    else {
        return res.status(400).send({
            message: 'Invalid other_information format', format: `website `
        });
    }
}


export const updateOtherInformation = (req: IUserRequest, res: Response) => {
    const { id } = req.user
    const { website }: IEmployerOtherInformation = req.body
    if (isValidOtherInformation(req.body)) {
        pool.query('select * from employers_other_information where user_id = $1', [id], function (err: Error, result: QueryResult) {
            if (err) return res.status(400).send({ message: err })
            if (result.rowCount > 0) {

                const query = `UPDATE employers_other_information
             set website = $2
                WHERE  user_id = $1`

                pool.query(query, [id, website], function (err: Error, result: QueryResult) {
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
            message: 'Invalid other_information format', format: `website `
        });
    }
}






