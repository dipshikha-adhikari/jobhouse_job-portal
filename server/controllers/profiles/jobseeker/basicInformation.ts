import { Request, Response } from "express";
import { QueryResult } from "pg";
import { isValidBasicInformation, isValidEducation } from "../../../helpers/validateJobseekerProfileInsertion";
import { IJobseekerBasicInformation } from "../../../types";
import { uploadImage } from "../../../helpers/uploadImage";
const pool = require('../../../lib/db')

interface IUserRequest extends Request {
    user: any
}


export const createBasicInfo = (req: IUserRequest, res: Response) => {
    const { id } = req.user
    const { fullname, date_of_birth, phone_number, permanent_address, current_address, gender, image }: IJobseekerBasicInformation = req.body

 
    if (isValidBasicInformation(req.body)) {
        pool.query('select * from users where user_id = $1', [id], function (err: Error, result: QueryResult) {
            if (err) return res.status(400).send({ message: err })
            if (result.rowCount > 0) {
                const role = result.rows[0].role
                const email = result.rows[0].email
                if (role !== 'jobseeker') {
                    return res.status(401).send({ message: 'Only jobseeker is allowed' })
                }

                const existsQuery = `select * from jobseekers_basic_information where user_id = $1`
                pool.query(existsQuery, [id], (err: Error, result: QueryResult) => {
                    if (err) return res.status(400).send({ message: err })
                    if (result.rowCount > 0) {
                        return res.status(400).send({ message: 'Basic information already exists' })
                    }
                })

                const userQuery = `update users set fullname = $2 , phone_number = $3 where user_id = $1`
                pool.query(userQuery, [id, fullname, phone_number], (err: Error, result: QueryResult) => {
                    if (err) return res.status(400).send({ message: 'Failed to update users table' })

                    const query = `insert into jobseekers_basic_information (user_id,fullname, date_of_birth, phone_number, permanent_address,current_address, gender , email ) values($1, $2, $3,$4,$5,$6,$7, $8)`
                    pool.query(query, [id, fullname, date_of_birth, phone_number, permanent_address, current_address, gender, email], async function (err: Error, result: QueryResult) {
                        if (err) return res.status(400).send({ message: 'Error on inserting jobseekers_basic_information' })

                        let public_id = image?.public_id 
                        let url = image?.url
                      
                        if (image !== null && image.url === undefined && typeof image === 'string') {
                            const imageData = await uploadImage(image, id)
                            if (!imageData) {
                                res.status(400).send({ message: 'Error on upload image, image must be string' })
                            }
                             public_id = imageData.public_id
                             url = imageData.secure_url
      
                        }
                       
                            const imageQuery = 'insert into images (user_id, url, public_id) values ($1, $2, $3)'
                            pool.query(imageQuery, [id, url, public_id], (err: Error, result: QueryResult) => {
                                if (err) return res.status(400).send({ message: err })
                                return res.status(201).send({ message: 'Successfully created basic_information, images and updated users ' })
                             } )
                            
                        }
                    
                    )
                })
            } else {
                return res.status(400).send({ message: 'User not found' })
            }
        })
    }
    else {
        return res.status(400).send({
            message: 'Invalid basic_information format', format: `fullname, date_of_birth, phone_number, permanent_address,current_address, gender `
        });
    }
}




export const updateBasicInfo = (req: IUserRequest, res: Response) => {
    const { id } = req.user
    const { fullname, date_of_birth, phone_number, permanent_address, current_address, gender, image }: IJobseekerBasicInformation = req.body


    if (isValidBasicInformation(req.body)) {
        pool.query('select * from jobseekers_basic_information where user_id = $1', [id], function (err: Error, result: QueryResult) {
            if (err) return res.status(400).send({ message: err })
            if (result.rowCount > 0) {
                const query = `UPDATE jobseekers_basic_information
                SET fullname = $2 , date_of_birth = $3, phone_number = $4, permanent_address = $5,current_address = $6, gender = $7
                WHERE  user_id = $1`

                pool.query(query, [id, fullname, date_of_birth, phone_number, permanent_address, current_address, gender], function (err: Error, result: QueryResult) {
                    if (err) return res.status(400).send({ message: err })
                    const userQuery = `update users set fullname = $2 , phone_number = $3 where user_id = $1`
                    pool.query(userQuery, [id, fullname, phone_number], async (err: Error, result: QueryResult) => {
                        if (err) return res.status(400).send({ message: 'Failed to update users table' })

                        // if public_id and url is available , update image with the same data
                        let public_id = image?.public_id
                        let url = image?.url
                        // if url is anavailable , upload to the cloudinary and get url
                        if (image.url === undefined && image !== null && typeof image === 'string') {
                            const imageData = await uploadImage(image, id)
                            if (!imageData) {
                             return   res.status(400).send({ message: 'Error on upload image, image must be string' })
                            }
                            public_id = imageData.public_id
                            url = imageData.secure_url

                        }
                        pool.query('update images set url = $2 , public_id = $3 where user_id = $1', [id, url, public_id], (err: Error, result: QueryResult) => {
                            return res.status(201).send({ message: 'Successfully updated users_basic_information, users and images' })
                        })

                    })
                })
            }

            else {
                return res.status(400).send({ message: 'Basic information not found, make a post request' })
            }
        })
    }
    else {
        return res.status(400).send({
            message: 'Invalid basic_information format', format: `fullname, date_of_birth, phone_number, permanent_address,current_address, gender `
        });
    }




}






