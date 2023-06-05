import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { useLocation } from 'react-router-dom'

const List = ({ data, onEdit, handleDelete, handleAddZookeeper }) => {
  const location = useLocation()

  return (
    <Row className="d-flex justify-content-center align-content-center m-0">
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
              <th>Full Name</th>
              <th>Age</th>
              <th>Email</th>
              {data?.[0]?.isActive && <th>Is Active</th>}
              {data?.[0]?.animals && <th>Animals</th>}
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                {user?.isActive && <td>{user.isActive}</td>}
                {user?.animals && (
                  <td>
                    {user.animals && user.animals.length > 0
                      ? user?.animals?.map((animal) => animal.name).join(', ')
                      : 'No Animals'}
                  </td>
                )}
                {location.pathname === '/animals' ||
                  (location.pathname === '/Zookeepers' && (
                    <>
                      <td>
                        <p
                          onClick={() => onEdit(user)}
                          role="button"
                          className="text-decoration-underline "
                        >
                          Edit
                        </p>
                      </td>
                      <td>
                        <p
                          onClick={() => handleDelete(user.id)}
                          role="button"
                          className="text-decoration-underline"
                        >
                          Delete
                        </p>
                      </td>
                    </>
                  ))}
                {location.pathname === '/users' && user.role !== 'owner' && (
                  <td>
                    <p
                      role="button"
                      onClick={() => handleAddZookeeper(user.id)}
                      className="text-decoration-underline "
                    >
                      Add Zookeeper
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

export default List
