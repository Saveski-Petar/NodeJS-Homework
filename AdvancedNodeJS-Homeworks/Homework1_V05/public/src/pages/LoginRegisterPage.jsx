import React, { useState } from 'react'
import SuccessMsg from '../components/SuccessMsg'
import Login from '../components/login/Login'
import Register from '../components/register/Register'

const LoginRegisterPage = ({ setIsLoggedIn }) => {
  const [showLogin, setShowLogin] = useState(true)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const handleToggleForm = (e) => {
    e.preventDefault()
    setShowLogin(!showLogin)
  }
  const handleRegistrationSuccess = () => {
    setShowLogin(true)

    setRegistrationSuccess(true)
  }
  return (
    <>
      {registrationSuccess && (
        <SuccessMsg
          message="Register successfull. Please Sign In"
          onClose={() => setRegistrationSuccess(false)}
        />
      )}
      <div className="d-flex justify-content-center align-content-middle ">
        {showLogin ? (
          <Login
            onToggleForm={handleToggleForm}
            setIsLoggedIn={setIsLoggedIn}
          />
        ) : (
          <Register
            onToggleForm={handleToggleForm}
            onRegistrationSuccess={handleRegistrationSuccess}
          />
        )}
      </div>
    </>
  )
}

export default LoginRegisterPage
