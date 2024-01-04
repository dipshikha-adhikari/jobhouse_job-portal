import { Request, Response } from "express";
import { QueryResult } from "pg";
const pool = require('../../../lib/db')

export const getSearchResults = async (req: Request, res: Response) => {
    const { query } = req.query
    const { limit } = req.query
    const {offset} = req.query

    if (query === '') return res.status(400).send({ message: 'Query can not be empty' })
    const searchQuery = `select j.* ,
json_build_object(
    'image',img.url,
    'organization_name', e.organization_name
) as employer_details
    from jobs j
    left join images img on img.user_id = j.employer_id
    left join employers_basic_information e on e.user_id = j.employer_id
    where title ilike '%' || $1 || '%' AND deadline > NOW() limit $2 offset $3;`
    try {
        const result: QueryResult = await pool.query(searchQuery, [query, limit, offset])
        return res.status(200).send(result.rows)

    } catch (err) {
        return res.status(400).send(err)
    }
}