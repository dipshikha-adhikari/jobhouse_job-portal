import { Response } from "express"
import { IUserRequest } from "../../../types"
import { QueryResult } from "pg"
const pool = require('../../../lib/db')


export const getIndustriesAndJobCount = async(req:IUserRequest, res:Response) => {
    try{
const query = `SELECT i.industry_name, i.industry_id, COUNT(j.job_id) AS job_count
FROM industries i
LEFT JOIN jobs j ON i.industry_id = j.industry_id
GROUP BY i.industry_name, i.industry_id
ORDER BY job_count DESC;
`
const result:QueryResult = await pool.query(query)
return res.status(200).send(result.rows)

    }catch(err){
        console.log(err)
        return res.status(400).send({message:err})
    }
}