import { createBasicInfo, updateBasicInfo } from "../controllers/profiles/jobseeker/basicInformation"
import { createEducation, updateEducation } from "../controllers/profiles/jobseeker/education"
import { createExperience, updateExperience } from "../controllers/profiles/jobseeker/experience"
import { getJobseekerProfile } from "../controllers/profiles/jobseeker/getProfile"
import { createJobPreference, updateJobPreference } from "../controllers/profiles/jobseeker/jobPreference"

const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

router.get('/profile',verifyToken, getJobseekerProfile)
router.post('/profile/basicInformation', verifyToken, createBasicInfo)
router.put('/profile/basicInformation', verifyToken, updateBasicInfo)
router.post('/profile/education', verifyToken, createEducation)
router.put('/profile/education/:educationId', verifyToken, updateEducation)
router.post('/profile/experience', verifyToken, createExperience)
router.put('/profile/experience/:experienceId', verifyToken, updateExperience)
router.post('/profile/jobPreference', verifyToken, createJobPreference)
router.put('/profile/jobPreference', verifyToken, updateJobPreference)


module.exports = router