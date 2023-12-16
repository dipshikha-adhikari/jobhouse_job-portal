import { loginUser } from "../controllers/auth/login"
import { createUser } from "../controllers/auth/register"
const express = require('express')
const router = express.Router()

router.post('/register',createUser)
router.post('/login',loginUser)


module.exports = router