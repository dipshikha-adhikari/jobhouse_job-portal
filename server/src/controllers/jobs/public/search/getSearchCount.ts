import { Request, Response } from 'express'
import { QueryResult } from 'pg';
const pool = require('../../../../lib/db')

export const getSearchCounts = (req: Request, res: Response) => {
    const { query } = req.query;


    const countQuery = `
    SELECT COUNT(*) AS total_count
    FROM jobs
    WHERE title ILIKE '%' || $1 || '%' AND deadline > NOW();
`;

    // Execute the count query
    pool.query(countQuery, [query], (countErr: Error, countResult: QueryResult) => {
        if (countErr) {
            return res.status(500).send({ message: 'Error retrieving count' });
        }

        const totalCount = countResult.rows[0].total_count;

        // Send the total count back as response
        res.status(200).send({ total_count: totalCount });
    });
}



