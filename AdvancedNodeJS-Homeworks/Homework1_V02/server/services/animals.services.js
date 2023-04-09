import Animal from '../models/animals.model.js'

export default class AnimalsService {
  static async addNewAnimal(newAnimalInfo) {
    const newAnimal = new Animal(newAnimalInfo)
    const addNewAnimal = await newAnimal.save()
    return addNewAnimal
  }
  static async getAllAnimals(query) {
    let animals = await Animal.find()

    if (animals.length === 0)
      throw new Error('No animals found in the database')

    if (query?.location) {
      animals = animals.filter(
        (a) => a.location.toLowerCase() === query.location.toLowerCase()
      )
      if (animals.length === 0)
        throw new Error('No animals found with the specified location')
    }
    if (query?.gender) {
      animals = animals.filter(
        (a) => a.gender.toLowerCase() === query.gender.toLowerCase()
      )
    }
    if (query?.age) {
      animals = animals.filter((a) => a.age > query.age)
    }
    if (query?.sortBy) {
      if (query.sortBy === 'ageAsc') {
        animals = animals.sort((a, b) => a.age - b.age)
      }
      if (query.sortBy === 'ageDesc') {
        animals = animals.sort((a, b) => b.age - a.age)
      }
    }

    return animals
  }
  static async getAnimalByID(animalID) {
    const animal = await Animal.findById(animalID).populate('zookeeper')
    if (!animal) throw new Error(`Animal with ID:${animalID} doesn't exist!`)
    return animal
  }
  static async editAnimal(animalID, animalUpdatedInfo) {
    const animal = await Animal.findById(animalID)
    if (!animal) throw new Error(`Animal with ID:${animalID} doesn't exist!`)

    const keys = Object.keys(animalUpdatedInfo)

    keys.forEach((key) => {
      if (key !== '_id' && key !== '__v') {
        animal[key] = animalUpdatedInfo[key]
      }
    })

    const updatedAnimal = await animal.save()
    return updatedAnimal
  }

  static async deleteAnimal(animalID) {
    await Animal.findByIdAndDelete(animalID)
  }
}
