import { ObjectId } from 'mongodb'
import { getDb } from '../db/mongo-connection.js'

export default class AnimalModel {
  static async addNewAnimal(animalInfo) {
    const collection = getDb().collection('animals')
    const newAnimal = collection.insertOne(animalInfo)
    return newAnimal
  }
  static async editAnimal(animalID, updatedAnimalInfo) {
    const collection = getDb().collection('animals')
    const updated = await collection.updateOne(
      { _id: new ObjectId(animalID) },
      { $set: updatedAnimalInfo }
    )
    return updated
  }
  static async getAllAnimals(query) {
    const collection = getDb().collection('animals')
    let animals = await collection.find().toArray()
    if (query?.location) {
      animals = animals.filter((a) => a.location === query.location)
      return animals
    }

    return animals
  }
  static async getAnimalByID(animalID) {
    const collection = getDb().collection('animals')
    const animal = await collection.findOne({
      _id: new ObjectId(animalID),
    })
    return animal
  }
  static async deleteAnimal(animalID) {
    const collection = getDb().collection('animals')
    const animal = await collection.deleteOne({
      _id: new ObjectId(animalID),
    })
    return animal
  }
  static async deleteAllAnimal() {
    const collection = getDb().collection('animals')
    const deleted = await collection.deleteMany({})
    return deleted
  }
}
