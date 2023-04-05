import express from 'express'
import zookeeperRouter from './routes/zookeepers.routes.js'
import animalsRouter from './routes/animals.routes.js'
const router = express.Router()

router.use('/zookeepers', zookeeperRouter)
router.use('/animals', animalsRouter)

export default router
