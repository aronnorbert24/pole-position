import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import user from './routes/user'
import article from './routes/article'
const { database, connectionString, port } = require('./dotenv.config')

const app = express()

app.use(bodyParser.json({limit: '35mb'}));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000,
  }),
);

dotenv.config()

try {
  mongoose
  .connect(connectionString, {
    retryWrites: true,
    w: 'majority',
    dbName: database,
  })
  console.log('Connected to MongoDB database ' + mongoose.connection.name)
} catch(error: any) {
    console.error('Failed to connect to MongoDB database', error)
}

app.get('/', function (res: Response) {
  res.send('Hey Bro!')
})

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }

  next()
})

app.use('/user', user)
app.use('/article', article)

app.listen(port, () => console.log(port))