import * as fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// getting the path of the file
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const usersFilePath = path.join(__dirname, 'users.json')

class User {
  constructor(username, password, age, isActive) {
    this.username = username
    this.password = password
    this.age = age
    this.isActive = isActive
    this.date = new Date().toDateString()
  }
}

const users = []

// Creating 10 users with a loop
function createUsers() {
  for (let i = 1; i <= 10; i++) {
    const username = `userName${i}`
    const password = `password${i}`
    const age = Math.floor(Math.random() * (50 - 18) + 18)
    const isActive = Math.random() < 0.5

    // push the created users to the array
    users.push(new User(username, password, age, isActive))
  }
  // Write them to Json file
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), {
    encoding: 'utf-8',
  })
}
createUsers()

// BONUS
// Function= create new user from the class and appends it to the users in the filesystem
function newUser(
  username,
  password,
  age,
  isActive,
  date = new Date().toDateString()
) {
  const data = fs.readFileSync(usersFilePath, 'utf-8')
  const users = JSON.parse(data)
  users.push(new User(username, password, age, isActive, date))
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), {
    encoding: 'utf-8',
  })
}
newUser('Petar', 'Petar123', 21, true)
newUser('Something', 'smth123', 19, false)
newUser('AnotherONe', 'pass123', 30, true)

// Function-  sets to inactive all users that are registered for more than one day and writes the data on the filesystem

function setInactiveOldUsers() {
  const data = fs.readFileSync(usersFilePath, 'utf-8')
  const users = JSON.parse(data)
  const today = new Date()

  users.forEach((user) => {
    const dateCreated = new Date(user.date)
    const timeDiff = Math.abs(today.getTime() - dateCreated.getTime())
    const diffDay = Math.ceil(timeDiff / (1000 * 3600 * 24))

    if (diffDay > 1) {
      user.isActive = false
    }
  })

  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), {
    encoding: 'utf-8',
  })
}
setInactiveOldUsers()

// function -for given username deletes the user from filesystem
function deleteUser(userName) {
  const data = fs.readFileSync(usersFilePath, 'utf-8')
  let users = JSON.parse(data)
  users = users.filter((user) => user.username !== userName)
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8')
}
deleteUser('Something')

// FUnction- DELETE ALL INACTIVE USERS
function deleteAllInactiveUsers() {
  const data = fs.readFileSync(usersFilePath, 'utf-8')
  let users = JSON.parse(data)
  users = users.filter((user) => user.isActive === true)
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8')
}
deleteAllInactiveUsers()
