import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { IEmployerBasicInformation } from '../../../types'
import { isValidBasicInformation } from '../../../helpers/validateEmployerProfileInsertion'
import { uploadImage } from '../../../helpers/uploadImage'
import { uploadCoverImage } from '../../../helpers/uploadCoverImage'
const pool = require('../../../lib/db')

interface IUserRequest extends Request {
  user: any
}

export const createBasicInformation = (req: IUserRequest, res: Response) => {
  const { id } = req.user
  const {
    organization_name,
    address,
    image,
    industry_type,
    summary,
    phone_number,
    email,
    cover_image
  }: IEmployerBasicInformation = req.body

  if (isValidBasicInformation(req.body)) {
    pool.query(
      'select * from users where user_id = $1',
      [id],
      function (err: Error, result: QueryResult) {
        if (err) return res.status(400).send({ message: err })
        if (result.rowCount > 0) {
          const role = result.rows[0].role

          if (role !== 'employer' || role === undefined) {
            return res.status(401).send({ message: 'Only employer is allowed' })
          }

          const userQuery = `update users set fullname = $2 , phone_number = $3 where user_id = $1`
          pool.query(
            userQuery,
            [id, organization_name, phone_number],
            (err: Error) => {
              if (err)
                return res.status(400).send({
                  message: 'Failed to update users table'
                })

              const query = `insert into employers_basic_information (user_id,organization_name,industry_id, address, summary, phone_number, email ) values($1, $2, $3,$4,$5,$6,$7)`
              pool.query(
                query,
                [
                  id,
                  organization_name,
                  industry_type,
                  address,
                  summary,
                  phone_number,
                  email
                ],
                async function (err: Error) {
                  if (err)
                    return res.status(400).send({
                      message: 'Failed to create basic_information'
                    })

                  // images
                  let image_public_id = image?.public_id
                  let image_url = image?.url

                  if (
                    image !== null &&
                    image?.url === undefined &&
                    typeof image === 'string'
                  ) {
                    const imageData = await uploadImage(image, id)
                    if (!imageData) {
                      res.status(400).send({
                        message: 'Error on upload image'
                      })
                    }
                    image_public_id = imageData.public_id
                    image_url = imageData.secure_url
                  }
                  const imageQuery =
                    'insert into images (user_id, url, public_id) values ($1, $2, $3)'
                  pool.query(
                    imageQuery,
                    [id, image_url, image_public_id],
                    async (err: Error) => {
                      if (err)
                        return res.status(400).send({
                          message:
                            'Error on uploading image, image must be string'
                        })
                      // cover images
                      let coverImageUrl = cover_image?.url
                      let coverImagePublicId = cover_image?.public_id
                      if (
                        cover_image !== null &&
                        coverImageUrl === undefined &&
                        typeof cover_image === 'string'
                      ) {
                        const imageData = await uploadCoverImage(
                          cover_image,
                          id
                        )
                        if (!imageData) {
                          res.status(400).send({
                            message:
                              'Error on upload cover_image , cover_image must be string'
                          })
                        }
                        coverImagePublicId = imageData.public_id
                        coverImageUrl = imageData.secure_url
                      }
                      const coverImageQuery =
                        'insert into cover_images (user_id, url, public_id) values ($1, $2, $3)'
                      pool.query(
                        coverImageQuery,
                        [id, coverImageUrl, coverImagePublicId],
                        (err: Error) => {
                          if (err)
                            return res.status(400).send({
                              message: err
                            })
                          return res.status(201).send({
                            message:
                              'Successfully created basic_information, images, cover_images, and updated users '
                          })
                        }
                      )
                    }
                  )
                }
              )
            }
          )
        } else {
          return res.status(400).send({ message: 'User not found' })
        }
      }
    )
  } else {
    return res.status(400).send({
      message: 'Invalid basic_information format',
      format: `organization_name,industry_type,address,image, cover_image, summary, phone_number, email `
    })
  }
}

export const updateBasicInformation = (req: IUserRequest, res: Response) => {
  const { id } = req.user
  const {
    organization_name,
    industry_type,
    address,
    image,
    cover_image,
    summary,
    phone_number
  }: IEmployerBasicInformation = req.body

  if (isValidBasicInformation(req.body)) {
    pool.query(
      'select * from employers_basic_information where user_id = $1',
      [id],
      function (err: Error, result: QueryResult) {
        if (err) return res.status(400).send({ message: err })
        if (result.rowCount > 0) {
          const userQuery = `update users set fullname = $2 , phone_number = $3 where user_id = $1`
          pool.query(
            userQuery,
            [id, organization_name, phone_number],
            (err: Error) => {
              if (err)
                return res.status(400).send({
                  message: 'Failed to update users table'
                })
              const query = `UPDATE employers_basic_information
                    set   organization_name = $2, industry_id = $3,address = $4, summary = $5, phone_number = $6
                       WHERE  user_id = $1`

              pool.query(
                query,
                [
                  id,
                  organization_name,
                  industry_type,
                  address,
                  summary,
                  phone_number
                ],
                async function (err: Error) {
                  if (err)
                    return res.status(400).send({
                      message: 'Failed to update basic_information'
                    })
                  //    update image
                  let public_id = image?.public_id
                  let url = image?.url
                  // if url is anavailable , upload to the cloudinary and get url
                  if (
                    url === undefined &&
                    image !== null &&
                    typeof image === 'string'
                  ) {
                    const imageData = await uploadImage(image, id)
                    if (!imageData) {
                      res.status(400).send({
                        message: 'Error on upload image, image must be string'
                      })
                    }
                    public_id = imageData.public_id
                    url = imageData.secure_url
                  }
                  pool.query(
                    'update images set url = $2 , public_id = $3 where user_id = $1',
                    [id, url, public_id],
                    async (err: Error) => {
                      if (err)
                        return res.status(400).send({
                          message: 'Failed to update image'
                        })

                      let coverImageUrl = cover_image?.url
                      let coverImagePublicId = cover_image?.public_id
                      if (
                        cover_image !== null &&
                        coverImageUrl === undefined &&
                        typeof cover_image === 'string'
                      ) {
                        const imageData = await uploadImage(cover_image, id)
                        if (!imageData) {
                          res.status(400).send({
                            message:
                              'Error on upload cover_image, cover_image must be string'
                          })
                        }
                        coverImagePublicId = imageData.public_id
                        coverImageUrl = imageData.secure_url
                      }

                      const coverImageQuery =
                        'update cover_images set url = $2 , public_id = $3 where user_id = $1'
                      pool.query(
                        coverImageQuery,
                        [id, coverImageUrl, coverImagePublicId],
                        (err: Error) => {
                          if (err)
                            return res.status(400).send({
                              message: err
                            })
                          return res.status(201).send({
                            message:
                              'Successfully created basic_information, images, cover_images, and updated users '
                          })
                        }
                      )
                    }
                  )
                }
              )
            }
          )
        } else {
          return res.status(400).send({
            message: 'Basic information not found, make post request.'
          })
        }
      }
    )
  } else {
    return res.status(400).send({
      message: 'Invalid basic_information format',
      format: `organization_name, industry_type,address,image, cover_image, summary, phone_number, email `
    })
  }
}
