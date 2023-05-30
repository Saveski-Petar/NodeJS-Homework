import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const NavBar = () => {
  const navigate = useNavigate()
  const { accessToken } = useContext(AuthContext)

  const handleLogOut = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    navigate('/login')
  }
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Zoo.Dev
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="text-center mx-auto ">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/About">
                About
              </Nav.Link>
              {accessToken?.role === 'owner' && (
                <Nav.Link as={Link} to="/users">
                  Users
                </Nav.Link>
              )}
              {accessToken?.role === 'owner' && (
                <Nav.Link as={Link} to="/Zookeepers">
                  Zookeepers
                </Nav.Link>
              )}
              {(accessToken?.role === 'owner' ||
                accessToken?.role === 'zookeeper') && (
                <Nav.Link as={Link} to="/animals">
                  Animals
                </Nav.Link>
              )}
            </Nav>
            <div className="d-flex justify-content-end ">
              {' '}
              <Dropdown>
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-basic"
                  style={{
                    border: 'none',
                    boxShadow: 'none',
                    backgroundColor: 'transparent',
                  }}
                >
                  Signed in as:{' '}
                  <span style={{ color: 'aqua' }}>{accessToken?.fullName}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
