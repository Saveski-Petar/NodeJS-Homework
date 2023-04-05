import ZookeperModel from '../models/zookeeper.model.js'

export default class ZookeeperController {
  static async addZookeeper(req, res) {
    try {
      const newZookeeper = await ZookeperModel.addZookeeper(req.body)

      res.status(200).send(newZookeeper)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  static async editZookeeper(req, res) {
    try {
      const edditedZookeeper = await ZookeperModel.editZookeeper(
        req.params.id,
        req.body
      )
      res.status(200).send(edditedZookeeper)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  static async getZookeepers(req, res) {
    try {
      const id = req.params.id
      console.log(id)
      if (id) {
        const zookeeper = await ZookeperModel.getZookeeperByID(id)
        res.status(200).send(zookeeper)
      } else {
        const zookeepers = await ZookeperModel.getAllZookeepers()
        res.status(200).send(zookeepers)
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  static async deleteZookeeper(req, res) {
    try {
      await ZookeperModel.deleteZookeeper(req.params.id)
      res.sendStatus(200)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
}
