import express, { Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import user from './routes/user'
const { database, connectionString, port } = require('./dotenv.config')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

dotenv.config()

mongoose
  .connect(connectionString, {
    retryWrites: true,
    w: 'majority',
    dbName: database,
  })
  .then(() => {
    console.log('Connected to MongoDB database ' + mongoose.connection.name)
  })
  .catch((error: any) => {
    console.error('Failed to connect to MongoDB database', error)
  })

app.get('/', function (res: Response) {
  res.send('Hey Bro!')
})

app.use('/user', user)

app.listen(port, () => console.log(port))