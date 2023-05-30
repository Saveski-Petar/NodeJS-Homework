import React, { useEffect, useState } from 'react'
import Animals from '../components/Animal/Animals'
import NavBar from '../components/navBar/NavBar'
import Cards from '../components/cards/Card'
import axiosInstance from '../api/axios'
import SearchBar from '../components/searchBar/SearchBar'
import EditAnimal from '../components/cards/EditAnimal'

const AnimalsPage = () => {
  const [data, setData] = useState([])
  const [searchedData, setSearchData] = useState(null)

  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    fetchAnimals()
  }, [])

  const fetchAnimals = async () => {
    try {
      const response = await axiosInstance.get('/api/animals')
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const searchData = (searchData) => {
    setSearchData(searchData)
  }

  const handleShowEditModal = () => {
    setShowEditModal(true)
  }
  const handleCloseEditModal = () => {
    setShowEditModal(false)
  }

  return (
    <>
      <NavBar />
      <SearchBar
        searchEndpoint="/api/animals/"
        query="type"
        onSearch={searchData}
      />
      <Animals />
      <EditAnimal show={showEditModal} handleClose={handleCloseEditModal} />
      <Cards
        data={searchedData ? searchedData : data}
        onEdit={handleShowEditModal}
      />
    </>
  )
}

export default AnimalsPage
