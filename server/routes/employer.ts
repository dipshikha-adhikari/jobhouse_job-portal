import { getTotalApplicantsCount } from "../controllers/jobs/getTotalApplicantsCount"
import { getTotalVacancies } from "../controllers/jobs/getTotalVacancies"
import { createBasicInformation, updateBasicInformation } from "../controllers/profiles/employer/basicInformation"
import { getEmployerProfile, getEmployerProfileById } from "../controllers/profiles/employer/getProfile"
import { createOtherInformation, updateOtherInformation } from "../controllers/profiles/employer/otherInformation"

const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

router.get('/profile',verifyToken, getEmployerProfile)
router.get('/profile/:employerId', getEmployerProfileById)
router.post('/profile/basicInformation',verifyToken, createBasicInformation)
router.put('/profile/basicInformation',verifyToken, updateBasicInformation)
router.post('/profile/otherInformation',verifyToken, createOtherInformation)
router.put('/profile/otherInformation',verifyToken, updateOtherInformation)
router.get('/applicants', verifyToken, getTotalApplicantsCount)
router.get('/vacancies', verifyToken, getTotalVacancies)
module.exports = router