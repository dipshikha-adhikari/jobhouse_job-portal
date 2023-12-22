import { Response } from "express"
import { IUserRequest } from "../../../types"
import { QueryResult } from "pg"
const pool = require('../../../lib/db')


export const getCategoriesAndJobCount = async(req:IUserRequest, res:Response) => {
    try{
const query = `SELECT c.category_name, c.category_id,
coalesce(job_count,0) as job_count from categories c
left join (select category_id, count(job_id) as job_count  from jobs where deadline > now() group by category_id)
as j on c.category_id = j.category_id ORDER BY job_count DESC;
`
const result:QueryResult = await pool.query(query)
return res.status(200).send(result.rows)

    }catch(err){
        console.log(err)
        return res.status(400).send({message:err})
    }
}