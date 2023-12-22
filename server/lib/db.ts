
const { Pool } = require('pg')
require('dotenv').config()


const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

 pool.connect((err:Error) => {
if(err) throw err 
console.log('connected to db')
 })

 module.exports = pool