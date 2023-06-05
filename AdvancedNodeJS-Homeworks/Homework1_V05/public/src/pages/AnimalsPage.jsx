import React, { useEffect, useState } from 'react'
import NavBar from '../components/navBar/NavBar'
import axiosInstance from '../api/axios'
import SearchBar from '../components/searchBar/SearchBar'
import EditAnimal from '../components/cards/EditAnimal'
import AddNewAnimalCard from '../components/cards/AddNewAnimalCard'
import AssignZookeeper from '../components/cards/AssignZookeeper'
import AnimalList from '../components/lists/AnimalList'
import SuccessMsg from '../components/SuccessMsg'
import { Container } from 'react-bootstrap'

const AnimalsPage = () => {
  const [data, setData] = useState([])
  const [searchedData, setSearchData] = useState(null)
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddNewAnimal, setShowAddNewAnimal] = useState(false)
  const [openAssignZookeeper, setOpenAssignZookeeper] = useState(false)
  const [addNewAnimalMsg, setAddNewAnimalMsg] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAnimals()
  }, [])

  const fetchAnimals = async () => {
    try {
      const response = await axiosInstance.get('/api/animals')
      console.log('FetchUsed')
      setData(response.data)
    } catch (error) {
      if (error.response) {
        setError({
          statusCode: error.response.data?.statusCode,
          message: error.response.data?.message,
        })
      } else {
        setError({
          statusCode: null,
          message: 'An error occurred. Please try again.',
        })
      }
    }
  }
  useEffect(() => {
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
    setAddNewAnimalMsg(true)
  }
  const handleOpenNewAnimalModal = () => {
    setShowAddNewAnimal(true)
  }
  const handleOpenAssignZookeeper = (animal) => {
    setSelectedAnimal(animal)
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
      {addNewAnimalMsg && (
        <SuccessMsg
          message="New Animal Added Successfully"
          onClose={() => setAddNewAnimalMsg(false)}
        />
      )}
      <NavBar onAdd={handleOpenNewAnimalModal} />
      <SearchBar
        searchEndpoint="/api/animals/"
        placeHolder="Search By Type"
        query="type"
        onSearch={searchData}
      />
      <AddNewAnimalCard
        show={showAddNewAnimal}
        handleClose={handleCloseNewAnimalModal}
        updateAnimals={fetchAnimals}
      />
      <AssignZookeeper
        show={openAssignZookeeper}
        selectedAnimal={selectedAnimal}
        handleClose={handleCloseAssignZookeeper}
        updateAnimals={fetchAnimals}
      />

      <EditAnimal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        handleEditAnimal={handleEditAnimal}
        selectedAnimal={selectedAnimal}
        fetchAnimals={fetchAnimals}
      />

      {error ? (
        <Container className="text-center">
          <h1>{error.statusCode}</h1>
          <p>{error.message}</p>
        </Container>
      ) : (
        <AnimalList
          data={searchedData ? searchedData : data}
          selectedAnimal={selectedAnimal}
          onEdit={handleEditAnimal}
          handleDelete={handleDelete}
          onAssign={handleOpenAssignZookeeper}
        />
      )}
    </>
  )
}

export default AnimalsPage
