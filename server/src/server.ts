import { Response } from 'express'
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('../src/routes')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary')

dotenv.config()

cloudinary.config({
  secure: true
})

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.get('/', (req: Request, res: Response) => {
  return res.status(200).send({ msg: 'hello from server' })
})

app.listen('5000', () => console.log('server running'))
