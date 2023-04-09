import 'dotenv/config'
import express from 'express'
import mongoose, { mongo } from 'mongoose'
import router from './router.const.js'

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.${process.env.MONGO_SERVER}.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`

const app = express()

app.use(express.json())

app.use('/api', router)

app.listen(process.env.PORT, process.env.HOST, async (error) => {
  if (error) console.log('Error while starting server:', error)

  await mongoose.connect(MONGO_URI)

  console.log(
    `Server running on http://${process.env.HOST}:${process.env.PORT}`
  )
})
