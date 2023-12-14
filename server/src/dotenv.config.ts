import dotenv from 'dotenv'

dotenv.config()

const errorMessage = (error: string) => {
  throw new Error(error)
}

module.exports = {
  database: process.env.DB_NAME || errorMessage('database name is missing'),
  connectionString: process.env.CONNECTION_STRING || errorMessage('connection string is missing'),
  port: process.env.PORT || errorMessage('port number is missing')
}