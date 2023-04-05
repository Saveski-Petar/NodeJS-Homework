import AnimalModel from '../models/animal.model.js'

export default class AnimalsController {
  static async addNewAnimal(req, res) {
    try {
      const newAnimal = await AnimalModel.addNewAnimal(req.body)
      res.status(200).send(newAnimal)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  static async updateAnimal(req, res) {
    try {
      const editedAnimalInfo = await AnimalModel.editAnimal(
        req.params.id,
        req.body
      )
      res.status(200).send(editedAnimalInfo)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  static async getAnimals(req, res) {
    try {
      const id = req.params.id
      if (id) {
        const animal = await AnimalModel.getAnimalByID(id, req.query)
        res.status(200).send(animal)
      } else {
        const allAnimals = await AnimalModel.getAllAnimals(req.query)
        res.status(200).send(allAnimals)
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  static async deleteAnimal(req, res) {
    try {
      await AnimalModel.deleteAnimal(req.params.id)
      res.sendStatus(200)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  static async deleteAllAnimal(req, res) {
    try {
      console.log('start')
      await AnimalModel.deleteAllAnimal()
      console.log('after')
      res.sendStatus(200)
    } catch (error) {
      console.log('end')
      res.status(500).send(error.message)
    }
  }
}
