import {
  getAllJobs,
  getAllJobsByEmployerId,
  getCategories,
  getFilteredJobs,
  getIndustries,
  getJobById,
  getJobLevels,
  getJobTypes,
  getRecentJobsByEmployerId,
  getSearchResults,
  getSearchSuggestion,
  getTotalJobsCount
} from '../../../controllers/jobs/public'
import { getJobsCategoryWithCount, getJobsIndustryWithCount, getJobsLevelWithCount, getJobsTypeWithCount } from '../../../controllers/jobs/public/count'
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
router.get('/levels-with-count', getJobsLevelWithCount)
router.get('/types-with-count', getJobsTypeWithCount)
router.get('/types', getJobTypes)
router.get('/categories', getCategories)
router.get('/industries', getIndustries)
router.get('/categories-with-count', getJobsCategoryWithCount)
router.get('/industries-with-count', getJobsIndustryWithCount)
router.get('/:jobId', getJobById)

module.exports = router
