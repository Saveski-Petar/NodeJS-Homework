import * as http from 'node:http'
import * as fs from 'node:fs'

const server = http.createServer((req, res) => {
  if (req.url !== '/' && req.url !== '/student') {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('404 Not Found')
  }

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html')
    res.write('<h1>Welcome to my page</h1>')
    res.end()
  }
  if (req.url === '/student') {
    const student = {
      name: 'Petar',
      lastname: 'Saveski',
      academy: 'Full Stack Web Development SEDC',
      subject: 'Basic Node JS',
    }
    res.setHeader('Content-Type', 'text/html')
    res.write(`<html><body><h1>Student Information:</h1><ul>
    <li>Name: ${student.name}</li>
    <li>Lastname: ${student.lastname}</li>
    <li>Academy: ${student.academy}</li>
    <li>Subject: ${student.subject}</li>
  </ul></body></html>`)

    res.end()

    const date = new Date().toLocaleDateString()
    const hour = new Date().getHours()
    const min = new Date().getMinutes()

    const data = `
    ===========================
    Name:${student.name},
    Lastname:${student.lastname},
    Academy:${student.academy},
    Subject:${student.subject},
    -------------
    Log On
    ${date}
    at
    ${hour}:${min}
    ===========================`
    fs.appendFileSync(
      'students.txt',
      data,
      (err) => {
        if (err) throw err
      },
      console.log('Student information saved to file!')
    )
  }
})

server.listen(3000, () => {
  console.log('Server started listening at http://localhost:3000')
})
