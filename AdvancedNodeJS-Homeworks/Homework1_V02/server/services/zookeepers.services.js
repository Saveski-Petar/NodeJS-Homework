import Zookeeper from '../models/zookeepers.model.js'
import AnimalsService from './animals.services.js'

export default class ZookeeperService {
  static async addZookeeper(newZookeeperInfo) {
    const newZookeeper = new Zookeeper(newZookeeperInfo)
    const addZookeeper = await newZookeeper.save()
    return addZookeeper
  }
  static async getZookeeperByID(zookeeperID) {
    const zookeeper = await Zookeeper.findById(zookeeperID).populate(
      'animals',
      '-zookeeper'
    )
    if (!zookeeper)
      throw new Error(`Zookeeper with ID:${zookeeperID} doesn't exist!`)
    return zookeeper
  }
  static async getAllZookeepers(query) {
    let zookeepers = await Zookeeper.find()

    if (zookeepers.length === 0)
      throw new Error('No zookeepers found in the database')

    if (query?.location) {
      zookeepers = zookeepers.filter(
        (zookeeper) =>
          zookeeper.location.toLowerCase() === query.location.toLowerCase()
      )
      if (zookeepers.length === 0)
        throw new Error(
          `We dont have zookeepers with this ${query.location} location`
        )
    }

    if (query?.isActive) {
      if (query.isActive === 'true') {
        zookeepers = zookeepers.filter(
          (zookeeper) => zookeeper.isActive === true
        )
        if (zookeepers.length === 0)
          throw new Error('There are no active Zookeepers ')
      }
      if (query.isActive === 'false') {
        zookeepers = zookeepers.filter(
          (zookeeper) => zookeeper.isActive === false
        )
        if (zookeepers.length === 0)
          throw new Error('All Zookeepers are active at this moment  ')
      }
    }

    if (query?.age) {
      zookeepers = zookeepers.filter((a) => a.age > query.age)
      if (zookeepers.length === 0)
        throw new Error(`We dont have zookeepers older than ${query.age}`)

      if (query?.sortBy) {
        if (query.sortBy === 'ageAsc') {
          zookeepers = zookeepers.sort((a, b) => a.age - b.age)
        }
        if (query.sortBy === 'ageDesc') {
          zookeepers = zookeepers.sort((a, b) => b.age - a.age)
        }
      }
    }

    return zookeepers
  }
  static async updateZookeeper(zookeeperID, updateZookeeperInfo) {
    const zookeeper = await Zookeeper.findById(zookeeperID)

    if (!zookeeper)
      throw new Error(`zookeeper with ID:${zookeeperID} doesn't exist!`)

    const keys = Object.keys(updateZookeeperInfo)

    keys.forEach((key) => {
      if (key !== '_id' && key !== '__v') {
        zookeeper[key] = updateZookeeperInfo[key]
      }
    })
    const updatedZookeeper = await zookeeper.save()
    return updatedZookeeper
  }

  static async updateAnimals(zookeeperID, animalsIDs) {
    const zookeeper = await Zookeeper.findById(zookeeperID)
    if (!zookeeper)
      throw new Error(`zookeeper with ID:${zookeeperID} doesn't exist!`)

    zookeeper.animals = animalsIDs

    for (const animalID of animalsIDs) {
      await AnimalsService.editAnimal(animalID, { zookeeper: zookeeperID })
    }
    await zookeeper.save()
    return zookeeper
  }

  static async deleteZookeeperByID(zookeeperID) {
    await Zookeeper.findByIdAndDelete(zookeeperID)
  }
}
