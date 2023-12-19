import { applyForJob } from "../controllers/jobs/applyForJob"
import { getCategories } from "../controllers/jobs/category/getCategories"
import { getCategoriesAndJobCount } from "../controllers/jobs/category/getCategoriesAndJobCount"
import { getIndustriesAndJobCount } from "../controllers/jobs/category/getIndustriesAndJobCount"
import { createJob } from "../controllers/jobs/createJob"
import { getAllJobs } from "../controllers/jobs/getAllJobs"
import { getAllJobsByEmployerId } from "../controllers/jobs/getAllJobsByEmployerId"
import { getAppliedJobs } from "../controllers/jobs/getAppliedJobs"
import { getIndustries } from "../controllers/jobs/category/getIndustries"
import { getJobApplications } from "../controllers/jobs/getJobApplications"
import { getJobsByIndustries } from "../controllers/jobs/category/getJobsByIndustries"
import { getRecentJobsByEmployerId } from "../controllers/jobs/getRecentJobsByEmployerId"
import { getSingleJob } from "../controllers/jobs/getSingleJob"
import { updateJob } from "../controllers/jobs/updateJob"
import { getJobsByCategories } from "../controllers/jobs/category/getJobsByCategories"
import { getMatchingJobs } from "../controllers/jobs/category/getMatchingJobs"

const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')


router.get('/', getAllJobs)
router.get('/categories', getCategories)
router.get('/industries', getIndustries)
router.get('/matching',verifyToken, getMatchingJobs)
router.get('/categories/jobscount', getCategoriesAndJobCount)
router.get('/categories/:categoryId', getJobsByCategories)
router.get('/industries/jobscount', getIndustriesAndJobCount)
router.get('/industries/:industryId', getJobsByIndustries)
router.get('/applied',verifyToken, getAppliedJobs)
router.get('/employer/all/:employerId', getAllJobsByEmployerId)
router.get('/employer/recent/:employerId', getRecentJobsByEmployerId)
router.get('/applications/:jobId', verifyToken, getJobApplications)
router.get('/:jobId', getSingleJob)
router.put('/update/:jobId',verifyToken, updateJob)
router.post('/create',verifyToken, createJob)
router.post('/apply/:jobId',verifyToken, applyForJob)

module.exports = router