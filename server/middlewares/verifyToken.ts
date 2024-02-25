import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
const jwt = require('jsonwebtoken')
const pool = require('../lib/db')

interface UserRequest extends Request {
  user: IUser;
}

export interface IUser {
  email: string
  name: string
}

const verifyToken = async (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.headers.token
  if (token !== undefined) {
    const blackListedToken: QueryResult = await pool.query('select * from blacklists where token = $1', [token])
    if (blackListedToken.rowCount > 0) {
      return res.status(401).send({ error: 'Your session is expired' })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err: Error, result: any) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = result
      next()
    })
  } else {
    return res.status(400).send({ error: 'Token is not available' })
  }
}
module.exports = verifyToken