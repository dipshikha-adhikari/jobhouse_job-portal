import { getTotalApplicantsCount, getTotalVacancies } from '../controllers/jobs/public'
import { createBasicInformation, createOtherInformation, getEmployerProfile, getEmployerProfileById, updateBasicInformation, updateOtherInformation } from '../controllers/profiles/employer'

const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

router.get('/profile/:employerId', getEmployerProfileById)
router.use(verifyToken)
router.get('/profile', getEmployerProfile)
router.post('/profile/basicInformation', createBasicInformation)
router.put('/profile/basicInformation', updateBasicInformation)
router.post('/profile/otherInformation', createOtherInformation)
router.put('/profile/otherInformation', updateOtherInformation)
router.get('/applicants', getTotalApplicantsCount)
router.get('/vacancies', getTotalVacancies)

module.exports = router
