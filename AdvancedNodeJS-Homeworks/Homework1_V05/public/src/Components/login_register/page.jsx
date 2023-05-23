import React, { useState } from 'react'
import Login from './login'
import Register from './register'

const LoginForm = ({ setIsLoggedIn }) => {
  const [showLogin, setShowLogin] = useState(true)

  const handleToggleForm = (e) => {
    e.preventDefault()

    setShowLogin(!showLogin)
  }

  return (
    <div className="flex h-screen items-center justify-center">
      {showLogin ? (
        <Login onToggleForm={handleToggleForm} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Register onToggleForm={handleToggleForm} />
      )}
    </div>
  )
}

export default LoginForm
