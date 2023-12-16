import { Response } from "express"
import { IUserRequest } from "../../../types"
import { QueryResult } from "pg"
const pool = require('../../../lib/db')


export const getCategoriesAndJobCount = async(req:IUserRequest, res:Response) => {
    try{
const query = `SELECT c.category_name, c.category_id, COUNT(j.job_id) AS job_count
FROM categories c
LEFT JOIN jobs j ON c.category_id = j.category_id
GROUP BY c.category_name , c.category_id
ORDER BY job_count DESC;
`
const result:QueryResult = await pool.query(query)
return res.status(200).send(result.rows)

    }catch(err){
        console.log(err)
        return res.status(400).send({message:err})
    }
}