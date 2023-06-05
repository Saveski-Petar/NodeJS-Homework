import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import axiosInstance from '../../api/axios'

const AddNewAnimalCard = ({ handleClose, show, updateAnimals }) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [age, setAge] = useState('')
  const [location, setLocation] = useState('')
  const [gender, setGender] = useState('')
  const [food, setFood] = useState([])
  const [color, setColor] = useState('')
  const [isDangerous, setIsDangerous] = useState(false)
  const [weight, setWeight] = useState('')
  const [enclosure, setEnclosure] = useState('')
  const [error, setError] = useState(null)

  const animalData = {
    name,
    type,
    age: parseInt(age),
    location,
    gender,
    characteristics: {
      food: [],
      color,
      isDangerous: isDangerous ? 'Dangerous' : 'Harmless',
      weight: parseInt(weight),
      enclosure,
    },
  }

  useEffect(() => {
    if (!show) {
      resetForm()
    }
  }, [show])
  const resetForm = () => {
    setName('')
    setType('')
    setAge('')
    setLocation('')
    setGender('')
    setFood('')
    setColor('')
    setIsDangerous(false)
    setWeight('')
    setEnclosure('')
    setError(null)
  }

  const handleAddAnimal = async () => {
    try {
      await axiosInstance.post('/api/animals', animalData)
      console.log('animal Added')
      updateAnimals()
      handleClose()
    } catch (error) {
      console.log(error)
      setError({
        statusCode: error.response.data.statusCode,
        message: error.response.data.message,
      })
    }
  }

  return (
    <>
      <Modal fullscreen="sm-down" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Animal</Modal.Title>
        </Modal.Header>
        {error && (
          <>
            {' '}
            <h3>{error.statusCode}</h3>
            <ul>
              {error.message.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </>
        )}
        <Modal.Body>
          <Form>
            <Row>
              <Col className="d-sm-flex justify-content-between">
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="fit-Placeholder "
                    placeholder="Enter the name of the animal"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="type">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    type="text"
                    className="fit-Placeholder"
                    placeholder="Enter the type of the animal"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="d-sm-flex justify-content-between">
                <Form.Group controlId="age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    className="fit-Placeholder"
                    placeholder="Enter the age of the animal"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    className="fit-Placeholder"
                    placeholder="Enter the location of the animal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="d-flex justify-content-around">
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option disabled value="">
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="isDangerous">
                  <Form.Label>Is It Dangerous</Form.Label>
                  <Form.Select
                    checked={isDangerous}
                    onChange={(e) => setIsDangerous(e.target.checked)}
                  >
                    <option disabled value="">
                      Is It Dangerous
                    </option>
                    <option value="Dangerous">Yes</option>
                    <option value="Harmless">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="food">
              <Form.Label>Food</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the food of the animal (comma-separated)"
                value={food}
                onChange={(e) => setFood(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col className="d-sm-flex justify-content-between">
                {' '}
                <Form.Group controlId="color">
                  <Form.Label>Colour</Form.Label>
                  <Form.Control
                    type="text"
                    className="fit-Placeholder"
                    placeholder="Enter the color of the animal"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="enclosure">
                  <Form.Label>Enclosure</Form.Label>
                  <Form.Control
                    type="text"
                    className="fit-Placeholder"
                    placeholder="Enter the Enclosure"
                    value={enclosure}
                    onChange={(e) => setEnclosure(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the weight of the animal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddAnimal}>
            Add Animal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddNewAnimalCard
