import React, { useState } from 'react'
import HomePage from './Components/Home/HomePage'
import LoginForm from './Components/login_register/page'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <>
      {isLoggedIn ? <HomePage /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
    </>
  )
}

export default App
