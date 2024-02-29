import { getAppliedJobs, getMatchingJobs } from '../controllers/jobs/private'
import { createBasicInfo, createEducation, createExperience, createJobPreference, deleteEducation, deleteExperience, getJobseekerProfile, updateBasicInfo, updateEducation, updateExperience, updateJobPreference } from '../controllers/profiles/jobseeker'
import { getJobseekerProfileById } from '../controllers/profiles/jobseeker/getJobseekerProfileById'
import { uploadImage } from '../helpers/uploadImage'

const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken)
router.get('/profile', getJobseekerProfile)
router.get('/profile/:jobseekerId', getJobseekerProfileById)
router.post('/profile/basicInformation', createBasicInfo)
router.post('/cloudinary/upload', uploadImage)
router.put('/profile/basicInformation', updateBasicInfo)
router.post('/profile/education', createEducation)
router.put('/profile/education/:educationId', updateEducation)
router.delete('/profile/education/:educationId', deleteEducation)
router.post('/profile/experience', createExperience)
router.put('/profile/experience/:experienceId', updateExperience)
router.delete(
  '/profile/experience/:experienceId',
  deleteExperience
)
router.post('/profile/jobPreference', createJobPreference)
router.put('/profile/jobPreference', updateJobPreference)
router.get('/jobs/matching', getMatchingJobs)
router.get('/jobs/applied', getAppliedJobs)

module.exports = router
