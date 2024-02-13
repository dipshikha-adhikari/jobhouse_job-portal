import { Response } from "express";
import { QueryResult } from "pg";
import { IUserRequest } from '../../types';
const pool = require('../../lib/db');

export const logoutUser = async (req:IUserRequest, res: Response) => {
    try {
    const {id} = req.user 
    const token = req.headers.token
     const blacklistedToken:QueryResult = await pool.query('select * from blacklists where user_id = $1', [id])
    
     if(blacklistedToken.rowCount > 0){
        await pool.query('update blacklists set token = $1 where user_id = $2', [token, id])
     return   res.status(201).send({message:'Success'})
     }else{
        await pool.query('insert into blacklists (user_id, token) values($1,$2)',[id,token])
     return   res.status(201).send({message:'Success'})

     }
    
    } catch (err) {
        console.log(err);
     return   res.status(400).send({ message: 'Logout failed' });
    }
};
