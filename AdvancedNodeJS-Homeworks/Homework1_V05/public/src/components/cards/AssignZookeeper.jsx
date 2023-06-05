import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axiosInstance from '../../api/axios'

const AssignZookeeper = ({
  handleClose,
  show,
  selectedAnimal,
  updateAnimals,
}) => {
  const [animalId, setAnimalId] = useState('')
  const [zookeeperId, setZookeeperId] = useState('')
  const [zookeepers, setZookeepers] = useState(null)
  const [error, setError] = useState(null)

  const zookeperList = (data) => (
    <ul className="list-unstyled">
      {data?.map((zookeeper) => (
        <>
          <li key={zookeeper.id}>
            <p>Name: {zookeeper.fullName}</p>
            <p>ID: {zookeeper.id}</p>
          </li>
          <hr />
        </>
      ))}
    </ul>
  )
  useEffect(() => {
    if (show) {
      setZookeeperId('')
      setError(null)
      setZookeepers(null)
    }
  }, [show])

  const fetchZookeeprs = async () => {
    try {
      const response = await axiosInstance.get('/api/zookeepers')

      setZookeepers(response.data)
    } catch (error) {
      setError({
        statusCode: error.response.data.statusCode,
        message: error.response.data.message,
      })
    }
  }

  useEffect(() => {
    if (selectedAnimal && selectedAnimal.id) {
      setAnimalId(selectedAnimal.id)
    }
  }, [selectedAnimal])

  const handleAssignZookeeper = async () => {
    try {
      await axiosInstance.patch(
        `/api/animals/${animalId}/zookeeper/${zookeeperId}`
      )
      handleClose(true)
      updateAnimals()
      setZookeeperId('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal fullscreen="sm-down" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Zookeeper</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col className="d-sm-flex justify-content-between">
                <Form.Group controlId="name">
                  <Form.Label>Animal ID</Form.Label>
                  <Form.Control
                    type="text"
                    className="fit-Placeholder "
                    placeholder="Enter animal ID"
                    disabled
                    value={animalId}
                    onChange={(e) => setAnimalId(e.target.value)}
                  />
                  <hr />
                </Form.Group>

                <Form.Group controlId="type">
                  <Form.Label>Zookeeper ID</Form.Label>
                  <Form.Control
                    type="text"
                    className="fit-Placeholder"
                    placeholder="Enter Zookeeper ID"
                    autoFocus
                    value={zookeeperId}
                    onChange={(e) => setZookeeperId(e.target.value)}
                  />
                  <hr />
                  <p
                    onClick={fetchZookeeprs}
                    role="button"
                    className="text-decoration-underline text-center "
                  >
                    Find Zookeeper ID
                  </p>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                {' '}
                {error || zookeepers ? (
                  <div
                    className="card-shadow "
                    style={{
                      height: '200px',
                      width: '100%',
                      overflow: 'auto',
                    }}
                  >
                    {error ? (
                      <>
                        <h1>{error.statusCode}</h1>
                        <p>{error.message}</p>
                      </>
                    ) : (
                      zookeperList(zookeepers)
                    )}
                  </div>
                ) : null}
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAssignZookeeper} variant="primary">
            Assign Zookeeper
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AssignZookeeper
