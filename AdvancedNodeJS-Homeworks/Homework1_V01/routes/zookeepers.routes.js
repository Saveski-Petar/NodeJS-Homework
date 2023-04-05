import express from 'express'
import ZookeeperController from '../controllers/zookeepers.controller.js'
import zookeeperValidator from '../middleware/zookeepers.validator.js'

const router = express.Router()

router.post('/', zookeeperValidator, ZookeeperController.addZookeeper)
router.put('/:id', ZookeeperController.editZookeeper)
router.get('/:id?', ZookeeperController.getZookeepers)
router.delete('/:id', ZookeeperController.deleteZookeeper)

export default router
