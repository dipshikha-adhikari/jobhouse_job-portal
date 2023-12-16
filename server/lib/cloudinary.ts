const cloudinary = require('cloudinary')

cloudinary.config({
    secure:true
})

console.log(cloudinary.config());