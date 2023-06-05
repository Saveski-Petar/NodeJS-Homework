import React, { useEffect, useState } from 'react'
import NavBar from '../components/navBar/NavBar'
import SearchBar from '../components/searchBar/SearchBar'
import Card from '../components/cards/Card'
import axiosInstance from '../api/axios'
import { Container } from 'react-bootstrap'

const HomePage = () => {
  const [data, setData] = useState([])
  const [searchedData, setSearchData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/animals')
        setData(response.data)
      } catch (error) {
        setError({
          statusCode: error.response.data.statusCode,
          message: error.response.data.message,
        })
      }
    }

    fetchData()
  }, [])

  const searchData = (searchData) => {
    setSearchData(searchData)
  }

  return (
    <>
      <NavBar />
      <SearchBar
        searchEndpoint="/api/animals/"
        query="type"
        placeHolder="Search By Type"
        onSearch={searchData}
      />
      {error ? (
        <Container className="text-center">
          <h1>{error.statusCode}</h1>
          <p>{error.message}</p>
        </Container>
      ) : (
        <Card data={searchedData ? searchedData : data} />
      )}
    </>
  )
}

export default HomePage
