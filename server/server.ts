const express = require('express')
import {Response} from 'express'
const app = express()
const cors = require('cors')
const usersRoute = require('./routes/auth')
const employerRoute = require('./routes/employer')
const jobseekerRoute = require('./routes/jobseeker')
const jobsRoute = require('./routes/jobs')

const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config() 
const cloudinary = require('cloudinary')

cloudinary.config({
    secure:true
})



app.use(cors({origin:'http://localhost:5173'}))
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.get('/',(req:Request, res:Response) => {
    return res.status(200).send({msg:'hello from server'})
})
app.use('/api/v1/auth', usersRoute)
app.use('/api/v1/employer', employerRoute)
app.use('/api/v1/jobseeker', jobseekerRoute)
app.use('/api/v1/jobs', jobsRoute)

app.listen('3000',() => console.log('server running'))