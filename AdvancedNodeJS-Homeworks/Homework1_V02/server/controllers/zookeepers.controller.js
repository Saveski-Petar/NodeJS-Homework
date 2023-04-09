import ZookeeperService from '../services/zookeepers.services.js'

export default class ZookeeperController {
  static async addZookeeper(req, res) {
    try {
      const newZookeeper = await ZookeeperService.addZookeeper(req.body)
      res.status(200).send(newZookeeper)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  static async getZookeepers(req, res) {
    try {
      const id = req.params.id
      if (id) {
        const zookeeper = await ZookeeperService.getZookeeperByID(id)
        res.status(200).send(zookeeper)
      } else {
        const allZookeepers = await ZookeeperService.getAllZookeepers(req.query)
        res.status(200).send(allZookeepers)
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  static async updateZookeeper(req, res) {
    try {
      const updatedZookeeper = await ZookeeperService.updateZookeeper(
        req.params.id,
        req.body
      )
      res.status(200).send(updatedZookeeper)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  static async deleteZookeeper(req, res) {
    try {
      await ZookeeperService.deleteZookeeperByID(req.params.id)
      res.sendStatus(200)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  static async updateAnimals(req, res) {
    try {
      const zookeeperID = req.params.id
      const animalIDs = req.body.animals

      const response = await ZookeeperService.updateAnimals(
        zookeeperID,
        animalIDs
      )
      res.status(200).send(response)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
}
