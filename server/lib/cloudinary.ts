export const cloudinary = require('cloudinary')

cloudinary.config({
    secure:true,
    api_key:process.env.CLOUDINARY_NAME,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    cloud_name:process.env.CLOUDINARY_API_KEY
})
