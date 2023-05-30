import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

const EditAnimal = ({ animal, show, handleClose }) => {
  const [editedAnimal, setEditedAnimal] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedAnimal((prevAnimal) => ({
      ...prevAnimal,
      [name]: value,
    }))
  }

  const handleSaveChanges = () => {
    // Perform the logic to save the changes
    console.log(editedAnimal)
    handleClose()
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Animal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {animal?.type && (
              <Form.Group controlId="formAnimalType">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="text"
                  name="type"
                  value={editedAnimal.type}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
            {animal?.name && (
              <Form.Group controlId="formAnimalName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editedAnimal.name}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
            {animal?.email && (
              <Form.Group controlId="formAnimalEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editedAnimal.email}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
            {animal?.age && (
              <Form.Group controlId="formAnimalAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={editedAnimal.age}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
            {animal?.gender && (
              <Form.Group controlId="formAnimalGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={editedAnimal.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Form.Group>
            )}
            {animal?.location && (
              <Form.Group controlId="formAnimalLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={editedAnimal.location}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
            {animal?.characteristics?.color && (
              <Form.Group controlId="formAnimalColor">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  name="color"
                  value={editedAnimal.characteristics.color}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
            {animal?.characteristics?.weight && (
              <Form.Group controlId="formAnimalWeight">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="number"
                  name="weight"
                  value={editedAnimal.characteristics.weight}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
            {animal?.characteristics?.isDangerous !== undefined && (
              <Form.Group controlId="formAnimalIsDangerous">
                <Form.Label>Is Dangerous?</Form.Label>
                <Form.Control
                  as="select"
                  name="isDangerous"
                  value={editedAnimal.characteristics.isDangerous}
                  onChange={handleChange}
                >
                  <option value={true}>Dangerous</option>
                  <option value={false}>Harmless</option>
                </Form.Control>
              </Form.Group>
            )}
            {animal?.characteristics?.enclosure && (
              <Form.Group controlId="formAnimalEnclosure">
                <Form.Label>Enclosure</Form.Label>
                <Form.Control
                  type="text"
                  name="enclosure"
                  value={editedAnimal.characteristics.enclosure}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
            {animal?.foods && (
              <Form.Group controlId="formAnimalFoods">
                <Form.Label>Foods</Form.Label>
                <Form.Control
                  type="text"
                  name="foods"
                  value={editedAnimal.foods}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditAnimal
