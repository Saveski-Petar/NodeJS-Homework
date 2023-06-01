import React, { useEffect, useState } from 'react'

import NavBar from '../components/navBar/NavBar'
import Cards from '../components/cards/Card'
import axiosInstance from '../api/axios'
import SearchBar from '../components/searchBar/SearchBar'
import EditAnimal from '../components/cards/EditAnimal'
import AddNewAnimalCard from '../components/cards/AddNewAnimalCard'
import AssignZookeeper from '../components/cards/AssignZookeeper'

const AnimalsPage = () => {
  const [data, setData] = useState([])
  const [searchedData, setSearchData] = useState(null)
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddNewAnimal, setShowAddNewAnimal] = useState(false)
  const [openAssignZookeeper, setOpenAssignZookeeper] = useState(false)

  useEffect(() => {
    fetchAnimals()
  }, [])

  const fetchAnimals = async () => {
    try {
      const response = await axiosInstance.get('/api/animals')
      console.log('FetchUsed')
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    // Update searched data when the data changes
    setSearchData(null)
  }, [data])

  const searchData = (searchData) => {
    setSearchData(searchData)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
  }

  const handleEditAnimal = (animal) => {
    setSelectedAnimal(animal)
    setShowEditModal(true)
  }

  const handleCloseNewAnimalModal = () => {
    setShowAddNewAnimal(false)
  }
  const handleOpenNewAnimalModal = () => {
    setShowAddNewAnimal(true)
  }
  const handleOpenAssignZookeeper = () => {
    setOpenAssignZookeeper(true)
  }
  const handleCloseAssignZookeeper = () => {
    setOpenAssignZookeeper(false)
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/animals/${id}`)
      console.log('Deleted')

      setData((prevData) => prevData.filter((animal) => animal.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <NavBar
        onAdd={handleOpenNewAnimalModal}
        onAssign={handleOpenAssignZookeeper}
      />
      <SearchBar
        searchEndpoint="/api/animals/"
        query="type"
        onSearch={searchData}
      />
      <AddNewAnimalCard
        show={showAddNewAnimal}
        handleClose={handleCloseNewAnimalModal}
      />
      <AssignZookeeper
        show={openAssignZookeeper}
        handleClose={handleCloseAssignZookeeper}
      />

      <EditAnimal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        handleEditAnimal={handleEditAnimal}
        selectedAnimal={selectedAnimal}
        fetchAnimals={fetchAnimals}
      />
      <Cards
        data={searchedData ? searchedData : data}
        selectedAnimal={selectedAnimal}
        onEdit={handleEditAnimal}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default AnimalsPage
