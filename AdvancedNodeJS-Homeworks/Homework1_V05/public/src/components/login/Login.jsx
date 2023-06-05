import React, { useState, useContext } from 'react'
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Login = ({ onToggleForm }) => {
  const [showPassword, setShowPassowrd] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/login', { email, password })

      if (response.status === 200 || 201) {
        navigate('/')
      }

      const { accessToken, refreshToken } = response.data

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      login(accessToken)
    } catch (error) {
      console.log(error)
      setError({
        statusCode: error.response.data.statusCode,
        message: error.response.data.message,
      })
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassowrd(!showPassword)
  }

  return (
    <Container fluid className="vh-100 ">
      <Row className="justify-content-center align-items-center h-100 m-0">
        <Col sm={8} md={5} lg={4}>
          <div className="bg-black card-shadow  p-4 rounded ">
            <h1 className="text-center mb-4">Sign In</h1>
            {error && (
              <>
                <h2>{error.statusCode}</h2>
                <p>{error.message}</p>
              </>
            )}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="FullName"
                  placeholder="Johhny@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <div className="text-center mb-3">
                <Button variant="primary" type="submit">
                  Sign In
                </Button>
              </div>
              <p className="text-sm font-light text-center">
                Don’t have an account yet?{' '}
                <a href="/" className="text-primary-600" onClick={onToggleForm}>
                  Sign up
                </a>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
