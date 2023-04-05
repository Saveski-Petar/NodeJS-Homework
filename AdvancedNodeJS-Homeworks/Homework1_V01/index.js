import 'dotenv/config'
import express from 'express'
import { connectToDatabase } from './db/mongo-connection.js'
import router from './router.const.js'

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

app.use('/api', router)

app.listen(PORT, HOST, async (error) => {
  if (error) console.log('Error while starting server:', error)

  await connectToDatabase()

  console.log(`Server running on http://${HOST}:${PORT}`)
})
