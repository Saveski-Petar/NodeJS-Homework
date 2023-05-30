import React from 'react'
import Zookeepers from '../components/zookeeper/Zookeepers'
import NavBar from '../components/navBar/NavBar'
import SearchBar from '../components/searchBar/SearchBar'

const ZookeepersPage = () => {
  return (
    <>
      <NavBar />
      <SearchBar searchEndpoint={'/api'} />
      <Zookeepers />
    </>
  )
}

export default ZookeepersPage
