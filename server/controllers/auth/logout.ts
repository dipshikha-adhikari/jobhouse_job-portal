import { Response } from "express";
import { QueryResult } from "pg";
import { IUserRequest } from '../../types';
const pool = require('../../lib/db');
const jwt = require('jsonwebtoken');

export const logoutUser = async (req:IUserRequest, res: Response) => {
    try {
    const {id} = req.user 
        let users:QueryResult= await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);

        if (users.rows.length > 0) {
         
res.clearCookie('jwt')
                return res.status(200).send({ message: "Logout success"});
            } else {
                return res.status(401).send({ message: "User not found" });
            }
        
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: 'Logout failed' });
    }
};
