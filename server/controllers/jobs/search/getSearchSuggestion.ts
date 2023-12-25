import { Request, Response } from "express";
import { QueryResult } from "pg";
const pool = require('../../../lib/db')

export const getSearchSuggestion = async(req:Request, res:Response) => {
    const {query}= req.query
    const searchQuery = `select DISTINCT jobs.title from jobs where title ilike '%' || $1 || '%';`
try{
    const result:QueryResult = await pool.query(searchQuery,[query])
 return res.status(200).send(result.rows)

}catch(err){
   return res.status(400).send(err)
}
}