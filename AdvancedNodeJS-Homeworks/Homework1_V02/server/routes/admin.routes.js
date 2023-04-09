import { Router } from 'express'
import AdminController from '../controllers/admin.controller.js'
const router = Router()

router.delete('/delete-All-Animals', AdminController.deleteAllAnimals)
router.delete('/delete-All-Zookeepers', AdminController.deleteAllZookeepers)

export default router
