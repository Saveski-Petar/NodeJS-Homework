import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { passwordRegex } from '../../utils/regexPatterns'
import axios from '../../api/axios'

function Register({ onToggleForm, onRegistrationSuccess }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    age: '',
    fullName: '',
    email: '',
    location: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target

    const parsedValue = name === 'age' ? parseInt(value) : value
    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { age, password } = formData

    parseInt(age)

    // Perform client-side validation
    if (isNaN(age) || age < 18 || age > 49) {
      console.log('Invalid age. Age must be a number between 18 and 49.')
      return
    }

    if (!passwordRegex.test(password)) {
      console.log(
        'Invalid password. Password must meet the specified requirements.'
      )
      return
    }

    try {
      const response = await axios.post('/api/auth/signup', formData)
      onRegistrationSuccess()
      console.log(response)
    } catch (error) {
      setError({
        statusCode: error.response.data.statusCode,
        message: error.response.data.message,
      })
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <Container className="m-0 vh-100 ">
      <Row className="justify-content-center align-items-center h-100 m-0">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <div className="bg-black card-shadow p-4 rounded">
            <h1 className="text-center mb-4">Create an account</h1>
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
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Johnny"
                  required
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  name="age"
                  placeholder="18"
                  required
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Your Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="Macedonia"
                  required
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Your Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="name@mail.com"
                  required
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    required
                    onChange={handleChange}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="••••••••"
                    required
                    onChange={handleChange}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>
              <div className="text-center ">
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </div>
              <p className="text-sm font-light  text-center">
                Already have an account?{' '}
                <a
                  href="/"
                  className="text-primary-600 "
                  onClick={onToggleForm}
                >
                  Login here
                </a>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
