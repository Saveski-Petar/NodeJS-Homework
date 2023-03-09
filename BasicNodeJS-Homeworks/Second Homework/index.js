import { EventEmitter } from 'node:events'

const emitter = new EventEmitter()

emitter.on('studentRegistered', (studentName) => {
  console.log(`Welcome to our app, ${studentName}!`)
})

function registerStudent(studentName) {
  emitter.emit('studentRegistered', studentName)
}

registerStudent('Petar')
