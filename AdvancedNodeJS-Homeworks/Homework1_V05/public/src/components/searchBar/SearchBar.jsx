import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import axiosInstance from '../../api/axios'

const SearchBar = ({ searchEndpoint, dynamicParam, query, onSearch }) => {
  const [data, setData] = useState()

  const handleSearch = async (e) => {
    e.preventDefault()

    try {
      let endpoint = searchEndpoint

      if (endpoint.includes(`:${dynamicParam}`)) {
        endpoint = endpoint.replace(`:${dynamicParam}`, data)
      } else {
        endpoint += `?${query}=${data}`
      }

      const response = await axiosInstance.get(endpoint)
      onSearch(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container className="my-3 ">
      <Row className="d-flex justify-content-center">
        <Col md={7}>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 rounded-pill"
              aria-label="Search"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <Button
              type="submit"
              className="rounded-pill"
              variant="outline-primary"
            >
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SearchBar
