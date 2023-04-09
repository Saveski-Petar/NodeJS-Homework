import AnimalsService from '../services/animals.services.js'

export default class AnimalsController {
  static async addNewAnimal(req, res) {
    try {
      const newAnimal = await AnimalsService.addNewAnimal(req.body)
      res.status(200).send(newAnimal)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  static async getAnimals(req, res) {
    try {
      const id = req.params.id

      if (id) {
        const animal = await AnimalsService.getAnimalByID(id)
        res.status(200).send(animal)
      } else {
        const animals = await AnimalsService.getAllAnimals(req.query)
        res.status(200).send(animals)
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  static async editAnimal(req, res) {
    try {
      const editedAnimal = await AnimalsService.editAnimal(
        req.params.id,
        req.body
      )
      res.status(200).send(editedAnimal)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  static async deleteAnimalByID(req, res) {
    try {
      await AnimalsService.deleteAnimal(req.params.id)
      res.sendStatus(200)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
}
