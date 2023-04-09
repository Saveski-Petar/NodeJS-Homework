import { Router } from 'express'
import ZookeeperController from '../controllers/zookeepers.controller.js'

const router = Router()

router.post('/', ZookeeperController.addZookeeper)
router.get('/:id?', ZookeeperController.getZookeepers)
router.put('/:id?', ZookeeperController.updateZookeeper)
router.patch('/:id/animals', ZookeeperController.updateAnimals)
router.delete('/:id', ZookeeperController.deleteZookeeper)
export default router
