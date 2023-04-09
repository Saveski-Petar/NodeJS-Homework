import AnimalsController from '../controllers/animals.controller.js'

import { Router } from 'express'

const router = Router()

router.post('/', AnimalsController.addNewAnimal)
router.get('/:id?', AnimalsController.getAnimals)
router.put('/:id', AnimalsController.editAnimal)
router.delete('/:id', AnimalsController.deleteAnimalByID)

export default router
