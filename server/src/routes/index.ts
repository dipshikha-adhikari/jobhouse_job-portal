import { Request, Response } from "express"
import { getTopEmployers } from "../controllers/getTopEmployers"

const express = require('express')
const router = express.Router()
const publicJobRoutes = require('../routes/jobs/public')
const privateJobRoutes = require('../routes/jobs/private')
const userRoutes = require('../routes/auth')
const employerRoute = require('../routes/employer')
const jobseekerRoute = require('../routes/jobseeker')

router.use('/api/v1/jobs', publicJobRoutes)
router.use('/api/v1/jobs', privateJobRoutes)
router.use('/api/v1/auth', userRoutes);
router.use('/api/v1/employer', employerRoute);
router.use('/api/v1/jobseeker', jobseekerRoute);
router.get('/api/v1/topEmployers', getTopEmployers);
router.get('*', (req: Request, res: Response) => {
    res.status(400).send({ message: "Wrong route" })
});

module.exports = router
