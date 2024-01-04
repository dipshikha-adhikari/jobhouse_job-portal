import { applyForJob } from "../controllers/jobs/applyForJob"
import { getCategories } from "../controllers/jobs/category/getCategories"
import { createJob } from "../controllers/jobs/createJob"
import { getAllJobs } from "../controllers/jobs/getAllJobs"
import { getAllJobsByEmployerId } from "../controllers/jobs/getAllJobsByEmployerId"
import { getAppliedJobs } from "../controllers/jobs/getAppliedJobs"
import { getIndustries } from "../controllers/jobs/category/getIndustries"
import { getJobApplications } from "../controllers/jobs/getJobApplications"
import { getRecentJobsByEmployerId } from "../controllers/jobs/getRecentJobsByEmployerId"
import { getMatchingJobs } from "../controllers/jobs/category/getMatchingJobs"
import { getJobById } from "../controllers/jobs/getJobById"
import { updateJob } from "../controllers/jobs/updateJob"
import { getSearchSuggestion } from "../controllers/jobs/search/getSearchSuggestion"
import { getSearchResults } from "../controllers/jobs/search/getSearchResults"
import { getFilteredJobs } from "../controllers/jobs/category/getFilteredJobs"
import { getJobLevels } from "../controllers/jobs/getJobLevels"
import { getJobTypes } from "../controllers/jobs/getJobTypes"
import { getJobsCountByCategory, getJobsCountByIndustry, getJobsCountByLevel, getJobsCountByType } from "../controllers/jobs/count"

const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')


router.get('/', getAllJobs)
router.get('/filters', getFilteredJobs)
router.get('/levels', getJobLevels)
router.get('/levels/jobscount', getJobsCountByLevel)
router.get('/types/jobscount', getJobsCountByType)
router.get('/types', getJobTypes)
router.get('/categories', getCategories)
router.get('/industries', getIndustries)
router.get('/matching',verifyToken, getMatchingJobs)
router.get('/categories/jobscount', getJobsCountByCategory)
router.get('/industries/jobscount', getJobsCountByIndustry)
router.get('/applied',verifyToken, getAppliedJobs)
router.get('/employer/all/:employerId', getAllJobsByEmployerId)
router.get('/employer/recent/:employerId', getRecentJobsByEmployerId)
router.get('/applications', verifyToken, getJobApplications)
router.get('/:jobId', getJobById)
router.put('/update/:jobId',verifyToken, updateJob)
router.post('/create',verifyToken, createJob)
router.post('/apply',verifyToken, applyForJob)
router.get('/search/suggestions', getSearchSuggestion)
router.get('/search/results', getSearchResults)


module.exports = router