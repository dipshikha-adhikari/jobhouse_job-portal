import { Request, Response } from "express";
import { QueryResult } from "pg";
import { IUserRequest } from "../../types";
const pool = require('../../lib/db')

export const getAllJobsByEmployerId = async (req: IUserRequest, res: Response) => {
    const {employerId } = req.params
 
    if(employerId === undefined) return res.status(400).send({message:'Please provide a valid employerId'})
        const query = `
        SELECT j.*,
    i.industry_name, c.category_name,  l.level_name,
    t.type_name, json_build_object(
'image', img.url
    ) as employer_details,
    COALESCE(COUNT(ja.job_id), 0) AS job_application_count
    from jobs j
    LEFT JOIN job_applications ja ON j.job_id = ja.job_id
    left join industries i on j.industry_id = i.industry_id
    left join categories c on j.category_id = c.category_id
    left join job_levels l on j.level_id = l.level_id
left join job_types t on j.type_id = t.type_id
    left join images img on img.user_id = j.employer_id
    WHERE j.employer_id = $1
    GROUP BY j.job_id, i.industry_name, c.category_name, img.url,l.level_name, t.type_name `

        pool.query(query, [employerId], function (err: Error, result: QueryResult) {
            if (err) {
                return res.status(400).send({ error: err });
            }
            return res.status(200).send(result.rows);
        });

    }



