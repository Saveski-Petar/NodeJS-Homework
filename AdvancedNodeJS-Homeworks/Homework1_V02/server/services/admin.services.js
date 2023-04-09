import Animal from '../models/animals.model.js'
import Zookeeper from '../models/zookeepers.model.js'

export default class AdminService {
  static async deleteAllAnimals() {
    await Animal.deleteMany()
  }
  static async deleteAllZookeepers() {
    await Zookeeper.deleteMany()
  }
}
