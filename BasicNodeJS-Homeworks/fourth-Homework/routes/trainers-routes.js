import express from 'express'
import {
  getTrainersData,
  getTrainerByID,
  updateTrainerInfo,
  addTrainer,
  deleteTrainer,
  deleteAllTrainers,
} from '../services/trainers-service.js'

const router = express.Router()

router.get('/trainers', (req, res) => {
  try {
    const trainers = getTrainersData(req.query)
    res.status(200).send(trainers)
  } catch (error) {
    return res.status(404).send(error.message)
  }
})

router.get('/trainers/:id', (req, res) => {
  try {
    const id = req.params.id
    const trainer = getTrainerByID(id)
    res.status(200).send(trainer)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
router.post('/trainers', (req, res) => {
  try {
    const newTrainer = req.body
    addTrainer(newTrainer)
    res.status(200).send('Trainer added successfully')
  } catch (error) {
    res.status(404).send(error.message)
  }
})

router.patch('/trainers/:id', (req, res) => {
  try {
    const body = req.body
    const id = req.params.id

    if (body.id) throw new Error('Invalid Update')

    const editedTrainer = updateTrainerInfo(id, body)
    res.status(200).send(editedTrainer)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

router.delete('/trainers/:id', (req, res) => {
  try {
    const id = req.params.id
    deleteTrainer(id)
    res.status(200).send('Trainer Deleted successfully')
  } catch (error) {
    res.status(404).send('Trainer with that id not found')
  }
})

router.delete('/trainers', (req, res) => {
  try {
    const deleted = deleteAllTrainers()
    res.status(200).send('All trainers deleted successfully')
  } catch (error) {
    res.status(404).send(' Failed to delete trainers ')
  }
})

export default router
