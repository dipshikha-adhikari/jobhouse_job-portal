import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { IJobseekerJobPreference } from '../../../types'
import { isValidJobPreferences } from '../../../helpers/validateJobseekerProfileInsertion'
const pool = require('../../../lib/db')

interface IUserRequest extends Request {
  user: any
}

export const createJobPreference = (req: IUserRequest, res: Response) => {
  const { id } = req.user
  const {
    summary,
    job_level_id,
    job_categories,
    job_industries,
    job_title,
    job_type_id,
    skills,
    expected_salary,
    job_location
  }: IJobseekerJobPreference = req.body

  if (isValidJobPreferences(req.body)) {
    pool.query(
      'select * from users where user_id = $1',
      [id],
      function (err: Error, result: QueryResult) {
        if (err) return res.status(400).send({ message: err })

        if (result.rowCount > 0) {
          const role = result.rows[0].role
          if (role !== 'jobseeker') {
            return res
              .status(401)
              .send({ message: 'Only jobseeker is allowed' })
          }
          const existsQuery = `select * from jobseekers_job_preference where user_id = $1`
          pool.query(existsQuery, [id], (err: Error, result: QueryResult) => {
            if (err) return res.status(400).send({ message: err })
            if (result.rowCount > 0) {
              return res.status(400).send({
                message: 'Job preference already exists'
              })
            }
          })

          const query = `insert into jobseekers_job_preference (
                    user_id, 
                    summary,
                    job_level_id,
                    job_categories,
                    job_industries,
                    job_title,
                    job_type_id,
                    skills,
                    expected_salary,
                    job_location)
                     values ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10)`
          pool.query(
            query,
            [
              id,
              summary,
              job_level_id,
              job_categories,
              job_industries,
              job_title,
              job_type_id,
              skills,
              expected_salary,
              job_location
            ],
            function (err: Error) {
              if (err) return res.status(400).send({ message: err })
              return res.status(200).send({ message: 'Success' })
            }
          )
        } else {
          return res.status(400).send({ message: 'User not found' })
        }
      }
    )
  } else {
    return res.status(400).send({
      message: 'Invalid preference',
      format: `summary
            job_level_id,
            job_categories,
            job_industries,
            job_title,
            job_type_id,
            skills,
            expected_salary,
            job_location`
    })
  }
}

export const updateJobPreference = (req: IUserRequest, res: Response) => {
  const { id } = req.user
  const {
    summary,
    job_level_id,
    job_categories,
    job_industries,
    job_title,
    job_type_id,
    skills,
    expected_salary,
    job_location
  }: IJobseekerJobPreference = req.body

  if (isValidJobPreferences(req.body)) {
    pool.query(
      'select * from jobseekers_job_preference where user_id = $1',
      [id],
      function (err: Error, result: QueryResult) {
        if (err) return res.status(400).send({ message: err })
        if (result.rowCount > 0) {
          const query = `UPDATE jobseekers_job_preference
                    SET   
                    summary = $2 ,
                    job_level_id = $3,
                    job_categories = $4,
                    job_industries = $5,
                    job_title = $6,
                    job_type_id = $7,
                    skills = $8,
                    expected_salary = $9,
                    job_location = $10
                     where user_id = $1`

          pool.query(
            query,
            [
              id,
              summary,
              job_level_id,
              job_categories,
              job_industries,
              job_title,
              job_type_id,
              skills,
              expected_salary,
              job_location
            ],
            function (err: Error) {
              if (err) return res.status(400).send({ message: err.message })
              return res.status(200).send({ message: 'Success' })
            }
          )
        } else {
          return res.status(400).send({
            message: 'Job preference not found, make a post request'
          })
        }
      }
    )
  } else {
    return res.status(400).send({
      message: 'Invalid preference',
      format: `summary
            job_level_id,
            job_categories,
            job_industries,
            job_title,
            job_type_id,
            skills,
            expected_salary,
            job_location`
    })
  }
}
