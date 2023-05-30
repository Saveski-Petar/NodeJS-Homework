import React, { useEffect, useState } from 'react'
import NavBar from '../components/navBar/NavBar'
import SearchBar from '../components/searchBar/SearchBar'
import Card from '../components/cards/Card'
import axiosInstance from '../api/axios'

const HomePage = () => {
  const [data, setData] = useState([])
  const [searchedData, setSearchData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/animals')
        setData(response.data)
      } catch (error) {
        console.log(error)
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
        onSearch={searchData}
      />
      <Card data={searchedData ? searchedData : data} />
    </>
  )
}

export default HomePage
