import { Request, Response } from "express";
import { QueryResult } from "pg";
const pool = require('../../lib/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const loginUser = async (req: Request, res: Response) => {
    try {
        const email = req.body.email
        const password = req.body.password

        let users: QueryResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (users.rows.length > 0) {
            const user = users.rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {

                const token = jwt.sign({
                    id: user.user_id
                }, process.env.JWT_SECRET, { expiresIn: '1d' });

                return res.status(200).send({ message: "Login success", user, token });
            } else {
                return res.status(401).send({ message: "Incorrect password" });
            }
        } else {
            return res.status(400).send({ message: 'User not found' });
        }
    } catch (err) {
        console.log(err);
      return  res.status(400).send({ message: err });
    }
};
