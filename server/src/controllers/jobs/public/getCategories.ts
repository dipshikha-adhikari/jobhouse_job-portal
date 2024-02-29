import { Request, Response } from 'express'
import { QueryResult } from 'pg'
const pool = require('../../../lib/db')

export const getCategories = async (req: Request, res: Response) => {
  try {
    const query = `select * from categories`
    const result: QueryResult = await pool.query(query)
    return res.status(200).send(result.rows)
  } catch (err) {
    return res.status(404).send({ message: err })
  }
}
