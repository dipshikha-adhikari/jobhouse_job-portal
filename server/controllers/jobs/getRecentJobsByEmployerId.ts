import { Response } from "express";
import { QueryResult } from "pg";
import { IUserRequest } from "../../types";
const pool = require('../../lib/db')

export const getRecentJobsByEmployerId = async (req: IUserRequest, res: Response) => {
    const { employerId } = req.params;

    if (employerId === undefined) {
        return res.status(400).send({ message: 'Please provide a valid employerId' });
    }
    
    const query = `SELECT j.*,
    i.industry_name, c.category_name, json_build_object(
'image', img.url
    ) as employer_details
    from jobs j
    left join industries i on j.industry_id = i.industry_id
    left join categories c on j.category_id = c.category_id
    left join images img on img.user_id = j.employer_id
    WHERE employer_id = $1 AND deadline > NOW() 
    `;

    pool.query(query, [employerId], function (err: Error, result: QueryResult) {
        if (err) {
            return res.status(400).send({ error: err });
        }
        return res.status(200).send(result.rows);
    });
};
