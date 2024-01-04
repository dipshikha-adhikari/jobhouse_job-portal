import { Request, Response } from "express"
import { QueryResult } from "pg"
const pool = require('../../lib/db')


export const getJobsCountByCategory = async(req:Request, res:Response) => {
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

export const getJobsCountByIndustry = async(req:Request, res:Response) => {
    try{
const query = `SELECT i.industry_name,
i.industry_id,
COALESCE(job_count, 0) AS job_count
FROM industries i
LEFT JOIN (
SELECT industry_id, COUNT(job_id) AS job_count
FROM jobs
WHERE deadline > NOW()
GROUP BY industry_id
) AS j ON i.industry_id = j.industry_id
ORDER BY job_count DESC;

`
const result:QueryResult = await pool.query(query)
return res.status(200).send(result.rows)

    }catch(err){
        console.log(err)
        return res.status(400).send({message:err})
    }
}



export const getJobsCountByLabel = async(req:Request, res:Response) => {
    try{
 const query = `SELECT jl.level_id, jl.level_name, COUNT(j.job_id) AS total_jobs
 FROM job_levels jl
 LEFT JOIN jobs j ON jl.level_id = j.level_id
 GROUP BY jl.level_id, jl.level_name
 ORDER BY jl.level_id;`
 const result:QueryResult = await pool.query(query)
 return res.status(200).send(result.rows)
 
    }catch(err){
       return res.status(404).send({message:err})
 
    }
 }
 
 export const getJobsCountByType = async(req:Request, res:Response) => {
    try{
 const query = `SELECT jt.type_id, jt.type_name, COUNT(j.job_id) AS total_jobs
 FROM job_types jt
 LEFT JOIN jobs j ON jt.type_id = j.type_id
 GROUP BY jt.type_id, jt.type_name
 ORDER BY jt.type_id;`
 const result:QueryResult = await pool.query(query)
 return res.status(200).send(result.rows)
 
    }catch(err){
       return res.status(404).send({message:err})
 
    }
 }