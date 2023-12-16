import { Request, Response } from "express";
import { QueryResult } from "pg";
import { IUserRequest } from "../../types";
const pool = require('../../lib/db')

export const getAllJobsByEmployerId = async (req: IUserRequest, res: Response) => {
    const {employerId } = req.params
    if(employerId === undefined) return res.status(400).send({message:'Please provide a valid employerId'})
    
        const query = `
        SELECT j.*,
    i.industry_name, c.category_name
    from jobs j
    left join industries i on j.industry_id = i.industry_id
    left join categories c on j.category_id = c.category_id
    
    WHERE employer_id = $1 `

        pool.query(query, [employerId], function (err: Error, result: QueryResult) {
            if (err) {
                return res.status(400).send({ error: err });
            }
            return res.status(200).send(result.rows);
        });

    }



