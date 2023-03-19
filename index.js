import express    from 'express'
import bodyParser from 'body-parser'
import dotenv     from 'dotenv'
import routes     from './src/index.js'

console.log('starts here')
dotenv.config()
const app = express()

// Parse body JSON data with payload size limit to mitigate variable size DOS
app.use(bodyParser.json({limit: "500kb"}))

// Call router to handle all requests
app.use('/', routes)

// Start server on port defined in .env
app.listen(process.env.APP_PORT, () => {
  console.log(`Started on port ${process.env.APP_PORT}`)
})

process.on('unhandledRejection', (reason, p) => {
  console.log('UNHANDLED REJECTION', reason, p)
})

process.on('uncaughtException', err => {
  console.log('UNHANDLED Exception1', err)
})
