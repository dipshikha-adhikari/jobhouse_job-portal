const express = require('express')
import { Response } from 'express'
import { getTopEmployers } from './controllers/getTopEmployers'
const app = express()
const cors = require('cors')
const usersRoute = require('./routes/auth')
const employerRoute = require('./routes/employer')
const jobseekerRoute = require('./routes/jobseeker')
const jobsRoute = require('./routes/jobs')
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser');
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const cloudinary = require('cloudinary')

cloudinary.config({
    secure: true
})

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    return res.status(200).send({ msg: 'hello from server' })
})

app.use('/api/v1/auth', usersRoute)
app.use('/api/v1/employer', employerRoute)
app.use('/api/v1/jobseeker', jobseekerRoute)
app.use('/api/v1/jobs', jobsRoute)
app.get('/api/v1/topEmployers', getTopEmployers)

app.listen('5000', () => console.log('server running', this))