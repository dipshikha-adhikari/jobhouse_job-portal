import {
  applyForJob,
  createJob,
  getJobApplications,
  updateJob
} from '../../../controllers/jobs/private'
const express = require('express')
const router = express.Router()
const verifyToken = require('../../../middlewares/verifyToken')

router.use(verifyToken)
router.get('/applications/:jobId', getJobApplications)
router.put('/update/:jobId', updateJob)
router.post('/create', createJob)
router.post('/apply', applyForJob)

module.exports = router
