import express from 'express'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'
import trainersRoutes from './routes/trainers-routes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const staticHomePage = path.join(__dirname, 'public')

const PORT = 3000
const HOSTNAME = 'localhost'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/', trainersRoutes)

app.use('/home', express.static(staticHomePage))

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server started listening on http://${HOSTNAME}:${PORT}/home`)
})
