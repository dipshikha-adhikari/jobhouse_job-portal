import { loginUser } from "../controllers/auth/login"
import { logoutUser } from "../controllers/auth/logout"
import { createUser } from "../controllers/auth/register"
const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

router.post('/register',createUser)
router.post('/login',loginUser)
router.post('/logout',verifyToken,logoutUser)


module.exports = router