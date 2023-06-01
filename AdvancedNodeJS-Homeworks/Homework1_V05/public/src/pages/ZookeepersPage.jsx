import React from 'react'

import NavBar from '../components/navBar/NavBar'
import SearchBar from '../components/searchBar/SearchBar'

const ZookeepersPage = () => {
  return (
    <>
      <NavBar />
      <SearchBar searchEndpoint={'/api'} />
    </>
  )
}

export default ZookeepersPage
