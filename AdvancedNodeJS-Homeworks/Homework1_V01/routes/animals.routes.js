import express from 'express'
import AnimalsController from '../controllers/animals.controller.js'
import animalValidator from '../middleware/animals.validator.js'
const router = express.Router()

router.post('/', animalValidator, AnimalsController.addNewAnimal)
router.put('/:id', AnimalsController.updateAnimal)
router.get('/:id?', AnimalsController.getAnimals)
router.delete('/:id', AnimalsController.deleteAnimal)
router.delete('/', AnimalsController.deleteAllAnimal)

export default router
