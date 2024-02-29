import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { IJobseekerEducation } from '../../../types'
import { isValidEducation } from '../../../helpers/validateJobseekerProfileInsertion'
const pool = require('../../../lib/db')

interface IUserRequest extends Request {
  user: any
}

export const createEducation = (req: IUserRequest, res: Response) => {
  const { id } = req.user
  const {
    course,
    institute_name,
    degree,
    graduation_year,
    marks,
    location
  }: IJobseekerEducation = req.body

  if (marks !== undefined && marks !== null) {
    if (
      (marks.value !== undefined && marks.type === undefined) ||
      (marks.value === undefined && marks.type !== undefined)
    ) {
      return res.status(400).send({
        message: 'either remove or fill all the fields of marks object'
      })
    }

    if (Object.keys(marks).length > 0) {
      const invalidKeys = Object.keys(marks).filter(
        key => key !== 'value' && key !== 'type'
      )
      if (invalidKeys.length > 0) {
        return res.status(400).send({ message: 'wrong key provided' })
      }
    }
  }

  if (isValidEducation(req.body)) {
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
          const query = `insert into jobseekers_education (user_id,course,degree, institute_name, graduation_year, marks,location   ) values($1, $2, $3,$4,$5,$6, $7)`
          pool.query(
            query,
            [
              id,
              course,
              degree,
              institute_name,
              graduation_year,
              marks,
              location
            ],
            function (err: Error) {
              if (err) return res.status(400).send({ message: err })
              return res.status(201).send({ message: 'Success' })
            }
          )
        } else {
          return res.status(400).send({ message: 'User not found' })
        }
      }
    )
  } else {
    return res.status(400).send({
      message: 'Invalid education format',
      format: `course,institute_name, graduation_year,degree, marks,location `
    })
  }
}

export const updateEducation = (req: IUserRequest, res: Response) => {
  const { id } = req.user
  const { educationId } = req.params
  const {
    course,
    institute_name,
    degree,
    graduation_year,
    marks,
    location
  }: IJobseekerEducation = req.body

  if (marks !== undefined && marks !== null) {
    if (
      (marks.value !== undefined && marks.type === undefined) ||
      (marks.value === undefined && marks.type !== undefined)
    ) {
      return res.status(400).send({
        message: 'either remove or fill all the fields of marks object'
      })
    }

    if (Object.keys(marks).length > 0) {
      const invalidKeys = Object.keys(marks).filter(
        key => key !== 'value' && key !== 'type'
      )
      if (invalidKeys.length > 0) {
        return res.status(400).send({ message: 'wrong key provided' })
      }
    }
  }

  if (isValidEducation(req.body)) {
    pool.query(
      'select * from jobseekers_education where user_id = $1 and id = $2',
      [id, educationId],
      function (err: Error, result: QueryResult) {
        if (err) return res.status(400).send({ message: err })
        if (result.rowCount > 0) {
          const query = `UPDATE jobseekers_education
                                SET course = $2,degree = $3, institute_name = $4, graduation_year = $5, marks = $6,location = $7
                                WHERE  id = $1 and user_id = $8`
          pool.query(
            query,
            [
              educationId,
              course,
              degree,
              institute_name,
              graduation_year,
              marks,
              location,
              id
            ],
            function (err: Error) {
              if (err) return res.status(400).send({ message: err })
              return res.status(201).send({ message: 'Success' })
            }
          )
        } else {
          return res.status(400).send({
            message:
              'Education not found, make a post request for creating education'
          })
        }
      }
    )
  } else {
    return res.status(400).send({
      message: 'Invalid education format',
      format: `course,institute_name, graduation_year,degree, marks,location `
    })
  }
}

export const deleteEducation = (req: IUserRequest, res: Response) => {
  const { id } = req.user
  const { educationId } = req.params

  pool.query(
    'delete from jobseekers_education where id = $1 and user_id = $2',
    [educationId, id],
    (err: Error) => {
      if (err) return res.status(401).send('Failed to delete')
      return res.status(200).send({ message: 'Successfully deleted' })
    }
  )
}
