import AdminService from '../services/admin.services.js'

export default class AdminController {
  static async deleteAllAnimals(req, res) {
    try {
      const confirmaition = req.body.confirmaition
      if (confirmaition === 'yes') {
        await AdminService.deleteAllAnimals()
        res.sendStatus(200)
      } else {
        throw new Error('You need to confirm this action')
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  static async deleteAllZookeepers(req, res) {
    try {
      const confirmaition = req.body.confirmaition
      if (confirmaition === 'yes') {
        await AdminService.deleteAllZookeepers()
        res.sendStatus(200)
      } else {
        throw new Error('You need to confirm this action')
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
}
