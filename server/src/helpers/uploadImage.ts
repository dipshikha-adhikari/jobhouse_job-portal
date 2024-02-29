import { QueryResult } from 'pg'
import { cloudinary } from '../lib/cloudinary'
const pool = require('../lib/db')

export const uploadImage = async (image: any, user_id: string) => {
  try {
    const uploadOptions = {
      use_filename: true,
      unique_filename: false,
      overwrite: true
    }

    if (image.url !== undefined) {
      return image
    }

    const uploadResult = await cloudinary.uploader.upload(image, uploadOptions)
    const imageFromDb: QueryResult = await pool.query(
      'select * from images where user_id = $1',
      [user_id]
    )

    if (imageFromDb.rowCount > 0) {
      let public_id = imageFromDb.rows[0]?.public_id
      if (public_id !== null && public_id !== undefined) {
        await cloudinary.uploader.destroy(public_id)
      }
    }
    return uploadResult
  } catch (error) {
    console.error('Error:', error) // Log any errors that occur
  }
}
