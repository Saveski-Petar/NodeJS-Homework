import React, { useEffect, useState } from 'react'
import NavBar from '../components/navBar/NavBar'
import axiosInstance from '../api/axios'
import EditZookeeper from '../components/cards/EditZookeeper'
import SearchBar from '../components/searchBar/SearchBar'
import List from '../components/lists/Lists'
import { Container } from 'react-bootstrap'

const ZookeepersPage = () => {
  const [data, setData] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [searchedData, setSearchData] = useState(null)
  const [selectedZookeeper, setSelectedZookeeeper] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetchZookeepers()
  }, [])

  const fetchZookeepers = async () => {
    try {
      const response = await axiosInstance.get('/api/zookeepers')

      setData(response.data)
    } catch (error) {
      setError({
        statusCode: error.response.data.statusCode,
        message: error.response.data.message,
      })
    }
  }
  const searchData = (searchData) => {
    setSearchData(searchData)
  }
  useEffect(() => {
    setSearchData(null)
  }, [data])

  const handleEditZookeeper = (zookeeper) => {
    setSelectedZookeeeper(zookeeper)
    setShowEditModal(true)
  }

  const handleCloseEditZookeeper = (zookeeper) => {
    setShowEditModal(false)
  }
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/zookeepers/${id}`)
      console.log('Deleted')

      setData((prevData) => prevData.filter((zookeeper) => zookeeper.id !== id))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <NavBar />
      <SearchBar
        searchEndpoint="/api/zookeepers"
        query="fullName"
        placeHolder="Search By Name"
        onSearch={searchData}
      />
      {error ? (
        <Container className="text-center">
          <h1>{error.statusCode}</h1>
          <p>{error.message}</p>
        </Container>
      ) : (
        <List
          data={searchedData ? searchedData : data}
          onEdit={handleEditZookeeper}
          selectedZookeeper={selectedZookeeper}
          handleDelete={handleDelete}
        />
      )}

      <EditZookeeper
        show={showEditModal}
        handleClose={handleCloseEditZookeeper}
        selectedZookeeper={selectedZookeeper}
        fetchZookeepers={fetchZookeepers}
      />
    </>
  )
}

export default ZookeepersPage
