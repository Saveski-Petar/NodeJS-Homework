import { Router } from 'express'
import zookeeperRouter from './routes/zookeepers.routes.js'
import animalsRouter from './routes/animals.routes.js'
import adminRouter from './routes/admin.routes.js'
const router = Router()

router.use('/zookeepers', zookeeperRouter)
router.use('/animals', animalsRouter)
router.use('/admin', adminRouter)

export default router
