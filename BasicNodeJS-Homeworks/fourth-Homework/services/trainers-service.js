import fs from 'fs'
import path, { parse } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { fileURLToPath } from 'url'
import { faker } from '@faker-js/faker'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const trainersJSONPath = path.join(__dirname, '..', 'trainers.json')

export const saveTrainerData = (trainers) =>
  fs.writeFileSync(trainersJSONPath, JSON.stringify(trainers, null, 2))

export const getTrainersData = (query) => {
  let trainers = JSON.parse(fs.readFileSync(trainersJSONPath, 'utf-8'))
  if (trainers?.length <= 0) {
    return trainers
  }
  if (query?.isActive === 'true') {
    trainers = trainers.filter(
      (trainer) => trainer.isCurrentlyTeaching === true
    )
  }
  if (query?.isActive === 'false') {
    trainers = trainers.filter(
      (trainer) => trainer.isCurrentlyTeaching === false
    )
  }
  if (query?.sortBy === 'coursesAsc') {
    trainers = trainers.sort((a, b) => a.coursesFinished - b.coursesFinished)
  }
  if (query?.sortBy === 'coursesDesc') {
    trainers = trainers.sort((a, b) => b.coursesFinished - a.coursesFinished)
  }

  return trainers
}

export const getTrainerByID = (id) => {
  const trainers = getTrainersData()

  const trainer = trainers.find((trainer) => trainer.id === id)

  if (!trainer) {
    throw new Error(`Trainer with the id of ${id} doesnt exist`)
  }
  return trainer
}

export const addTrainer = (trainer) => {
  const trainers = getTrainersData()

  trainers.push({
    ...trainer,
    id: uuidv4(),
  })
  saveTrainerData(trainers)
}

export const updateTrainerInfo = (trainerID, updateData) => {
  const trainers = getTrainersData()
  const id = getTrainerByID(trainerID)

  if (!id) throw new Error(`Trainer with that id not found`)

  const updatedInfo = {
    ...id,
    ...updateData,
  }

  const updatedTrainers = trainers.map((trainer) =>
    trainer.id === updatedInfo.id ? updatedInfo : trainer
  )

  saveTrainerData(updatedTrainers)

  return updatedInfo
}

export const deleteTrainer = (id) => {
  const trainers = getTrainersData()

  const delTraiener = trainers.filter((trainer) => trainer.id !== id)

  saveTrainerData(delTraiener)
}

export const deleteAllTrainers = () => {
  const trainers = getTrainersData()

  trainers.splice(0, trainers.length)

  saveTrainerData(trainers)
}

const CreateFakeJsonUserData = () => {
  const readJson = fs.readFileSync(trainersJSONPath, 'utf-8')
  const isEmpty = readJson === '' || JSON.parse(readJson).length === 0
  if (isEmpty) {
    class Users {
      constructor(
        firstName,
        lastName,
        email,
        isCurrentlyTeaching,
        timeEmployed,
        coursesFinished
      ) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.isCurrentlyTeaching = isCurrentlyTeaching
        this.coursesFinished = coursesFinished
        if (typeof timeEmployed === 'string') {
          this.timeEmployed = timeEmployed
        } else if (typeof timeEmployed === 'number') {
          const years = Math.floor(timeEmployed / 12)
          const months = timeEmployed % 12
          const yearString =
            years > 0 ? `${years} year${years > 1 ? 's' : ''} ` : ''
          const monthString =
            months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''
          this.timeEmployed = yearString + monthString || 'Less than a month'
        } else {
          throw new Error(`Invalid timeEmployed value: ${timeEmployed}`)
        }
        this.id = uuidv4()
      }
    }

    const users = []

    for (let i = 0; i < 20; i++) {
      const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()
      const email = faker.internet.email(firstName, lastName, 'example.com')
      const isCurrentlyTeaching = Math.random() < 0.5
      const timeEmployed = Math.floor(Math.random() * 118) + 1 // generates a number between 1 and 119 (inclusive)

      const user = new Users(
        firstName,
        lastName,
        email,
        isCurrentlyTeaching,
        timeEmployed,
        Math.floor(Math.random() * 15) + 1 // generates a number between 1 and 5 (inclusive)
      )
      users.push(user)
      fs.writeFileSync('trainers.json', JSON.stringify(users, null, 2))
    }
  } else {
    console.log('there is data in the json')
  }
}
// CreateFakeJsonUserData()
