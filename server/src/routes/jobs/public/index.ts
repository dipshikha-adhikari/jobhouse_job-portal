import {
  getAllJobs,
  getAllJobsByEmployerId,
  getCategories,
  getFilteredJobs,
  getIndustries,
  getJobById,
  getJobLevels,
  getJobTypes,
  getJobsCountByLevel,
  getRecentJobsByEmployerId,
  getSearchResults,
  getSearchSuggestion,
  getTotalJobsCount
} from '../../../controllers/jobs/public'
import { getJobsCountByCategory, getJobsCountByIndustry, getJobsCountByType } from '../../../controllers/jobs/public/count'
import { getSearchCounts } from '../../../controllers/jobs/public/search/getSearchCount'

const express = require('express')
const router = express.Router()

router.get('/', getAllJobs)
router.get('/search/suggestions', getSearchSuggestion)
router.get('/search/counts', getSearchCounts)
router.get('/search/results', getSearchResults)
router.get('/employer/all/:employerId', getAllJobsByEmployerId)
router.get('/employer/recent/:employerId', getRecentJobsByEmployerId)
router.get('/count', getTotalJobsCount)
router.get('/filters', getFilteredJobs)
router.get('/levels', getJobLevels)
router.get('/levels/jobscount', getJobsCountByLevel)
router.get('/types/jobscount', getJobsCountByType)
router.get('/types', getJobTypes)
router.get('/categories', getCategories)
router.get('/industries', getIndustries)
router.get('/categories/jobscount', getJobsCountByCategory)
router.get('/industries/jobscount', getJobsCountByIndustry)
router.get('/:jobId', getJobById)

module.exports = router
