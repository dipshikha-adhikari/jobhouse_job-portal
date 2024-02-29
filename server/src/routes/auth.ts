import { createUser, loginUser, logoutUser } from '../controllers/auth'

const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/logout', verifyToken, logoutUser)

module.exports = router
