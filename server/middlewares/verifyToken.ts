import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken')

interface UserRequest extends Request {
    user: IUser;
  }
  export interface IUser {
    email: string
    name: string
   
  }

const verifyToken = async(req:UserRequest,res:Response,next:NextFunction) => {
    const token = req.headers.token 
    if(token !== undefined){
        jwt.verify(token,process.env.JWT_SECRET,(err:Error,result:any) => {
            if(err) return res.status(403).json("Token is not valid!");
           req.user = result
           next()
        })
    }else{
        return res.status(400).send({error:'Token is not available'})
    }
}
module.exports = verifyToken