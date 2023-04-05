import { getDb } from '../db/mongo-connection.js'
import { ObjectId } from 'mongodb'

export default class ZookeeperModel {
  static async addZookeeper(zookeeper) {
    const collection = getDb().collection('zookeepers')
    const newZookeeper = await collection.insertOne(zookeeper)
    return { id: newZookeeper.insertId, ...newZookeeper }
  }

  static async editZookeeper(zookeeperID, body) {
    const collection = getDb().collection('zookeepers')
    const updated = await collection.updateOne(
      { _id: new ObjectId(zookeeperID) },
      { $set: body }
    )
    return updated
  }
  static async getAllZookeepers() {
    const collection = getDb().collection('zookeepers')
    const zookeepers = await collection.find().toArray()

    return zookeepers
  }
  static async getZookeeperByID(zookeeperID) {
    const collection = getDb().collection('zookeepers')
    const zookeeper = await collection.findOne({
      _id: new ObjectId(zookeeperID),
    })
    return zookeeper
  }
  static async deleteZookeeper(zookeeperID) {
    const collection = getDb().collection('zookeepers')
    const deletedZookeeper = await collection.deleteOne({
      _id: new ObjectId(zookeeperID),
    })
    return deletedZookeeper
  }
}
