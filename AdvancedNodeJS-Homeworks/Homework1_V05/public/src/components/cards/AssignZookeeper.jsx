import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const AssignZookeeper = ({ handleClose, show }) => {
  const [animalId, setAnimalId] = useState('')
  const [zookeeperId, setZookeeperId] = useState('')

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
                    autoFocus
                    value={animalId}
                    onChange={(e) => setAnimalId(e.target.value)}
                  />
                  <hr />
                  <p
                    role="button"
                    className="text-decoration-underline text-center"
                  >
                    Find Animal ID
                  </p>
                  <hr />
                </Form.Group>

                <Form.Group controlId="type">
                  <Form.Label>Zookeeper ID</Form.Label>
                  <Form.Control
                    type="text"
                    className="fit-Placeholder"
                    placeholder="Enter Zookeeper ID"
                    value={zookeeperId}
                    onChange={(e) => setZookeeperId(e.target.value)}
                  />
                  <hr />
                  <p
                    role="button"
                    className="text-decoration-underline text-center "
                  >
                    Find Zookeeper ID
                  </p>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Assign Animal</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AssignZookeeper
