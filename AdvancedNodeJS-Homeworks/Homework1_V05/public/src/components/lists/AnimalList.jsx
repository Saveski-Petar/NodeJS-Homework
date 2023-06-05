import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { AuthContext } from '../../context/AuthContext'

const AnimalList = ({ data, handleDelete, onEdit, onAssign }) => {
  const { accessToken } = useContext(AuthContext)
  return (
    <Row className="d-flex justify-content-center align-content-center m-0 ">
      <Col
        sm={12}
        md={8}
        lg={10}
        style={{
          overflow: 'auto',
          maxHeight: '500px',
        }}
      >
        <Table responsive striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Zookeeper</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((animal) => (
              <tr key={animal.id}>
                <td>{animal.name}</td>
                <td>{animal.type}</td>
                <td>{animal.zookeeper ? animal.zookeeper.fullName : 'Null'}</td>
                <td>
                  <p
                    onClick={() => onEdit(animal)}
                    role="button"
                    className="text-decoration-underline "
                  >
                    Edit Animal
                  </p>
                </td>
                <td>
                  {' '}
                  <p
                    onClick={() => handleDelete(animal.id)}
                    role="button"
                    className="text-decoration-underline"
                  >
                    Delete Animal
                  </p>
                </td>
                {accessToken?.role === 'owner' && (
                  <td>
                    {' '}
                    <p
                      onClick={() => onAssign(animal)}
                      role="button"
                      className="text-decoration-underline"
                    >
                      Assign Zookeeper
                    </p>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}

export default AnimalList
